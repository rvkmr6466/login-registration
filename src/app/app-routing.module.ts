import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.gaurd';
import { UserComponent } from './user/user.component';

const routes: Routes = [
	{
		path: 'login',
		pathMatch: 'full',
		redirectTo: ''
	},
	{
		path: 'user',
		component: UserComponent,
		canActivate:[AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
		// canActivate:[AuthGuard]
	},
	{
		path: 'register',
		component: RegisterComponent,
		// canActivate:[AuthGuard]
	},
	{
		path: '**',
		component: LoginComponent
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers:[AuthGuard]
})
export class AppRoutingModule { }
