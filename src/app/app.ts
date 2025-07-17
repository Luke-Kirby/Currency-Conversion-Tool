import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, MatInputModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('currency-conversion-tool');
}
