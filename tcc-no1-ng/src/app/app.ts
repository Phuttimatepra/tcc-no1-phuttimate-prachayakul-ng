import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowUser } from "./show-user/show-user";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, ShowUser],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('tcc-no1-ng');
}
