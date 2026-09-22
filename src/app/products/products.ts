

import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { AsyncPipe, CurrencyPipe, SlicePipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith } from "rxjs";
import { ProductsActions } from "./products.actions";
import { productSelector } from "./products.selectors";
import { CartActions } from "../cart/cart.actions";
import { Product } from "./products.reducer";

@Component({
  imports: [AsyncPipe, CurrencyPipe, SlicePipe],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products implements OnInit {

  private store = inject(Store);

  products$ = this.store.select(
    productSelector.selectProductsList
  );

  error$ = this.store.select(
    productSelector.selectError
  );

  loading$ = this.store.select(
    productSelector.selectLoading
  );

  totalPages = signal(1);

  // itemsPerPage = 4;

  currentPage = signal(1);

  previousToggle = computed(
    () => this.currentPage() === 1
  );

  nextToggle = computed(
    () => this.currentPage() === this.totalPages()
  );

  private categorySubject = new BehaviorSubject<string>('all');

  category$ = this.categorySubject.pipe(
    // debounceTime(1000)
    distinctUntilChanged()
  );

  private minPriceSubject = new BehaviorSubject<number>(0);

  minPrice$ = this.minPriceSubject.asObservable();

  private maxPriceSubject = new BehaviorSubject<number>(1000);

  maxPrice$ = this.maxPriceSubject.asObservable();

  private searchSubject = new BehaviorSubject<string>('');

  search$ = this.searchSubject.pipe(
    debounceTime(1000),
    distinctUntilChanged()
  );

  private sortSubject = new BehaviorSubject<string>("default")

  sort$ = this.sortSubject.pipe(distinctUntilChanged())

  private pageSizeSubject = new BehaviorSubject<number>(4);

  pageSize$ = this.pageSizeSubject.pipe(distinctUntilChanged())


  filteredProducts$ = combineLatest([
    this.products$,
    this.category$.pipe(startWith('all')),
    this.minPrice$.pipe(startWith(0)),
    this.maxPrice$.pipe(startWith(1000)),
    this.search$,
    this.sort$
  ]).pipe(

    map(([products, category, minPrice, maxPrice, search, sort]) => {

      const filteredProducts = products.filter(product => {

        const categoryMatch =
          category === 'all' ||
          product.category === category;

        const priceMatch =
          product.price >= minPrice &&
          product.price <= maxPrice;

        const searchMatch =
          product.title
            .toLowerCase()
            .includes(search.toLowerCase());



        return categoryMatch && priceMatch && searchMatch;
      });

      // this.totalPages.set(
      //   Math.max(
      //     1,
      //     Math.ceil(
      //       filteredProducts.length / this.itemsPerPage
      //     )
      //   )
      // );

      switch (sort) {
        case "low-high": {
          return [...filteredProducts].sort((a, b) => a.price - b.price)
        }
        case "high-low": {
          return [...filteredProducts].sort((a, b) => b.price - a.price);

        }
        case "name-az": {
          return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
        }
        case "name-za": {
          return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title))
        }
        default: {
          return filteredProducts
        }

      }

      return filteredProducts;
    })
  );
  private currentPageSubject =
    new BehaviorSubject<number>(1);

  currentPage$ =
    this.currentPageSubject.asObservable();


  paginatedProducts$ = combineLatest([
    this.filteredProducts$,
    this.currentPage$,
    this.pageSize$
  ]).pipe(

    map(([products, page, pageSize]) => {

      const startIndex =
        (page - 1) * pageSize;

      const endIndex =
        startIndex + pageSize;

      this.totalPages.update(() => Math.max(1, Math.ceil(products.length / pageSize)))

      return products.slice(
        startIndex,
        endIndex
      );
    })
  );



  ngOnInit(): void {

    this.store.dispatch(
      ProductsActions.productsLoading()
    );
  }

  changeCategory(category: string) {

    this.categorySubject.next(category);

    this.currentPage.set(1);

    this.currentPageSubject.next(1);
  }

  changePriceRange(
    minPrice: number,
    maxPrice: number
  ) {

    this.minPriceSubject.next(minPrice);

    this.maxPriceSubject.next(maxPrice);

    this.currentPage.set(1);

    this.currentPageSubject.next(1);
  }

  changeSort(sortOption: string) {
    this.sortSubject.next(sortOption);
    this.currentPage.set(1);
    this.currentPageSubject.next(1)
  }

  previous() {

    if (this.currentPage() === 1) {
      return;
    }

    this.currentPage.update(
      page => page - 1
    );

    this.currentPageSubject.next(
      this.currentPage()
    );
  }

  next() {

    if (
      this.currentPage() === this.totalPages()
    ) {
      return;
    }

    this.currentPage.update(
      page => page + 1
    );

    this.currentPageSubject.next(
      this.currentPage()
    );
  }

  addToCart(product: Product) {

    this.store.dispatch(
      CartActions.addToCart({
        item: product
      })
    );
  }

  searchProducts(value: string) {
    this.searchSubject.next(value);
    this.currentPage.set(1);
    this.currentPageSubject.next(1)
  }

  changePageSize(pageSize: string) {
    this.pageSizeSubject.next(Number(pageSize));
    this.currentPage.set(1)
    this.currentPageSubject.next(1)
    // this.totalPages.update(()=>)

  }
}