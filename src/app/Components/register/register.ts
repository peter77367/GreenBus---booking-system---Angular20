import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators , FormGroup } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-register',
  imports: [ RouterModule , CommonModule , ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {


    registerForm: FormGroup;

    showPassword : boolean = false;

  constructor (private fb: FormBuilder ,
               private toastr: ToastrService , 
               private router : Router , 
               private authService: AuthService 
                   ) { 

     this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

onSubmit(): void {
  if (this.registerForm.valid) {
    const data = this.registerForm.value;

    this.authService.register(data).subscribe({
      next: (res) => {
        this.toastr.success('Registration successful ');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.toastr.error('Registration failed ');
      }
    });
  } else {
    this.registerForm.markAllAsTouched();
  }
}
}




