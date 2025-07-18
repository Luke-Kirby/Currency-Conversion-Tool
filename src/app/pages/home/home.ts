import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { UserInput } from '../../components/input/userInput';
import { Select } from '../../components/select/select';
import { Button } from '../../components/button/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [Card, UserInput, Select, Button, MatFormFieldModule, MatButtonModule, MatIcon],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {

}
