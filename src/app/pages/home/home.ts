import { Component, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { UserInput } from '../../components/input/userInput';
import { Select } from '../../components/select/select';
import { Button } from '../../components/button/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { Currency, CurrenciesResponse } from '../../services/api-interface';

@Component({
  selector: 'app-home',
  imports: [Card, UserInput, Select, Button, MatFormFieldModule, MatButtonModule, MatIcon],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})


export class Home implements OnInit {

  //NEED TO ACTUALLY LEARN WHAT CONSTRUCTOR DOES...
  constructor(private apiService: ApiService) { }

  //Currency variables
  currencies: Currency[] = []; //variable for our list of currencies
  selectedFromCurr: Currency | null = null;
  selectedToCurr: Currency | null = null;

  //Loading variables
  isCurrencyLoading: boolean = false;
  isConversionLoading: boolean = false;

  //Function that runs as the page initialises
  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.isCurrencyLoading = true;
    this.apiService.getCurrencies('fiat').subscribe({ //Assuming we only want "fiat" for this project
      next: (data: CurrenciesResponse) => {
        this.currencies = data.response;
        console.log('Currencies loaded:', this.currencies);
        this.isCurrencyLoading = false;
      },
      error: (err) => {
        console.error('Error loading currencies:', err);
        this.isCurrencyLoading = false;
      }
    });
  }

}
