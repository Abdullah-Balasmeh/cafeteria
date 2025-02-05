import { Component, signal } from '@angular/core';
import { LoadingImageComponent } from "../../main/shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EditCafeteriaComponent } from "../edit-cafeteria/edit-cafeteria.component";

@Component({
  selector: 'app-cafeteria-table',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, EditCafeteriaComponent],
  templateUrl: './cafeteria-table.component.html',
  styleUrl: './cafeteria-table.component.css'
})
export class CafeteriaTableComponent {
isLoading = signal<boolean>(true);

  isEditModalOpen =signal<boolean>(false);
  showTab: boolean = true;
  ngOnInit(): void {
    this.loadUsers();
  }

  // Fetch users from the API
  loadUsers(): void {

  }

  // Delete a user by ID
  deleteUser(userId: string): void {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
  
    }
  }
  openEditModal(user: any): void {
    console.log(user);
    this.isEditModalOpen.set(true) ; 
    this.showTab = false;
  }
  closeDialog()
  {
    this.isEditModalOpen.set(false);
    this.showTab = true;
  }
  
}
