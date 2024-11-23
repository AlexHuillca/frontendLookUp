import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'carrito', component: CarritoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
