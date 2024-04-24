import {Component, importProvidersFrom} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";

import { MessagesComponent } from './features/messages/messages.component';
import {InMemoryDataService} from "./in-memory-data.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MessagesComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tour of Heroes';
}
