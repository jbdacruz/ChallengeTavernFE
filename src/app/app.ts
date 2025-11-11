import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public webaddress = "http://localhost:8080";
  protected readonly title = signal('untitled');
}
