import { Routes } from '@angular/router';
// These routes are lazy loaded
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
];