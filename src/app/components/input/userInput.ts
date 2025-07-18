import { Component, Input } from '@angular/core';
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

}
