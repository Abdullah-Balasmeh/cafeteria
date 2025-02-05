import { SysAdminService } from './../../services/sys-admin.service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { LoadingImageComponent } from "../../components/main/shared/loading-image/loading-image.component";



@Component({
  selector: 'app-login-sys-page',
  standalone: true,
  imports: [LoadingImageComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login-sys-page.component.html',
  styleUrl: './login-sys-page.component.css' 
})
export class LoginSysPageComponent {
  private readonly sysAdminService=inject(SysAdminService);
  private readonly destroy$ = new Subject<void>();
  private readonly router = inject(Router);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  visible = true; 
  changeType = true;

  loginUserForm = new FormGroup({
    userID: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(12),
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
      inputElement.setCustomValidity('يرجى إدخال رقم المستخدم');
    } else {
      inputElement.setCustomValidity('');
    }
  }

  validateFieldPassword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 4 || value.length > 26) {
      inputElement.setCustomValidity('يرجى إدخال كلمة المرور على أن لا تقل عن 4 خانات ولا تزيد عن 26 خانة');
    } else {
      inputElement.setCustomValidity('');
    }
  }

  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  onSubmit() {
    if (this.loginUserForm.valid) {
      this.isLoading.set(true);
      const { userID , password } = this.loginUserForm.value;
      
      this.sysAdminService
        .loginUser({ id: userID! , password: password as string })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.router.navigate(['/system-page'], { replaceUrl: true }).then(() => {
              window.history.pushState(null, '', '/system-page');
            });
          },
          error: () => {
            this.errorMessage.set('رقم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
            this.isLoading.set(false);
          },
        });
    }
  }
}
