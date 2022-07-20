import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit/produit';
import { ProduitService } from 'src/app/services/produit/produit.service';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
//form:FormGroup;
declare produit:any[];

  constructor(//private formBuilder:FormBuilder, 
    private produitService:ProduitService,
    private router:Router) { }

  ngOnInit(): void {
    /*this.form = this.formBuilder.group(
      
      {
        id :[Validators.required],
        ref :[Validators.required],
        designation :[Validators.required],
        descriptif :[Validators.required],
        prixVenteHT :[Validators.required],
      }
      );*/

  this.getProduits();

  }
getProduits(){
  this.produitService.getAllProduits().subscribe( //récupere les données et affiche
    data=>{
      console.log(data);
      this.produit=data as any[];
    }
  );
}
}
