import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
})
export class LogIn {
  showPassword = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    this.toastr.warning('Please fill in all fields correctly.');
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe((users) => {
    if (users.length > 0) {

      this.authService.setLoggedInUser(users[0]);
      this.toastr.success('Login successful!');
      
      setTimeout(() => {
        this.router.navigate(['/home']); 
      }, 1000);
    } else {
      this.toastr.error('Invalid email or password.');
    }
  });
}

}
