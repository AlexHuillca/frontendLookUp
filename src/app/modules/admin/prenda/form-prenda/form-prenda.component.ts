import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, of, map } from 'rxjs';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';
import { PrendaService } from '../../../../services/prenda.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { Utils } from '../../../../utils/utils';
import { MarcaService } from '../../../../services/marca.service';

@Component({
  selector: 'app-form-prenda',
  standalone: false,

  templateUrl: './form-prenda.component.html',
  styleUrl: './form-prenda.component.css'
})
export class FormPrendaComponent implements OnInit {

  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;

  id: any = null;
  prenda: any = null;
  categorias: any[] = [];
  marcas: any[] = [];
  tallas: any[] = Utils.tallas;

  selectedImage: File | null = null;

  constructor(private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private prendaService: PrendaService,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.initForm();

    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      nombrePrenda: [this.prenda?.nombrePrenda, [Validators.required, Validators.maxLength(100)]],
      tipoPrenda: [this.prenda?.tipoPrenda, [Validators.required, Validators.maxLength(100)]],
      colorPrenda: [this.prenda?.colorPrenda, [Validators.maxLength(100)]],
      talla: [this.prenda?.talla, [Validators.required, Validators.maxLength(30)]],
      precioOriginal: [this.prenda?.precioOriginal, [Validators.required, Validators.min(0)]],
      precioFinal: [this.prenda?.precioFinal, [Validators.required, Validators.min(0)]],
      marca: [this.prenda?.marca.idMarca, [Validators.required]],
      categoria: [this.prenda?.categoria.idCategoria, [Validators.required]],
      url: [null, []],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  inicializarData = () =>{
    this.mensaje.showLoading();
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
        next: (res) => {},
        error: (err) => {
          this.mensaje.showMessageErrorObservable(err);
        },
        complete: () => {
          this.mensaje.closeLoading();
          this.initForm();

          console.log(this.prenda);
        },
      });
  }

  save = (dato: any ) => {
    this.mensaje.showLoading();
    this.prendaService.save(dato).subscribe({
      next: (res) => {
        console.log(res)
        this.mensaje.showMessageSuccess('Prenda registrado');
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0]; // Guarda el archivo seleccionado
    }
  }

  onClickVolver = () => {
    this.router.navigate(['admin/prenda']);
  }

  onClickGuardar = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      nombrePrenda: this.form.get('nombrePrenda')?.value,
      tipoPrenda: this.form.get('tipoPrenda')?.value,
      colorPrenda: this.form.get('colorPrenda')?.value,
      talla: this.form.get('talla')?.value,
      precioOriginal: this.form.get('precioOriginal')?.value,
      precioFinal: this.form.get('precioFinal')?.value,
      idmarca: this.form.get('marca')?.value ,
      idcategoria: this.form.get('categoria')?.value ,
      url: this.form.get('url')?.value,
    };

    const confirmation = this.mensaje.crearConfirmacion(`¿Seguro que desea ${this.prenda ? 'actualizar' : 'registrar'} los datos?`);
    confirmation.componentInstance.onSi.subscribe(() => {
      this.save(dato);
    });
  };

}
