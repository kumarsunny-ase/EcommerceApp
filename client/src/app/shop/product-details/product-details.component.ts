import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product!: IProduct;

  constructor(private shopService: ShopService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProduct();
  }

 

  loadProduct() {
    const idString = this.route.snapshot.paramMap.get('id');
  if (idString !== null) {
    const id: number = +idString; // Parse string to number
    this.shopService.getProduct(id).subscribe({
      next: (response: any) => {
        this.product = response;
      }
    })
  }
  }
}
