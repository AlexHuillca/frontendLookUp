import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorIntlEsp } from '../../core/paginator/mat-paginator-int-esp.class';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SideMenuClientComponent } from '../../components/side-menu-client/side-menu-client.component';
import { MatMenuModule } from '@angular/material/menu';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MatPseudoCheckboxModule } from '@angular/material/core';
@NgModule({
  declarations: [ClientComponent, SideMenuClientComponent, CatalogoComponent, CarritoComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatIconModule,
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
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlEsp }],
})
export class ClientModule {}
