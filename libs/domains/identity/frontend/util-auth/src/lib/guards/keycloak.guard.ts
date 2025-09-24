import { APP_BASE_HREF, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

export const isAuthenticated = createAuthGuard(
  async (_: ActivatedRouteSnapshot, state: RouterStateSnapshot, authData: AuthGuardData): Promise<boolean> => {
    const keycloak = inject(Keycloak);
    const href = inject(APP_BASE_HREF);
    const platformId = inject(PLATFORM_ID);

    if (!authData.authenticated && !isPlatformServer(platformId)) {
      await keycloak.login({ redirectUri: window.location.origin + href + state.url });
    }

    return true;
  },
);
