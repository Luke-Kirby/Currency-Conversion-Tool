import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

// Was maybe overkill to create the button as it's own component but is good to demonstrate how I implement
// and use components. Also I'm using this as a wrapper; means if ever more complexity is required, I can update 
// it here, and I dont need to refactor components in buisnenss logic. This also means, if I want to change my 
// component library, I can refactor it easily by simply changing the wrapper

@Component({
  selector: 'app-button',
  imports: [MatButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
   @Input() label: string = '';
}
