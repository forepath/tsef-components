#!/bin/bash

set -euo pipefail

SCRIPT_NAME="update.sh"
REPO_URL_SSH_DEFAULT="git@github.com:forepath/tsef.git"
REPO_URL_HTTPS_DEFAULT="https://github.com/forepath/tsef.git"
UPSTREAM_REMOTE="upstream"
BRANCH_PREFIX="update"
ASSUME_YES=0
DRY_RUN=0

# Colors
if [ -t 1 ]; then
    RED="\033[0;31m"; GREEN="\033[0;32m"; YELLOW="\033[1;33m"; BLUE="\033[0;34m"; NC="\033[0m"
else
    RED=""; GREEN=""; YELLOW=""; BLUE=""; NC=""
fi

timestamp() { date +"%Y-%m-%dT%H:%M:%S%z"; }
log_info() { echo -e "$(timestamp) ${BLUE}[INFO]${NC} $*"; }
log_warn() { echo -e "$(timestamp) ${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "$(timestamp) ${RED}[ERROR]${NC} $*" 1>&2; }
die() { log_error "$*"; exit 1; }

usage() {
    cat <<EOF
${SCRIPT_NAME} - Update TSEF framework from upstream repository

Options:
  --repo <url>        Upstream repository URL (default: SSH ${REPO_URL_SSH_DEFAULT})
  --remote <name>     Remote name for upstream (default: ${UPSTREAM_REMOTE})
  --branch <name>     Branch to update from (default: current branch's upstream)
  --prefix <name>     Branch prefix for update branch (default: ${BRANCH_PREFIX})
  --dry-run           Show what would be done without making changes
  -y, --yes           Assume "yes" for prompts
  -h, --help          Show this help message
EOF
}

REPO_URL=""
TARGET_BRANCH=""
BRANCH_NAME=""

while [ "${1-}" != "" ]; do
    case "$1" in
        --repo)
            REPO_URL="$2"; shift 2 ;;
        --remote)
            UPSTREAM_REMOTE="$2"; shift 2 ;;
        --branch)
            TARGET_BRANCH="$2"; shift 2 ;;
        --prefix)
            BRANCH_PREFIX="$2"; shift 2 ;;
        --dry-run)
            DRY_RUN=1; shift ;;
        -y|--yes)
            ASSUME_YES=1; shift ;;
        -h|--help)
            usage; exit 0 ;;
        *)
            usage; die "Unknown option: $1" ;;
    esac
done

require_cmd() {
    command -v "$1" >/dev/null 2>&1 || return 1
}

ensure_git_repo() {
    if [ ! -d ".git" ]; then
        die "Not in a git repository. Run this script from the root of your TSEF workspace."
    fi
}

get_current_branch() {
    git branch --show-current
}

get_upstream_branch() {
    local current_branch
    current_branch="$(get_current_branch)"
    git rev-parse --abbrev-ref "${current_branch}@{upstream}" 2>/dev/null || echo ""
}

determine_target_branch() {
    if [ -n "${TARGET_BRANCH}" ]; then
        echo "${TARGET_BRANCH}"
    else
        local upstream
        upstream="$(get_upstream_branch)"
        if [ -n "${upstream}" ]; then
            echo "${upstream#*/}"
        else
            echo "main"
        fi
    fi
}

generate_branch_name() {
    local target_branch
    target_branch="$(determine_target_branch)"
    local timestamp
    timestamp="$(date +%Y%m%d-%H%M%S)"
    echo "${BRANCH_PREFIX}/${target_branch}-${timestamp}"
}

setup_upstream_remote() {
    local chosen_url
    if [ -n "${REPO_URL}" ]; then
        chosen_url="${REPO_URL}"
    else
        chosen_url="${REPO_URL_SSH_DEFAULT}"
    fi

    if git remote get-url "${UPSTREAM_REMOTE}" >/dev/null 2>&1; then
        log_info "Updating existing upstream remote: ${UPSTREAM_REMOTE}"
        if [ "${DRY_RUN}" -eq 0 ]; then
            git remote set-url "${UPSTREAM_REMOTE}" "${chosen_url}"
        fi
    else
        log_info "Adding upstream remote: ${UPSTREAM_REMOTE} -> ${chosen_url}"
        if [ "${DRY_RUN}" -eq 0 ]; then
            git remote add "${UPSTREAM_REMOTE}" "${chosen_url}"
        fi
    fi
}

fetch_upstream() {
    local target_branch
    target_branch="$(determine_target_branch)"

    log_info "Fetching from upstream remote: ${UPSTREAM_REMOTE}"
    if [ "${DRY_RUN}" -eq 0 ]; then
        git fetch "${UPSTREAM_REMOTE}" "${target_branch}"
    fi
}

