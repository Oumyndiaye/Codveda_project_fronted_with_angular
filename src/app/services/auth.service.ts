import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; // URL de ton backend
  private tokenKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

  // Inscription
  signup(data: AuthData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // Connexion
  login(data: AuthData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
    // Sauvegarde le token après login/signup
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Récupère le token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  // Déconnexion (optionnel)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']); // redirige vers login

  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {        
    return !!this.getToken();
  }
}
