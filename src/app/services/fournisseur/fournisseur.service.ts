import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from 'src/app/models/fournisseur/fournisseur';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http:HttpClient) { }

  getAllFournisseur(){
    return this.http.get(AppSettings.APP_URL+"/fournisseur");
  }
  createProduit(fournisseur:Fournisseur){
    return this.http.post(AppSettings.APP_URL+"/fournisseur",fournisseur);
  }
}
