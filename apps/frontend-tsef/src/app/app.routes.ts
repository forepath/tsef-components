import { Route } from '@angular/router';
import { GettingStartedComponent, HomeComponent } from '@forepath/landingpage/frontend';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
  },
];
