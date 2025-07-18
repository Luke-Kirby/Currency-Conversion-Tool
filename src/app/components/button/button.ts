import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
   @Input() label: string = '';
   @Input() loading: boolean = false;
   @Input() disabled: boolean = false;
   @Input() disabledMsg: string = "";
}
