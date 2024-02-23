import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/ProductType';
import { map } from 'rxjs/operators';
import { shopParams } from '../shared/models/shop';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:7256/api/';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: shopParams, searchString: string) {
    let params = new HttpParams().set(
      'searchString',
      searchString ? searchString : ''
    );
    if (shopParams.brandId) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    return this.http
      .get(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }

  getBrand() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
  getResetProducts() {
    return this.http.get(this.baseUrl + 'products');
  }
}
