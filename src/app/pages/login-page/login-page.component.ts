import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingImageComponent } from '../../components/main/shared/loading-image/loading-image.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingImageComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  visible = true; 
  changeType = true;
  loginUserForm = new FormGroup({
    userID: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(12),
      Validators.pattern(/^\d{2,12}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(26),
    ]),
  });
  validateFieldID(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 1 || value.length > 12) {
      inputElement.setCustomValidity(
        'يرجى إدخال رقم المستخدم'
      );
    } else {
      inputElement.setCustomValidity('');
    }
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
  onSubmit(){
    this.isLoading.set(true);
  }
}
