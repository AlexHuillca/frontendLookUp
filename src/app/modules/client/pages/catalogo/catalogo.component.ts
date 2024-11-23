import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';
import { PrendaService } from '../../../../services/prenda.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthJWTService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-catalogo',
  standalone: false,

  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;

  categorias: any[] = [];
  prendas: any[] = [];
  pagina: any[] = [];
  verPreferencias: boolean = false;
  carrito: any[] = JSON.parse(localStorage.getItem('carrito') || '[]');

  constructor(private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private prendaService: PrendaService,
    private categoriaService: CategoriaService,
    private authService: AuthJWTService) { }

  ngOnInit(): void {

    this.initForm();
    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      filter: '',
      categoria: 0,
      preferencia: false,
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  inicializarData = () => {
    this.mensaje.showLoading();
    forkJoin({
      categorias: this.categoriaService.list(),
      prendas: this.prendaService.list(),
    })
      .pipe(
        map((res) => {
          this.categorias = res.categorias
          this.prendas = res.prendas
        })
      )
      .subscribe({
        next: (res) => { },
        error: (err) => {
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: () => {
          this.mensaje.closeLoading();
          this.onClickBuscar();
        },
      });
  }

  onCheck = () => {
    this.verPreferencias = !this.verPreferencias;
    if (this.verPreferencias) {
      const user = this.authService.getInfoUsuario();
      const preferencia = user?.preferencia[0];

      const filter = this.form.controls['filter']?.value?.trim().toLowerCase();

      this.pagina = this.prendas.filter((x) =>
      (x.nombrePrenda.toLowerCase().includes(filter) &&
        (
          x.tipoPrenda.toLowerCase().includes(preferencia?.tipo_prenda_favorito.toLowerCase()) ||
          x.colorPrenda.toLowerCase().includes(preferencia?.color_favorito.toLowerCase()) ||
          x.talla.toLowerCase().includes(preferencia?.talla_favorita.toLowerCase()) ||
          x.idCategoria?.idCategoria == preferencia.categoria ||
          x.idMarca?.idMarca == preferencia.marca

        )
      ));
      console.log(this.pagina)
    }else{
      this.onClickBuscar();
    }
  }

  onClickBuscar = (event: any = null) => {
    const filter = this.form.controls['filter']?.value?.trim().toLowerCase();

    if(this.verPreferencias){
      this.pagina = this.pagina.filter((x) => (x.nombrePrenda.toLowerCase().includes(filter)));
    }else{
      const categoria = event ?? this.form.controls['categoria'].value;
      this.pagina = this.prendas.filter((x) => (x.nombrePrenda.toLowerCase().includes(filter) && (categoria == 0 || x.idCategoria?.idCategoria == categoria)));
    }

  }

  onClickMas = (item: any) => {
    if (!item.cantidad) {
      item.cantidad = 1;
    } else {
      item.cantidad += 1;
    }
  }

  onClickMenos = (item: any) => {
    if (!item.cantidad) {
      item.cantidad = 0;
    } else {
      item.cantidad -= 1;
      if (item.cantidad < 0) {
        item.cantidad = 0;
      }
    }
  }

  onClickAgregarCarrito = (item: any) => {
    this.carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
    this.mensaje.showMessageSuccess('Producto agregado al carrito de compras');
  }
}
