export class Produit {
        public id: number;
        public ref: string;
        public designation: string;
        public descriptif: string;
        public prixVenteHT: number;
        public image : string;
        public quantite : number;
    
        constructor(){
                this.id=0,
                this.ref='',
                this.designation='',
                this.descriptif='',
                this.prixVenteHT=0,
                this.image='',
                this.quantite=1;
        }
}
