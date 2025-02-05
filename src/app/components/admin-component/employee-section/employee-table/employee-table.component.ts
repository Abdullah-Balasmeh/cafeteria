import { Component, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { EmployeeEditComponent } from "../employee-edit/employee-edit.component";
import { LoadingImageComponent } from '../../../main/shared/loading-image/loading-image.component';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, EmployeeEditComponent],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {

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
