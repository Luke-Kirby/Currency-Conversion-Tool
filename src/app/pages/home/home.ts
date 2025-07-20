import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// for the purpose of this app, I have not set up an alias, ie @ - but if this was a production app, I would set up a sensible alias pattern
import { ApiService } from '../../services/api.service';
import { Card } from '../../components/card/card';
import { Select } from '../../components/select/select';
import { Button } from '../../components/button/button';
import { UserInput } from '../../components/input/userInput';
import { Notification, MessageType } from '../../components/notification/notification';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Currency, CurrenciesResponse, ConvertResponse } from '../../services/api-interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Card, UserInput, Select, Button, Notification, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit {

  constructor(private apiService: ApiService) { }

  //Currency variables
  currencies: Currency[] = []; //List of our currencies to populate the dropdowns
  selectedFromCurr: Currency | null = null;
  selectedToCurr: Currency | null = null;

  //Amount variables
  fromAmount: number | null = null;
  toAmount: number | null = null;

  //Loading variables
  isCurrencyLoading: boolean = false;
  isConversionLoading: boolean = false;

  //User Handling
  showNotification: boolean = false;
  notificationType: MessageType = "error";
  notificationMessage: string = "";

  //Function that runs as the page initializes
  ngOnInit(): void {
    // this does not need to be asynchronous - because we are subscribing to the data, we can manipulate the page dynmically
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.isCurrencyLoading = true;

    //API call to fetch the list of currencies
    this.apiService.getCurrencies('fiat').subscribe({ //Assuming we only want "fiat" for this project
      next: (data: CurrenciesResponse) => {
        this.currencies = data.response;
        this.isCurrencyLoading = false;
      },
      error: (err: unknown) => {
        // we could catch specific errors - with if typeof ... but maybe overkill for this.
        this.showNotificationMessage("error", "There was a problem with the request")
        console.error('Error loading currencies:', err);
        this.isCurrencyLoading = false;
      }
    });
  }

  calculateConversion(): void {
    this.isConversionLoading = true;

    //Check if the user has completed the inputs properly
    if (!this.selectedFromCurr || !this.selectedToCurr || this.fromAmount === null) {
      this.showNotificationMessage("warning", "Please select both currencies and enter an amount.")
      this.isConversionLoading = false;
      return;
    }
    
    //API call to calculate the result
    this.apiService.convertCurrency(
      //Pass the inputted data into the API request
      this.selectedFromCurr.short_code,
      this.selectedToCurr.short_code,
      this.fromAmount
    ).subscribe({
      next: (data: ConvertResponse) => {
        this.toAmount = data.response.value;
        this.isConversionLoading = false;
      },
      error: (err: unknown) => {
        this.showNotificationMessage("error", "There was a problem with the request.")
        console.error('Conversion failed:', err);
        this.isConversionLoading = false;
      }
    });
  }

  //Some easy wins below that were quick to make

  swapCurrencies(): void {
    //Swap the values of the variables

    [this.selectedFromCurr, this.selectedToCurr] = [this.selectedToCurr, this.selectedFromCurr];
    [this.fromAmount, this.toAmount] = [this.toAmount, this.fromAmount];
  }

  showNotificationMessage(status: MessageType, message: string): void {
    // Easiest way to provide feedback to the user for a small app like this is just use a notification bar

    this.notificationMessage = message;
    this.notificationType = status;
    this.showNotification = true;

    //Show the notification message for 5 seconds
    setTimeout(() => {
    this.showNotification = false;
    }, 5000);
  }
}