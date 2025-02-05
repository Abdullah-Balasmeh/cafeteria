import { Component, EventEmitter, Input, Output, signal, SimpleChanges } from '@angular/core';
import { LoadingImageComponent } from "../../main/shared/loading-image/loading-image.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-cafeteria',
  standalone: true,
  imports: [LoadingImageComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-cafeteria.component.html',
  styleUrl: './edit-cafeteria.component.css'
})
export class EditCafeteriaComponent {
  @Input() user: any = null;
  @Output() close = new EventEmitter<void>();
  private readonly destroy$ = new Subject<void>();
  oldPassword='';
  restPasswordS = false;
  restBtn=signal(true) ;
  visible = true;
  changeType = true;
  errorMessage = '';
  successMessage = false;
  isLoading =signal<boolean>(false) ;

  EditCafeteriaForm = new FormGroup({
    cafName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    cafLocation: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\u0621-\u064A\u0660-\u0669\s\,]+$/),]),
    cafId: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(12),
    ]),
    empId: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern(/^\d{2,12}$/),
    ]),
    empName: new FormControl('', [Validators.required, Validators.minLength(2),Validators.pattern(/^[A-Za-z\u0621-\u064A\u0660-\u0669\s]+$/),]),
    password: new FormControl('', [Validators.minLength(4), Validators.maxLength(26)]),
    ConfirmPassword: new FormControl(''),
  });

  selectedRoles: string[] = [];

  private readonly roleMapping: { [key: string]: string } = {
    'Admin': '1',
    'Manager': '2',
    'Receptionist': '3',
    'Doctor': '4',
    'Nurse Male': '5',
    'Nurse Female': '6',
    'Pharmacist': '7',
  };


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.EditCafeteriaForm.patchValue({
        empId: this.user.userId,
        empName: this.user.userName,
      });

      // Set password only if password reset is not triggered
      if (!this.restPasswordS) {
        

      }
  
      this.selectedRoles = (this.user.roles?.map((roleName: string) => this.roleMapping[roleName]) || []);
    }
  }
  

  restPassword(): void {
    this.restPasswordS = true;
    this.restBtn.set(false);
  }

  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  Role(selected: string[]): void {
    this.selectedRoles = selected.map(roleName => this.roleMapping[roleName]).filter(Boolean);

  }

  onSubmit(): void {
    this.isLoading.set(true) ;
    if(this.selectedRoles.length == 0 || this.EditCafeteriaForm.invalid)
      {
        this.errorMessage ='يرجى تعبئة جميع الحقول بشكل صحيح';
        this.isLoading.set(false);
        return ;
      }
    if (this.EditCafeteriaForm.valid) {
      const formValues = this.EditCafeteriaForm.getRawValue();
      if (this.restPasswordS && formValues.password !== formValues.ConfirmPassword ) {
          this.errorMessage = 'كلمة المرور غير متطابقة!';
          this.isLoading.set(false);
          return;
      }
      this.errorMessage = '';
      const roleIds = this.selectedRoles.filter(Boolean);
      const request = {
        user: {
          userId: formValues.empId!,
          userName: formValues.empName!,
          password: this.restPasswordS ? formValues.password! : this.oldPassword, 
        },
        roleIds,
      };
  
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  closeDialog(): void {
    this.close.emit();
  }
}
