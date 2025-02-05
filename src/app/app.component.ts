import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/main/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly router =inject(Router);
  isSystemPage=signal(false);
  constructor() {
    this.router.events.subscribe(() => this.checkRouter());
  }
  checkRouter() {
    const systemPages = ['system-page', 'login-sys-page'];
    this.isSystemPage.set(systemPages.some(page => this.router.url.includes(page)));
  }
}
