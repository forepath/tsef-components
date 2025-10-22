import { Route } from '@angular/router';
import { FrameworkComponent, GettingStartedComponent, HomeComponent } from '@forepath/landingpage/frontend';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
  },
  {
    path: 'framework',
    component: FrameworkComponent,
  },
];
