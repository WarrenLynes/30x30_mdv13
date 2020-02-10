import { NgModule } from '@angular/core';
import { LoginComponent, NotFoundComponent, UiModule } from '@mdv13/ui';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forRoot([
      { path: '', canActivate: [AuthGuard], loadChildren: () => import('./clock/clock.module').then(m => m.ClockModule)},
      { path: 'lostnfound', component: NotFoundComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'lostnfound', pathMatch: 'full' }
    ], { initialNavigation: 'enabled' })
  ]
})
export class AppRoutingModule {}
