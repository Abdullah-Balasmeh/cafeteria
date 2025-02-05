import { Component, EventEmitter, Output } from '@angular/core';
import { SystemTabComponent } from "../../components/system-component/system-tab/system-tab.component";
import { CreateCafeteriaComponent } from "../../components/system-component/create-cafeteria/create-cafeteria.component";
import { CafeteriaTableComponent } from "../../components/system-component/cafeteria-table/cafeteria-table.component";

@Component({
  selector: 'app-system-page',
  standalone: true,
  imports: [SystemTabComponent, CreateCafeteriaComponent, CafeteriaTableComponent ],
  templateUrl: './system-page.component.html',
  styleUrl: './system-page.component.css'
})
export class SystemPageComponent {
  @Output() resetEvent = new EventEmitter<void>();

  selectedTab: string = 'cafeteria-create';

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  onClose() {
    this.resetEvent.emit(); 
  }
}
