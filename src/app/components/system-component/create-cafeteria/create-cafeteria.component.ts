import { Component, signal, ViewChild } from '@angular/core';
import { LoadingImageComponent } from "../../main/shared/loading-image/loading-image.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { MultiSelectDropdownComponent } from '../../main/shared/dropdown-menu/dropdown-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-cafeteria',
  standalone: true,
  imports: [LoadingImageComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './create-cafeteria.component.html',
  styleUrl: './create-cafeteria.component.css'
})
export class CreateCafeteriaComponent {
@ViewChild(MultiSelectDropdownComponent) dropdown!: MultiSelectDropdownComponent;
  private readonly destroy$ = new Subject<void>();
  visible = true;
  changeType = true;
  errorMessage = signal<string>('');
  successMessage= signal<boolean>(false);
  isLoading = signal<boolean>(false);
  isExist=false;
  cafeteriaForm = new FormGroup({
    empName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\u0621-\u064A\u0660-\u0669\s]+$/),]),
    empId: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(12),
    ]),
    cafName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    cafLocation: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\u0621-\u064A\u0660-\u0669\s\,]+$/),]),
    cafId: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(12),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(26),
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required ,
      Validators.minLength(4),
      Validators.maxLength(26),]),
  });
  
  selectedRoles: string = '';
  
  Role(selected: string): void {
    this.selectedRoles = selected;
  }
  

  validateFieldPassword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 4 || value.length > 26) {
      inputElement.setCustomValidity(
        'يرجى إدخال كلمة المرور على أن لا تقل عن 4 خانات ولا تزيد عن 26 خانة'
      );
    } else {
      inputElement.setCustomValidity('');
    }
  }

  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  // Handle form submission
  onSubmit(): void {
    this.isLoading.set(true);
    if(this.selectedRoles.length == 0 || this.cafeteriaForm.invalid)
      {
        this.errorMessage.set('يرجى تعبئة جميع الحقول بشكل صحيح');
        this.isLoading.set(false);
        return ;
      }
      const formValues = this.cafeteriaForm.value;
      if (formValues.password !== formValues.ConfirmPassword) {
        this.errorMessage.set('كلمة المرور غير متطابقة!');
        this.isLoading.set(false);
        return;
      }

          const request = {
            user: {
              userName: formValues.empName!,
              userId: formValues.empId!,
              password: formValues.password!,
              salt:'',
              createDate: new Date().toISOString(),
            },
            roles: this.selectedRoles,
          };

          }
          ngOnDestroy(): void {
            this.destroy$.next();
            this.destroy$.complete();
          }
}
