import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string[] = [];

  add(message: string) {

    if(this.message.includes(message)) return;
    else this.message.push(message);
  }

  clear() {
    this.message = [];
  }

}
