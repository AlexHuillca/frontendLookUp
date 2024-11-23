import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { PrendaService } from '../../../../services/prenda.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';

@Component({
  selector: 'app-carrito',
  standalone: false,

  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'imagen', 'nombre', 'tipo', 'color',
    'talla', 'precio', 'marca', 'categoria', 'acciones'
  ];
  dataSource!: MatTableDataSource<any[]>;

  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;

  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  total: any = 0;

  constructor(private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private router: Router,) { }

  ngOnInit(): void {
    this.initForm();
    this.listar();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      filter: ''
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  listar = () => {
    this.dataSource = new MatTableDataSource(this.carrito);
    this.total = 0;
    this.carrito.forEach((element: any) => {
      this.total += element.precioFinal;
    });
  }

  eliminar = (index: any) => {
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.listar();
  }

  onClickNuevo = () => {
    this.router.navigate(['admin/prenda/add']);
  }

  onClickEditar = (item: any) => {
    this.router.navigate(['admin/prenda/edit', item.id]);
  }

  onClickEliminar = (index: any) => {
    const confirmation = this.mensaje.crearConfirmacion('¿Desea eliminar el registro?');
    confirmation.componentInstance.onSi.subscribe(() => {
      this.eliminar(index);
    });
  }

  onClickPagar = () => {
    this.carrito = [];
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    this.mensaje.showMessageSuccess('Compra exitosa');

    this.listar();
  }
}
