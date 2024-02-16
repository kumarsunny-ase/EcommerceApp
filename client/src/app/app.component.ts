import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  constructor(private http: HttpClient) {}
  products!: IProduct[];

  ngOnInit(): void {
    // this.http.get('products')
    // .subscribe({
    //  next: (response: any) => {
    //   this.products = response;
    //  }
    // });
  }
}
