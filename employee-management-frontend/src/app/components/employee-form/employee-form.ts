import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';



@Component({
  selector: 'app-employee-form',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit{
  employeeForm: FormGroup;
  submitted = false;
  error: string = '';
  isEditMode = false;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.isEditMode = true;
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (emp: any) => {
          this.employeeForm.patchValue({
            name: emp.name,
            email: emp.email,
            position: emp.position
          });
        },
        error: (err) => this.error = 'Failed to load employee'
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) return;

    const employeeData = this.employeeForm.value;

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => this.error = 'Failed to update employee'
      });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => this.error = 'Failed to add employee'
      });
    }
  }

  // Helper getters
  get name() { return this.employeeForm.get('name'); }
  get email() { return this.employeeForm.get('email'); }
  get position() { return this.employeeForm.get('position'); }

}
