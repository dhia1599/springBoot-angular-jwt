import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {AxiosService} from '../../shared/_services/axios/axios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  active: string = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private axiosService: AxiosService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['error'] === 'not-authenticated' ? 'Please log in to access this page.' : null;
    });

    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setActiveTab(tab: string) {
    this.active = tab;
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.axiosService
        .request('POST', '/login', this.loginForm.value)
        .then((response) => {
          console.log('Login successful, token:', response.data.token);
          this.authService.setToken(response.data.token);
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid login credentials. Please try again.';
        });
    }
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.axiosService
        .request('POST', '/register', this.registerForm.value)
        .then(() => {
          alert('Registration successful! Please log in.');
        })
        .catch((error) => {
          console.error('Registration error:', error);
          this.errorMessage = 'Failed to register. Try again later.';
        });
    }
  }
}
