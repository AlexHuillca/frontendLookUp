import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';
import { PrendaService } from '../../../../services/prenda.service';

@Component({
  selector: 'app-list-prenda',
  standalone: false,

  templateUrl: './list-prenda.component.html',
  styleUrl: './list-prenda.component.css'
})
export class ListPrendaComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 'nombre', 'tipo', 'color',
    'talla', 'precioOriginal', 'precioFinal', 'marca', 'categoria', 'imagen', 'acciones'
  ];
  dataSource!: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private prendaService: PrendaService,
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
    this.mensaje.showLoading();
    this.prendaService.list().subscribe({
      next: (res) => {
        const data = res;
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {
        this.mensaje.closeLoading();
      }
    });
  }

  eliminar = (id: any) => {
    this.mensaje.showLoading();
    this.prendaService.delete(id).subscribe({
      next: (res) => {
        this.mensaje.showMessageSuccess(res.mensaje);
      },
      error: (err) => {
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {
        this.mensaje.closeLoading();
        this.listar();
      }
    });
  }

  onClickNuevo = () => {
    this.router.navigate(['admin/prenda/add']);
  }

  onClickBuscar = () => {
    const filter = this.form.controls['filter'].value;
    this.dataSource.filter = filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickEditar = (item: any) => {
    this.router.navigate(['admin/prenda/edit', item.id]);
  }

  onClickEliminar = (item: any) => {
    const confirmation = this.mensaje.crearConfirmacion('¿Desea eliminar el registro?');
    confirmation.componentInstance.onSi.subscribe(() => {
      this.eliminar(item.id);
    });
  }
}
