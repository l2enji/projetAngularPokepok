import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/produit/produit';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProduitService } from 'src/app/services/produit/produit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem:number=0;
  public productList : any;
  public productList2: Produit[]=[];
  public item : Produit = new Produit();
  public items :Produit[] =[];

  constructor(private cartService:CartService, private produitService: ProduitService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(
      data =>{
        console.log(data);
        
        this.totalItem = data.length;
      }
    );
    
    
  }



}
