import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


export interface Stuff {
  _id?: string;       
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupérer tous les articles
  getAllStuffs(): Observable<Stuff[]> {
     const token = this.authService.getToken(); // récupère ton token du localStorage
      const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // IMPORTANT
    });
    return this.http.get<Stuff[]>(this.apiUrl,{ headers })
      .pipe(
        map((response: any) => response) // tu peux même enlever le map si l'API renvoie déjà un tableau
      );
  }

  // Récupérer un article par id
  getStuffById(id: string): Observable<Stuff> {
    const token = this.authService.getToken(); // récupère ton token du localStorage
      const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // IMPORTANT
    });
    return this.http.get<Stuff>(`${this.apiUrl}/${id}`,{ headers });
  }

  // Créer un article
  createStuff(stuff: Stuff): Observable<Stuff> {
      const token = this.authService.getToken(); // récupère ton token du localStorage
      const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // IMPORTANT
    });
    return this.http.post<Stuff>(this.apiUrl, stuff, { headers });
  }

  // Mettre à jour un article
  updateStuff(id: string, stuff: Stuff): Observable<Stuff> {
      const token = this.authService.getToken(); // récupère ton token du localStorage
      const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // IMPORTANT
    });
    return this.http.put<Stuff>(`${this.apiUrl}/${id}`, stuff, { headers });
  }

  // Supprimer un article
  deleteStuff(id: string): Observable<any> {
      const token = this.authService.getToken(); // récupère ton token du localStorage
      const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // IMPORTANT
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
