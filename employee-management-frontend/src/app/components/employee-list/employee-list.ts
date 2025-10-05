import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit{
   employees: any[] = [];
  loading = true;
  error = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employees';
        console.error(err);
        this.loading = false;
      }
    });
  }

  addEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees', id, 'edit']);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Failed to delete', err)
      });
    }
  }
  searchText: string = '';

  get filteredEmployees() {
    if (!this.searchText) {
      return this.employees;
    }
    return this.employees.filter(emp =>
      emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      emp.position.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
