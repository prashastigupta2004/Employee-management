import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { EmployeeForm } from './components/employee-form/employee-form';
import { EmployeeList } from './components/employee-list/employee-list';
import { AuthGuard } from './guards/auth-guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'employees', component: EmployeeList, canActivate: [AuthGuard] },
    { path: 'employees/new', component: EmployeeForm, canActivate: [AuthGuard] },
    { path: 'employees/:id/edit', component: EmployeeForm, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' } 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class appRoutes {}