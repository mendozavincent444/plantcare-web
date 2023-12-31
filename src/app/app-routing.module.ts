import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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
import { ProductListComponent } from './components/home/buy-products/product-list/product-list.component';
import { CheckoutComponent } from './components/home/buy-products/checkout/checkout.component';
import { ViewFarmComponent } from './components/home/farm-management/view-farm/view-farm.component';
import { ViewPlantComponent } from './components/home/plant-management/view-plant/view-plant.component';
import { DeviceListComponent } from './components/home/hardware-management/device-list/device-list.component';
import { ViewDeviceComponent } from './components/home/hardware-management/view-device/view-device.component';
import { TransactionListComponent } from './components/home/manage-transactions/transaction-list/transaction-list.component';
import { ViewTransactionComponent } from './components/home/manage-transactions/view-transaction/view-transaction.component';
import { AdminListComponent } from './components/home/manage-admins/admin-list/admin-list.component';
import { ViewAdminComponent } from './components/home/manage-admins/view-admin/view-admin.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AddDeviceComponent } from './components/home/hardware-management/add-device/add-device.component';
import { AdminGuard } from './shared/services/admin.guard';
import { SuperadminGuard } from './shared/services/superadmin.guard';
import { SubscriptionComponent } from './components/home/subscription/subscription.component';
import { ChooseSubscriptionComponent } from './components/home/subscription/choose-subscription/choose-subscription.component';
import { SubscriptionPaymentComponent } from './components/home/subscription/subscription-payment/subscription-payment.component';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { DashboardWidgetsComponent } from './components/home/dashboard/dashboard-widgets/dashboard-widgets.component';
import { HarvestLogsComponent } from './components/home/dashboard/harvest-logs/harvest-logs.component';
import { NotificationsComponent } from './components/home/notifications/notifications.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'confirm-reset', component: ConfirmPasswordResetComponent },
  { path: 'home', component: HomeComponent, canActivateChild: [AuthGuard], 
      children: [
        { path: 'notifications', component: NotificationsComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'subscription', component: SubscriptionComponent, canActivateChild: [AdminGuard],
            children: [
              { path: 'choose-subscription', component: ChooseSubscriptionComponent },
              { path: 'subscription-payment', component: SubscriptionPaymentComponent },
              { path: '', redirectTo: 'choose-subscription', pathMatch: 'full' }
          ]  },
        { path: 'dashboard', component: DashboardComponent, canActivateChild: [AdminGuard], 
            children: [
              { path: 'dashboard-widgets', component: DashboardWidgetsComponent },
              { path: 'harvest-logs', component: HarvestLogsComponent },
              { path: '', redirectTo: 'dashboard-widgets', pathMatch: 'full' }
          ]  },
        { path: 'farm-management', component: FarmManagementComponent, canActivateChild: [AdminGuard],
            children: [
              { path: 'farm-list', component: FarmListComponent },
              { path: 'add-farm', component: AddFarmComponent },
              { path: 'farm/:farm-id', component: ViewFarmComponent },
              { path: '', redirectTo: 'farm-list', pathMatch: 'full' }
          ] },
        { path: 'manage-farmers', component: ManageFarmersComponent, canActivateChild: [AdminGuard],
            children: [
              { path: 'farmer-list', component: FarmerListComponent },
              { path: 'add-farmer', component: AddFarmerComponent },
              { path: '', redirectTo: 'farmer-list', pathMatch: 'full' }
            ] },
        { path: 'manage-admins', component: ManageAdminsComponent, canActivateChild: [SuperadminGuard],
            children: [
              { path: 'admin-list', component: AdminListComponent },
              { path: 'admin/:admin-username', component: ViewAdminComponent },
              { path: '', redirectTo: 'admin-list', pathMatch: 'full' }
            ] },
        { path: 'plant-management', component: PlantManagementComponent, canActivateChild: [AdminGuard],
            children: [
              { path: 'plant-list', component: PlantListComponent },
              { path: 'add-plant', component: AddPlantComponent },
              { path: 'farm/:farm-id/plant/:plant-id', component: ViewPlantComponent },
              { path: '', redirectTo: 'plant-list', pathMatch: 'full' }
            ] },
        { path: 'buy-products', component: BuyProductsComponent, canActivateChild: [AdminGuard],
            children: [
              { path: 'product-list', component: ProductListComponent },
              { path: 'checkout', component: CheckoutComponent },
              { path: '', redirectTo: 'product-list', pathMatch: 'full' }
            ] },
        { path: 'manage-transactions', component: ManageTransactionsComponent,
            children: [
              { path: 'transaction-list', component: TransactionListComponent },
              { path: 'transaction/:transaction-id', component: ViewTransactionComponent },
              { path: '', redirectTo: 'transaction-list', pathMatch: 'full' }
            ] },
        { path: 'hardware-management', component: HardwareManagementComponent, canActivateChild: [AdminGuard],
            children: [
              { path: 'device-list', component: DeviceListComponent },
              { path: 'add-device', component: AddDeviceComponent },
              { path: 'farms/:farm-id/devices/:device/:device-id', component: ViewDeviceComponent },
              { path: '', redirectTo: 'device-list', pathMatch: 'full' },
            ] },
        { path: '', redirectTo: 'profile', pathMatch: 'full' }
      ] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
