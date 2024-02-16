import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/ProductType';
import { shopParams } from '../shared/models/shop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm!: ElementRef;
  products!: IProduct[];
  brands!: IBrand[];
  types!: IType[];
  shopParams = new shopParams();
  searchString: string | null = null;
  sortOption = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrand();
    this.getTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(this.shopParams, this.searchString!)
      .subscribe({
        next: (response: any) => {
          this.products = response;
        },
      });
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopService.getResetProducts().subscribe({
      next: (response: any) => {
        this.products = response;
      }
    })
  }

  getBrand() {
    this.shopService.getBrand().subscribe({
      next: (response: any) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response: any) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onSearch(search: string): void {
    this.searchString = search;
    this.getProducts();
  }
}
