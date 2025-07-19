import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrenciesResponse, ConvertResponse } from './api-interface';

//The easiest way for me to use these APIs is to create a dedicated service. Using rxjs, I can subscribe to
//observables to make my code a-syncronous. I just have to call my service in my app where I want to use it
//Also no need to unsubscribe from these services because the user will never leave this page

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  // For a real application we would securely provide the sensitive data below
  private readonly BASE_URL = 'https://api.currencybeacon.com/v1';
  private readonly API_KEY = 'barkNgA7Sc2wmS5uXufO2I8KqSq5hwiD';

  constructor(private http: HttpClient) { }

  //The key is to be used for every API, so lets make it re-usable
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.API_KEY}`,
    });
  }

  //I got this information from the link's documentation
  getCurrencies(type: 'fiat' | 'crypto'): Observable<CurrenciesResponse> {
    const params = new HttpParams().set('type', type);
    return this.http.get<CurrenciesResponse>(`${this.BASE_URL}/currencies`, {
      headers: this.getAuthHeaders(), //attach the key
      params,
    });
  }

  //I got this information from the link's documentation
  convertCurrency(from: string, to: string, amount: number): Observable<ConvertResponse> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('amount', amount);

    return this.http.get<ConvertResponse>(`${this.BASE_URL}/convert`, {
      headers: this.getAuthHeaders(),  //attach the key
      params,
    });
  }
}
