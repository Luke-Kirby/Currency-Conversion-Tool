import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-userInput',
  imports: [MatInputModule],
  templateUrl: './userInput.html',
  styleUrl: './userInput.scss'
})
export class UserInput {
   @Input() label: string = '';
   @Input() readonly: boolean = false;
   @Input() value: number | null = null;

   //Send the inputted number back to home component
   @Output() inputNumber = new EventEmitter<number>();
   
  onNumberInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value: number = inputElement.valueAsNumber;
    this.inputNumber.emit(value);
  }
}
