import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from '../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../utils/form-validation-utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mensaje: MensajesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      identificacion: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      edad: [null, [Validators.required, Validators.maxLength(45)]],
      direccion: [null, [Validators.maxLength(45)]],
      email: [null, [Validators.maxLength(45), Validators.email]],
      telefono: [null, [Validators.maxLength(45)]],
      genero: [null, []],
      rol: [null, []],
      username: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(45)],
      ],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  onRegister(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dato = {
      edad: this.form.get('edad')?.value,
      direccion: this.form.get('direccion')?.value,
      correo: this.form.get('email')?.value,
      dni: this.form.get('identificacion')?.value,
      nombres: this.form.get('nombres')?.value,
      celular: this.form.get('telefono')?.value,
      Nombre_Usuario: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      enabled: true,
      type: this.form.get('rol')?.value,
      genero: this.form.get('genero')?.value,
    };

    this.authService.register(dato).subscribe({
      next: (res) => {
        console.log(res)
        this.mensaje.showMessageSuccess('Usuario registrado');
        this.initForm();
      },
      error: (err) => {
        console.log(err)
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {},
    });
  }

  onBack = () => {
    this.router.navigate(['auth/login']);
  }
}

