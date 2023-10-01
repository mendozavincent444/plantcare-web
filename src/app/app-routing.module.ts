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
import { ViewFarmerComponent } from './components/home/manage-farmers/view-farmer/view-farmer.component';
import { DeviceListComponent } from './components/home/hardware-management/device-list/device-list.component';
import { ViewDeviceComponent } from './components/home/hardware-management/view-device/view-device.component';
import { TransactionListComponent } from './components/home/manage-transactions/transaction-list/transaction-list.component';
import { ViewTransactionComponent } from './components/home/manage-transactions/view-transaction/view-transaction.component';
import { AdminListComponent } from './components/home/manage-admins/admin-list/admin-list.component';
import { ViewAdminComponent } from './components/home/manage-admins/view-admin/view-admin.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent, canActivateChild: [AuthGuard], 
      children: [
        { path: 'profile', component: ProfileComponent },
        { path: 'farm-management', component: FarmManagementComponent, 
            children: [
              { path: 'farm-list', component: FarmListComponent },
              { path: 'add-farm', component: AddFarmComponent },
              { path: 'farm/:farm-id', component: ViewFarmComponent },
              { path: '', redirectTo: 'farm-list', pathMatch: 'full' }
          ] },
        { path: 'manage-farmers', component: ManageFarmersComponent,
            children: [
              { path: 'farmer-list', component: FarmerListComponent },
              { path: 'add-farmer', component: AddFarmerComponent },
              { path: 'farmer/:farmer-username', component: ViewFarmerComponent },
              { path: '', redirectTo: 'farmer-list', pathMatch: 'full' }
            ] },
        { path: 'manage-admins', component: ManageAdminsComponent,
            children: [
              { path: 'admin-list', component: AdminListComponent },
              { path: 'admin/:admin-username', component: ViewAdminComponent },
              { path: '', redirectTo: 'admin-list', pathMatch: 'full' }
            ] },
        { path: 'plant-management', component: PlantManagementComponent,
            children: [
              { path: 'plant-list', component: PlantListComponent },
              { path: 'add-plant', component: AddPlantComponent },
              { path: 'farm/:farm-id/plant/:plant-id', component: ViewPlantComponent },
              { path: '', redirectTo: 'plant-list', pathMatch: 'full' }
            ] },
        { path: 'buy-products', component: BuyProductsComponent,
            children: [
              { path: 'product-list', component: ProductListComponent },
              { path: 'checkout', component: CheckoutComponent },
              { path: '', redirectTo: 'product-list', pathMatch: 'full' }
            ] },
        { path: 'manage-transactions', component: ManageTransactionsComponent,
            children: [
              { path: 'transaction-list', component: TransactionListComponent },
              { path: 'transaction/:transaction-name', component: ViewTransactionComponent },
              { path: '', redirectTo: 'transaction-list', pathMatch: 'full' }
            ] },
        { path: 'hardware-management', component: HardwareManagementComponent,
            children: [
              { path: 'device-list', component: DeviceListComponent },
              { path: 'device/:device-name', component: ViewDeviceComponent },
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
