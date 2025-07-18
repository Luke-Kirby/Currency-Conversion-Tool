import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Currency } from '../../services/api-interface';

@Component({
  selector: 'app-select',
  imports: [CommonModule, MatSelectModule],
  templateUrl: './select.html',
  styleUrl: './select.scss'
})
export class Select {
  @Input() label: string = '';
  @Input() data: Currency[] = [];
  @Input() isLoading: boolean = false;
  
  @Output() selectedCurr = new EventEmitter<Currency>();

  onSelectionChange(value: Currency) {
    this.selectedCurr.emit(value);
  }

}
