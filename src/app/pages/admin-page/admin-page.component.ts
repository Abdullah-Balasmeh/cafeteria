import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  isChildRoute = signal(false);
  private readonly router: Router = inject(Router);

  constructor() {
    this.router.events.subscribe(() => {
      this.isChildRoute.set(this.router.url.includes('/admin-page/employee-section'));
    });
  }

  navigateToEmployeeSection() {
    this.router.navigate(['/admin-page/employee-section']);
  }
}
