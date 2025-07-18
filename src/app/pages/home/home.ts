import { Component, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { UserInput } from '../../components/input/userInput';
import { Select } from '../../components/select/select';
import { Button } from '../../components/button/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { Currency, CurrenciesResponse, ConvertResponse } from '../../services/api-interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Card, UserInput, Select, Button, MatFormFieldModule, MatButtonModule, MatIcon, MatProgressSpinnerModule],
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

  //Amount variables
  fromAmount: number | null = null;
  toAmount: number | null = null;

  //Loading variables
  isCurrencyLoading: boolean = false;
  isConversionLoading: boolean = false;

  //Function that runs as the page initialises
  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.isCurrencyLoading = true;

    //API call to fetch the list of currencies
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

  calculateConversion(): void {

    this.isConversionLoading = true;

    console.log("selectedFromCurr", this.selectedFromCurr)
    console.log("selectedToCurr", this.selectedToCurr)
    console.log("fromAmount", this.fromAmount)


    if (!this.selectedFromCurr || !this.selectedToCurr || this.fromAmount === null) {
      console.error('Please select both currencies and enter an amount.');
      this.isConversionLoading = false;
      return;
    }

    this.apiService.convertCurrency(
      this.selectedFromCurr.short_code,
      this.selectedToCurr.short_code,
      this.fromAmount
    ).subscribe({
      next: (data: ConvertResponse) => {
        this.toAmount = data.response.value;
        console.log("Conversion result:", this.toAmount);
      this.isConversionLoading = false;
      },
      error: (err) => {
        console.error('Conversion failed:', err);
        this.isConversionLoading = false;
      }
    });
  }

}
