import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesService } from '../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../utils/form-validation-utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  frmValidationUtils!: FormValidationUtils;
  form!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.maxLength(45)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.frmValidationUtils = new FormValidationUtils(this.form);
  }

  onLogin(): void {
    if (this.form.invalid) {
      for (const control of Object.keys(this.form.controls)) {
        this.form.controls[control].markAsTouched();
      }
      return;
    }

    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    const dato = {
      Nombre_Usuario: username,
      password: password,
    };

    this.authService.login(dato).subscribe({
      next: (res) => {
        if(res?.estado == 0){
          this.mensaje.showMessageError(res?.mensaje);
        }else{

          localStorage.setItem('jwtToken', res?.jwtToken);
          localStorage.setItem('carrito', JSON.stringify([]));

          const rol = res?.user?.authorities;
          if(rol.filter((x: any) => x.name == 'ROLE_ADMIN').length > 0){
            res.user.rol = 'ADMIN';
            this.router.navigate(['admin/prenda']);
          }else if(rol.filter((x: any) => x.name == 'ROLE_CLIENTE').length > 0){
            res.user.rol = 'CLIENTE';
            this.router.navigate(['client/catalogo']);
          }
          localStorage.setItem('user', JSON.stringify(res?.user));

        }
      },
      error: (err) => {
        console.log(err)
        this.mensaje.showMessageErrorObservable(err);
      },
      complete: () => {},
    });
  }


  onKeyEnter(event: any): void{
    if(event.charCode == 13){
      this.onLogin();
    }
  }

  onRegister(): void{
    this.router.navigate(['auth/register']);
  }
}
