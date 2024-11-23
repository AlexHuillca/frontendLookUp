import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthJWTService } from '../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { MensajesService } from '../../core/services/mensajes.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { FormValidationUtils } from '../../utils/form-validation-utils';
import { Utils } from '../../utils/utils';
import { PreferenciaService } from '../../services/preferencia.service';

@Component({
  selector: 'app-side-menu-client',
  templateUrl: './side-menu-client.component.html',
  styleUrl: './side-menu-client.component.css'
})
export class SideMenuClientComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  infoUsuario: any = null;
  opcionesPorPerfil: any = [];
  public isOpen = window.innerWidth > 600;
  mobile = window.innerWidth < 600

  location = window.location.href;

  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;

  preferencia: any = null;
  categorias: any[] = [];
  marcas: any[] = [];
  tallas: any[] = Utils.tallas;

  constructor(
    private router: Router,
    private authService: AuthJWTService,

    private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private preferenciaService: PreferenciaService,
  ) { }

  ngOnInit(): void {
    this.loadInfoUsuario();

    this.inicializarData();
  }

  initForm = () => {

    this.preferencia = this.infoUsuario?.preferencia[0];

    this.form = this.formBuilder.group({
      tipoPrenda: [this.preferencia?.tipo_prenda_favorito, [Validators.maxLength(100)]],
      colorPrenda: [this.preferencia?.color_favorito, [Validators.maxLength(100)]],
      talla: [this.preferencia?.talla_favorita, [Validators.required, Validators.maxLength(30)]],
      marca: [this.preferencia?.marca, [Validators.required]],
      categoria: [this.preferencia?.categoria, [Validators.required]],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  inicializarData = () => {
    forkJoin({
      categorias: this.categoriaService.list(),
      marcas: this.marcaService.list()
    })
      .pipe(
        map((res) => {
          this.categorias = res.categorias;
          this.marcas = res.marcas;
        })
      )
      .subscribe({
        next: (res) => { },
        error: (err) => {
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: () => {
          this.initForm();
        },
      });
  }

  loadInfoUsuario(): void {
    this.infoUsuario = this.authService.getInfoUsuario();
    if (!this.infoUsuario) {
      this.router.navigate(['/'])
    } else {
      this.initForm();
    }
  }

  closePanel(sidenav: MatSidenav) {
    if (sidenav.mode === 'over') {
      sidenav.close();
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  onNavigateTo(url: string): void {
    if (window.innerWidth <= 600) {
      this.isOpen = false;
    }

    if (location.href.endsWith(url)) {
      location.reload();
    }

    this.location = url;
    this.router.navigate([url]);
  }

  onVerPerfil(): void { }
  onChangePassword(): void { }
  onLogout(): void {
    this.authService.logout();
  }

  onLogin(): void {
    this.router.navigate(['auth/login']);
  }

  onClickGuardar = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      id: this.preferencia?.id,
      tipo_evento: '',
      tipo_prenda_favorito: this.form.get('tipoPrenda')?.value,
      color_favorito: this.form.get('colorPrenda')?.value,
      talla_favorita: this.form.get('talla')?.value,
      marca: this.form.get('marca')?.value,
      categoria: this.form.get('categoria')?.value,
      idUsuario: this.infoUsuario?.id,
    };

    const confirmation = this.mensaje.crearConfirmacion(`¿Seguro que desea ${this.preferencia ? 'actualizar' : 'registrar'} los datos?`);
    confirmation.componentInstance.onSi.subscribe(() => {
      this.save(dato);
    });
  };

  save = (dato: any) => {
    this.mensaje.showLoading();
    this.preferenciaService.save(dato).subscribe({
      next: (res) => {
        this.infoUsuario.preferencia[0] = dato;
        localStorage.setItem('user', JSON.stringify(this.infoUsuario));
        this.mensaje.showMessageSuccess('Preferencia guardada');
      },
      error: (err) => {
        console.log(err)
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {
        this.mensaje.closeLoading();
        this.initForm();
      },
    });
  }

  onVerCatalogo = () => {
    this.router.navigate(['client/catalogo']);
  }

  onVerCarrito = () => {
    this.router.navigate(['client/carrito']);
  }
}
