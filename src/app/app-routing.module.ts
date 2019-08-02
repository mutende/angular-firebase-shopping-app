import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AdminComponent } from './users/admin/admin.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';



const routes: Routes = [
  {path: '', redirectTo: 'product/view',pathMatch:'full'},
  {path: 'product', component:ProductsComponent,children: [
    {path: 'add', component:ProductComponent},
    {path : 'view', component:ProductListComponent}
  ]},
  {path: 'admin', component:AdminComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
