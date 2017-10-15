import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';

export const routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  // {path: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
