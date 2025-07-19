import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

//Usually can have a seperate file for all the types but lets just keep it here for simplicity
export type MessageType = 'error' | 'warning' | 'success';
type MessageColorMap = Record<MessageType, string>;

@Component({
  selector: 'app-notification',
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {
   @Input() message: string = '';
   @Input() messageType: MessageType = 'error';

   messageColor: MessageColorMap = {
    error: "red",
    warning: "orange",
    success: "green"
   }
}
