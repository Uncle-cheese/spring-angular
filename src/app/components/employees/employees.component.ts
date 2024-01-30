import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../employess';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  employees: Employee[];
  editEmployee: Employee;
  deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (res: Employee[]) => {
        this.employees = res;
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
      );
  }
onAddEmployee(addForm: NgForm) {
  this.employeeService.addEmployees(addForm.value).subscribe(
    (res: Employee) => {
      console.log("Employee added successfully!!");
      this.getEmployees();
      addForm.reset();
    },
    (err: HttpErrorResponse) => {
      console.log("Failed to add employee!!!");
      err.message
      addForm.reset();
    }
  )
}
  onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe (      
      (res: Employee) => {
        console.log("User updated successfully!", res);
        this.getEmployees();
      },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }
  onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe (      
      (res: void) => {
        console.log("User updated successfully!", res);
        this.getEmployees();
      },
      (err: HttpErrorResponse) => {
        alert(err.message)
      }
    )
  }

  searchEmployee (key: string): void {
    const results: Employee[] = [];
    for(const employee of this.employees) {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  onOpenModal(employee: Employee, mode: string): void {

    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
        console.log("I am add");
        
    }
    if(mode === 'edit') {
      this.editEmployee = employee;
        button.setAttribute('data-target', '#editEmployeeModal');
        console.log("I am edit");
        
    }
    if(mode === 'delete') {
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

}
