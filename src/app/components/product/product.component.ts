import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProduitService } from 'src/app/services/produit/produit.service';
import { Produit } from 'src/app/models/produit/produit';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public productList: any;
  public productList2: Produit[] = [];
  public item: Produit = new Produit();
  public items: Produit[] = [];

  constructor(private produitService: ProduitService, private cartService: CartService) { }

  ngOnInit(): void {
    //this.produitService.getAllProduits();

    this.searchProduct('');
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
  public onSelect(searchTerm: string): void {
    //console.log(searchTerm);
    const results: Produit[] = [];
    for (const produit of this.productList) {

    }
  }

  public searchProduct(searchTerm: string): void {
    console.log(searchTerm);
    let results: Produit[] = [];
    for (const item of this.productList2) {
      if (item.descriptif.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        item.designation.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(item);
      }
    }
    console.log(results);


    this.items = results;
    if (results.length === 0 || !searchTerm) {
      //this.items = this.productList;
      this.produitService.getAllProduits().subscribe( /*récupere les données pour le mettre dans résultat*/
        (resultat) => {
          console.log(resultat);

          this.productList = resultat; /*met resultat dans la variable productList*/

          this.productList.forEach((a: any) => {
            Object.assign(a, { quantity: 1, total: a.price });
          });
        }
      )
    }
  }
}
