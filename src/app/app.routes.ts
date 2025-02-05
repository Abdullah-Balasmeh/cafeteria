import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginSysPageComponent } from './pages/login-sys-page/login-sys-page.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login-page',
        pathMatch:'full',
    },
    {
        path:'login-page',
        component:LoginPageComponent
    },
    {
        path:'login-sys-page',
        component:LoginSysPageComponent
    },
    {
        path:'system-page',
        loadComponent:()=>import('./pages/system-page/system-page.component').then(
            (c)=>c.SystemPageComponent
        )
    },
    {
        path: 'admin-page',
        loadComponent: () =>
            import('./pages/admin-page/admin-page.component').then(
                (c) => c.AdminPageComponent
            ),
        children:[
            {
                path:'employee-section',
                loadComponent: () =>
                    import('./components/admin-component/employee-section/employee-section.component').then(
                        (c) => c.EmployeeSectionComponent
                    ),
            },
        ]
    },
];
