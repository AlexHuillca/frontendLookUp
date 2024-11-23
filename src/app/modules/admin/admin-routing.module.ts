import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListPrendaComponent } from './prenda/list-prenda/list-prenda.component';
import { FormPrendaComponent } from './prenda/form-prenda/form-prenda.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'prenda', component: ListPrendaComponent },
      { path: 'prenda/add', component: FormPrendaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
