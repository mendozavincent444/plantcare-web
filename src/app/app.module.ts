import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { FarmManagementComponent } from './components/home/farm-management/farm-management.component';
import { ManageFarmersComponent } from './components/home/manage-farmers/manage-farmers.component';
import { PlantManagementComponent } from './components/home/plant-management/plant-management.component';
import { ManageTransactionsComponent } from './components/home/manage-transactions/manage-transactions.component';
import { HardwareManagementComponent } from './components/home/hardware-management/hardware-management.component';
import { ManageAdminsComponent } from './components/home/manage-admins/manage-admins.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BuyProductsComponent } from './components/home/buy-products/buy-products.component';
import { AddFarmComponent } from './components/home/farm-management/add-farm/add-farm.component';
import { FarmListComponent } from './components/home/farm-management/farm-list/farm-list.component';
import { FarmerListComponent } from './components/home/manage-farmers/farmer-list/farmer-list.component';
import { AddFarmerComponent } from './components/home/manage-farmers/add-farmer/add-farmer.component';
import { PlantListComponent } from './components/home/plant-management/plant-list/plant-list.component';
import { AddPlantComponent } from './components/home/plant-management/add-plant/add-plant.component';
import { CheckoutComponent } from './components/home/buy-products/checkout/checkout.component';
import { ProductListComponent } from './components/home/buy-products/product-list/product-list.component';
import { ViewFarmComponent } from './components/home/farm-management/view-farm/view-farm.component';
import { ViewDeviceComponent } from './components/home/hardware-management/view-device/view-device.component';
import { ViewPlantComponent } from './components/home/plant-management/view-plant/view-plant.component';
import { DeviceListComponent } from './components/home/hardware-management/device-list/device-list.component';
import { TransactionListComponent } from './components/home/manage-transactions/transaction-list/transaction-list.component';
import { ViewTransactionComponent } from './components/home/manage-transactions/view-transaction/view-transaction.component';
import { AdminListComponent } from './components/home/manage-admins/admin-list/admin-list.component';
import { ViewAdminComponent } from './components/home/manage-admins/view-admin/view-admin.component'; 
import { HttpRequestInterceptor } from './helpers/http-request.interceptor';
import { AddDeviceComponent } from './components/home/hardware-management/add-device/add-device.component';
import { SubscriptionComponent } from './components/home/subscription/subscription.component';
import { ChooseSubscriptionComponent } from './components/home/subscription/choose-subscription/choose-subscription.component';
import { SubscriptionPaymentComponent } from './components/home/subscription/subscription-payment/subscription-payment.component';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { DashboardWidgetsComponent } from './components/home/dashboard/dashboard-widgets/dashboard-widgets.component';
import { HarvestLogsComponent } from './components/home/dashboard/harvest-logs/harvest-logs.component';
import { NotificationsComponent } from './components/home/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    FarmManagementComponent,
    ManageFarmersComponent,
    PlantManagementComponent,
    ManageTransactionsComponent,
    HardwareManagementComponent,
    ManageAdminsComponent,
    ForgotPasswordComponent,
    BuyProductsComponent,
    AddFarmComponent,
    FarmListComponent,
    FarmerListComponent,
    AddFarmerComponent,
    PlantListComponent,
    AddPlantComponent,
    CheckoutComponent,
    ProductListComponent,
    ViewFarmComponent,
    ViewDeviceComponent,
    ViewPlantComponent,
    DeviceListComponent,
    TransactionListComponent,
    ViewTransactionComponent,
    AdminListComponent,
    ViewAdminComponent,
    AddDeviceComponent,
    SubscriptionComponent,
    ChooseSubscriptionComponent,
    SubscriptionPaymentComponent,
    ConfirmPasswordResetComponent,
    DashboardComponent,
    DashboardWidgetsComponent,
    HarvestLogsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
