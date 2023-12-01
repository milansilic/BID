import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthTokenInterceptor } from 'src/authorization/interceptors/auth-token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckMailComponent } from './auth/check-mail/check-mail.component';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreateTourComponent } from './components/create-tour/create-tour.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MasterUserWelcomeComponent } from './components/master-user-welcome/master-user-welcome.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ToursComponent } from './components/tours/tours.component';
import { UsersComponent } from './components/users/users.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { ErrorComponent } from './error/error.component';
import { AddDriverModalComponent } from './modals/add-driver-modal/add-driver-modal.component';
import { AddExpenseModalComponent } from './modals/add-expense-modal/add-expense-modal.component';
import { AddFilesModalComponent } from './modals/add-files-modal/add-files-modal.component';
import { AdditionalCostsModalComponent } from './modals/additional-costs-modal/additional-costs-modal.component';
import { AdditionalPackageModalComponent } from './modals/additional-package-modal/additional-package-modal.component';
import { ConnectTourModalComponent } from './modals/connect-tour-modal/connect-tour-modal.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { VehicleModalComponent } from './modals/vehicle-modal/vehicle-modal.component';
import { FileUploadService } from './services/file-upload.service';
import { AppDatepickerComponent } from './shared/components/app-datepicker/app-datepicker.component';
import { AppInputComponent } from './shared/components/app-input/app-input.component';
import { AppSelectComponent } from './shared/components/app-select/app-select.component';
import { AppTextareaComponent } from './shared/components/app-textarea/app-textarea.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { CustomInputComponent } from './shared/components/custom-input/custom-input.component';
import { ChartAverageKmComponent } from './shared/components/dashboard-charts/chart-average-km/chart-average-km.component';
import { ChartLicencesComponent } from './shared/components/dashboard-charts/chart-licences/chart-licences.component';
import { ChartOrdersComponent } from './shared/components/dashboard-charts/chart-orders/chart-orders.component';
import { ChartPolarComponent } from './shared/components/dashboard-charts/chart-polar/chart-polar.component';
import { ChartProfitComponent } from './shared/components/dashboard-charts/chart-profit/chart-profit.component';
import { ChartRevenueComponent } from './shared/components/dashboard-charts/chart-revenue/chart-revenue.component';
import { ChartSmallSelectComponent } from './shared/components/dashboard-charts/chart-small-select/chart-small-select.component';
import { ChartSmallComponent } from './shared/components/dashboard-charts/chart-small/chart-small.component';
import { ChartOrdersPerCarrierComponent } from './shared/components/dashboard-charts/chart-orders-per-carrier/chart-orders-per-carrier.component';
import { ChartNumberOfVehiclesComponent } from './shared/components/dashboard-charts/chart-number-of-vehicles/chart-number-of-vehicles.component';
import { ChartProfitPerClientComponent } from './shared/components/dashboard-charts/chart-profit-per-client/chart-profit-per-client.component';
import { ImageLoaderComponent } from './shared/components/image-loader/image-loader.component';
import { MaskComponent } from './shared/components/mask/mask.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { MyDashboardComponent } from './shared/components/my-dashboard/my-dashboard.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ProgressSpinnerComponent } from './shared/components/progress-spinner/progress-spinner.component';

// import { LogInModule } from './auth/log-in/log-in.module';
@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ErrorComponent,
    CheckMailComponent,
    MasterUserWelcomeComponent,
    DashboardComponent,
    VehiclesComponent,
    OrdersComponent,
    ButtonComponent,
    CustomInputComponent,
    AppInputComponent,
    AppSelectComponent,
    AppTextareaComponent,
    ImageLoaderComponent,
    MenuComponent,
    ProfileComponent,
    MyDashboardComponent,
    LayoutComponent,
    LogInComponent,
    CreateOrderComponent,
    CreateTourComponent,
    UsersComponent,
    UserModalComponent,
    VehicleModalComponent,
    AppDatepickerComponent,
    MaskComponent,
    AdditionalCostsModalComponent,
    AdditionalPackageModalComponent,
    AddFilesModalComponent,
    ProgressSpinnerComponent,
    ChartSmallComponent,
    ChartSmallSelectComponent,
    ChartOrdersComponent,
    ChartAverageKmComponent,
    ChartProfitComponent,
    ChartLicencesComponent,
    ChartRevenueComponent,
    ToursComponent,
    ConnectTourModalComponent,
    AddExpenseModalComponent,
    ChartPolarComponent,
    ChartOrdersPerCarrierComponent,
    ChartNumberOfVehiclesComponent,
    ChartProfitPerClientComponent,
    AddDriverModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    // LogInModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
      }
    ),
  ],
  providers: [
    FileUploadService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
