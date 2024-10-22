import { Injectable } from '@angular/core';
import { Plat } from '../model/plat.model';
import { Pays } from '../model/pays.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaysWrapper } from '../model/PaysWrapper.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  apiURL: string = 'http://localhost:8080/api/plats'; // API URL for plats
  paysURL: string = 'http://localhost:8080/api/pays'; // API URL for pays
  plats: Plat[];
  pays: Pays[];

  constructor(private http: HttpClient) {
    this.plats = [];
    this.pays = [];
  }

  // Fetch all plats
  listePlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(this.apiURL);
  }

  // Add a new plat
  ajouterPlat(prod: Plat): Observable<Plat> {
    return this.http.post<Plat>(this.apiURL, prod, httpOptions);
  }

  // Delete a plat by ID
  supprimerPlat(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  // Get a specific plat by ID
  consulterPlat(id: number): Observable<Plat> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Plat>(url, httpOptions);
  }

  // Sort the plats
  trierPlats() {
    this.plats = this.plats.sort((n1, n2) => {
      if (n1.idPlat! > n2.idPlat!) {
        return 1;
      }
      if (n1.idPlat! < n2.idPlat!) {
        return -1;
      }
      return 0;
    });
  }

  // Update an existing plat
  updatePlat(plat: Plat): Observable<Plat> {
    const url = `${this.apiURL}/${plat.idPlat}`; // Include the plat ID in the URL
    return this.http.put<Plat>(url, plat, httpOptions);
  }

  // Fetch all pays
  listePays(): Observable<PaysWrapper> {
    return this.http.get<PaysWrapper>(this.paysURL); // Changed to use pays URL
  }


  rechercherParPays(idPays: number): Observable<Plat[]> {
    const url = `${this.apiURL}/pays/${idPays}`;
    return this.http.get<Plat[]>(url);
  } 

  
  rechercherParNom(nom: string): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiURL}/search/name?name=${nom}`);
  }

  ajouterPays( p: Pays):Observable<Pays>{
    return this.http.post<Pays>(this.paysURL, p, httpOptions);
   }


   supprimerPays(id : number) {
    const url = `${this.paysURL}/${id}`;
    return this.http.delete(url, httpOptions);
    } 

}