create_update_branch() {
    local branch_name
    branch_name="$(generate_branch_name)"
    BRANCH_NAME="${branch_name}"

    log_info "Creating update branch: ${branch_name}"
    if [ "${DRY_RUN}" -eq 0 ]; then
        git checkout -b "${branch_name}"
    fi
}

merge_upstream_changes() {
    local target_branch
    target_branch="$(determine_target_branch)"
    local upstream_ref="${UPSTREAM_REMOTE}/${target_branch}"

    log_info "Merging changes from ${upstream_ref}"

    if [ "${DRY_RUN}" -eq 0 ]; then
        # Try to merge with fast-forward first
        if git merge --ff-only "${upstream_ref}" 2>/dev/null; then
            log_info "Fast-forward merge successful"
        else
            log_info "Fast-forward not possible, creating merge commit"
            git merge --no-ff "${upstream_ref}" -m "feat: update framework from upstream

- Merge changes from ${upstream_ref}
- Update TSEF framework to latest version
- Preserve local customizations and configurations

Co-authored-by: update.sh <update@devkit>"
        fi
    else
        log_info "[DRY RUN] Would merge ${upstream_ref}"
    fi
}

handle_conflicts() {
    if [ "${DRY_RUN}" -eq 1 ]; then
        return 0
    fi

    if git diff --name-only --diff-filter=U | grep -q .; then
        log_warn "Merge conflicts detected. Please resolve them manually:"
        git status --porcelain | grep "^UU" | while read -r status file; do
            echo "  - ${file}"
        done

        if [ "${ASSUME_YES}" -eq 0 ]; then
            echo -n "Continue after resolving conflicts? [y/N]: "
            read -r response
            if [[ ! "${response}" =~ ^[Yy]$ ]]; then
                log_info "Aborting merge. Run 'git merge --abort' to cancel."
                exit 1
            fi
        fi
    fi
}

update_dependencies() {
    log_info "Updating workspace dependencies..."

    if [ "${DRY_RUN}" -eq 1 ]; then
        log_info "[DRY RUN] Would run: npm ci || npm install"
        return 0
    fi

    # Ensure nvm is available
    [ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"

    # Respect project's .nvmrc if available
    if [ -f .nvmrc ]; then
        nvm install >/dev/null 2>&1 || true
        nvm use >/dev/null 2>&1 || true
    fi

    if [ -f package.json ]; then
        npm ci || npm install
    else
        log_warn "No package.json found; skipping npm install."
    fi

    if command -v nx >/dev/null 2>&1; then
        npx nx reset || true
    fi
}

create_update_commit() {
    local target_branch
    target_branch="$(determine_target_branch)"

    # Check if there are any changes to commit
    if [ "${DRY_RUN}" -eq 1 ]; then
        log_info "[DRY RUN] Would create update commit"
        return 0
    fi

    if git diff --cached --quiet && git diff --quiet; then
        log_info "No changes to commit"
        return 0
    fi

    # Add any untracked or modified files
    git add .

    local commit_msg="feat: update framework dependencies and configuration

- Update package.json and lock files
- Sync configuration files with upstream
- Maintain local customizations

Co-authored-by: update.sh <update@devkit>"

    git commit -m "${commit_msg}" || {
        log_warn "No changes to commit after dependency update"
    }
}

show_summary() {
    local current_branch
    current_branch="$(get_current_branch)"
    local target_branch
    target_branch="$(determine_target_branch)"

    log_info "Update Summary:"
    log_info "  Current branch: ${current_branch}"
    log_info "  Target branch: ${target_branch}"
    log_info "  Upstream remote: ${UPSTREAM_REMOTE}"

    if [ "${DRY_RUN}" -eq 1 ]; then
        log_info "  Mode: DRY RUN (no changes made)"
    else
        log_info "  Update branch: ${BRANCH_NAME}"
        log_info "  Ready for review and merge"
    fi
}

trap 'log_error "An error occurred. See logs above."' ERR

log_info "Starting TSEF framework update..."
ensure_git_repo
setup_upstream_remote
fetch_upstream
create_update_branch
merge_upstream_changes
handle_conflicts
update_dependencies
create_update_commit
show_summary

if [ "${DRY_RUN}" -eq 1 ]; then
    log_info "Dry run completed. Use --dry-run=false to apply changes."
else
    log_info "TSEF framework updated successfully!"
    log_info "Review changes in branch '${BRANCH_NAME}' and merge when ready."
fi
