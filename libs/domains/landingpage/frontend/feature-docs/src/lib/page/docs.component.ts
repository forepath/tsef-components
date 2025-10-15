import { CommonModule } from '@angular/common';
import { Component, inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'landingpage-docs-feature-docs',
  imports: [CommonModule, MarkdownModule, RouterLink],
  providers: [provideMarkdown()],
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  standalone: true,
})
export class DocsComponent implements OnInit, OnDestroy {
  titleService = inject(Title);
  metaService = inject(Meta);
  route = inject(ActivatedRoute);
  locale = inject(LOCALE_ID);

  destroy$ = new Subject<void>();

  defaultDocLocale = 'en';
  docUrl = '';
  docsTree: DocNode = {
    path: 'docs',
    title: 'Documentation',
    children: [
      {
        path: 'framework',
        title: 'Software Development Framework',
        children: [
          {
            path: 'agents',
            title: 'General',
          },
          {
            path: 'applications',
            title: 'Applications',
          },
          {
            path: 'conventional-commits',
            title: 'Conventional Commits',
          },
          {
            path: 'deployment',
            title: 'Deployment',
          },
          {
            path: 'domains-and-libraries',
            title: 'Domains and Libraries',
          },
          {
            path: 'internal-documentation',
            title: 'Internal Documentation',
          },
          {
            path: 'operations',
            title: 'Operations',
          },
          {
            path: 'security',
            title: 'Security',
          },
          {
            path: 'software-development-principles',
            title: 'Software Development Principles',
          },
          {
            path: 'testing',
            title: 'Testing',
          },
        ],
      }
    ],
  };

  constructor() {
    this.titleService.setTitle('Documentation | TSEF');
    this.metaService.addTags([
      {
        name: 'description',
        content: $localize`:@@docsMetaDescription:Documentation for the AI-ready TypeScript Enterprise Framework.`,
      },
      {
        name: 'keywords',
        content: $localize`:@@docsMetaKeywords:TSEF, TypeScript, Enterprise Framework, AI-ready, Angular, web development, scalable, application framework, cloud, modern apps, enterprise solutions, software tools, best practices, documentation`,
      },
    ]);
  }

  ngOnInit() {
    this.initializeDocs(this.route.snapshot.url);

    this.route.url.pipe(takeUntil(this.destroy$)).subscribe((url: UrlSegment[]) => {
      this.initializeDocs(url);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeDocs(url: UrlSegment[]) {
    if (this.locale !== this.defaultDocLocale) {
      if (this.route.snapshot.url.length > 0) {
        window.location.href = '/' + this.defaultDocLocale + '/' + url.join('/');
      } else {
        window.location.href = '/' + this.defaultDocLocale + '/docs';
      }
    }

    if (url.length > 0) {
      this.docUrl = '/files/docs/' + url.map((segment) => segment.path).join('/') + '.md';

      console.log(this.docUrl);
    } else {
      this.docUrl = '/files/docs/README.md';
    }
  }
}

interface DocNode {
  path: string;
  title: string;
  children?: DocNode[];
}
