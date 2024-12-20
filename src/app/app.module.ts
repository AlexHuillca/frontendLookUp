import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogConfirmationComponent } from './core/dialog-confirmation/dialog-confirmation.component';
import { DialogLoadingComponent } from './core/dialog-loading/dialog-loading.component';
import { DialogOverviewComponent } from './core/dialog-overview/dialog-overview.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptor } from './core/auth/auth.interceptor';
import { AuthJWTModule } from './core/auth/auth.module';
import { MatPaginatorIntlEsp } from './core/paginator/mat-paginator-int-esp.class';
import { DateFormat } from './date-format';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,

    DialogConfirmationComponent,
    DialogLoadingComponent,
    DialogOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    AuthJWTModule,
    MatExpansionModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatInputModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: DateFormat },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEsp },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
