import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

// Was maybe overkill to create the button as it's own component but
// is good to demonstrate how I implement and use components

@Component({
  selector: 'app-button',
  imports: [MatButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
   @Input() label: string = '';
}
