import { Route } from '@angular/router';
import { DocsComponent, HomeComponent } from '@forepath/landingpage/frontend';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'docs',
    children: [
      {
        path: '**',
        component: DocsComponent,
      },
    ],
  },
];
