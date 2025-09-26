import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'create', component: CreateComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: 'edit/:id', component: CreateComponent },
    { path: 'login', component: AuthComponent },
    { path: 'signup', component: AuthComponent }
];
