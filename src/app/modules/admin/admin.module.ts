import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideMenuAdminComponent } from '../../components/side-menu-admin/side-menu-admin.component';
import { MatPaginatorIntlEsp } from '../../core/paginator/mat-paginator-int-esp.class';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormPrendaComponent } from './prenda/form-prenda/form-prenda.component';
import { ListPrendaComponent } from './prenda/list-prenda/list-prenda.component';
@NgModule({
  declarations: [
    AdminComponent,
    SideMenuAdminComponent,
    FormPrendaComponent,
    ListPrendaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEsp }
  ],
})
export class AdminModule { }
