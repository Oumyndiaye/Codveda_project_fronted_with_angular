import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthData, AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-auth',
  imports: [RouterModule,FormsModule,CommonModule, ReactiveFormsModule,HeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authForm!: FormGroup;
  isLoginMode = false; // false -> inscription, true -> connexion
  
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router, private route: ActivatedRoute) {}

   ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
       // Détecter la route active
    this.route.url.subscribe(urlSegment => {
      const path = urlSegment[0]?.path;
      this.isLoginMode = path === 'login';
    });
  }
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset(); // réinitialise le formulaire à chaque switch

  }
  setMode(loginMode: boolean) {
    this.isLoginMode = loginMode;
    this.authForm.reset();
    if (loginMode) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/signup']);
    }

  }

  onLogout() {
    this.authService.logout();
  }

onSubmit() {
    if (this.authForm.invalid) return;

    const data: AuthData = this.authForm.value;

    if (this.isLoginMode) {
      this.authService.login(data).subscribe({
        next: res => {
          this.authService.saveToken(res.token)
          this.router.navigate(['/']);

        },
        error: err => alert(err.error.error)
      });
    } else {
      this.authService.signup(data).subscribe({
        next: res => {
          console.log('Inscription réussie', res);
          alert('Inscription réussie, vous pouvez maintenant vous connecter.');
          this.setMode(true); // passer en mode connexion
        },
        error: err => alert(err.error.error.message)
      });
    }
  }

}
