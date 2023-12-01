import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './auth/log-in/log-in.component';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { CheckMailComponent } from './auth/check-mail/check-mail.component';
import { MasterUserWelcomeComponent } from './components/master-user-welcome/master-user-welcome.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ToursComponent } from './components/tours/tours.component';
import { ErrorComponent } from './error/error.component';
import { CreateOrderComponent } from './components/create-order/create-order.component'
import { CreateTourComponent } from './components/create-tour/create-tour.component'
import { AuthGuard } from 'src/authorization/services/guards/auth.guard';
import { RedirectGuard } from 'src/authorization/services/guards/redirect.guard';

const routes: Routes = [
  { path: '', redirectTo: 'layout/dashboard', pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:reset-code', component: NewPasswordComponent },
  { path: 'check-mail', component: CheckMailComponent },
  { path: 'master-user-welcome', component: MasterUserWelcomeComponent },
  {
    path: 'layout', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'tours', component: ToursComponent },
      { path: 'order-details', component: CreateOrderComponent },
      { path: 'tour-details', component: CreateTourComponent }
    ]
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '404' }
];


// const routes: Routes = [
//   {
//     path: 'log-in',
//     loadChildren: async () => (await import('./auth/log-in/log-in.module')).LogInModule
//   },
//   {
//     path: 'forgot-password',
//     loadChildren: async () =>
//       (await import('./components/auth/forgot-password/forgot-password.module')).ForgotPasswordModule
//   },
//   {
//     path: '',
//     loadChildren: async () => (await import('./components/components.module')).ComponentsModule,
//     canActivate: [AuthGuard]
//   },
//   { path: '**', redirectTo: '' }
// ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
