import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  imports: [MatSelectModule],
  templateUrl: './select.html',
  styleUrl: './select.scss'
})
export class Select {
   @Input() label: string = '';

}
