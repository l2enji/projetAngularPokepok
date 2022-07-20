import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Produit } from 'src/app/models/produit/produit';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http:HttpClient) { }

  getAllProduits(){
    return this.http.get(AppSettings.APP_URL+"/produits");
  //return this.http.get("http://localhost:3082/produits");
  }
  createProduit(produit:Produit){
    return this.http.post(AppSettings.APP_URL+"/produits",produit);
  }
}
