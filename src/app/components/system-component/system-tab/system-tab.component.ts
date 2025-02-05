import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-system-tab',
  standalone: true,
  imports: [],
  templateUrl: './system-tab.component.html',
  styleUrl: './system-tab.component.css'
})
export class SystemTabComponent {
  @Output() tabChange = new EventEmitter<string>();
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
