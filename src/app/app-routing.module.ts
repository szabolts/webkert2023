import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./features/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'entry',
    loadChildren: () => import('./features/entry/entry.module').then(m => m.EntryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'gallery',
    loadChildren: () => import('./features/gallery/gallery.module').then(m => m.GalleryModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./core/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./core/auth/signup/signup.module').then(m => m.SignupModule) },
 {
  path: '**',
  redirectTo: '/not-found'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
