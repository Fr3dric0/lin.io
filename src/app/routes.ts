import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

import { ProductsModule } from './products/products.module';

export const routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  // {path: ''}
];
