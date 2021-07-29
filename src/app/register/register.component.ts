import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	registerForm: FormGroup;
	isLoading: boolean = false;

	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.registerForm = new FormGroup({
			username: new FormControl('', [Validators.minLength(3), Validators.required]),
			password: new FormControl('', [Validators.minLength(3), Validators.required]),
			confirmPassword: new FormControl('', [Validators.minLength(3), Validators.required])
		}/* , this.passwordMatchValidator */);
	}

	/* 	passwordMatchValidator(g: FormGroup) {
			return g.get('password').value === g.get('confirmPassword').value
				? null : { 'mismatch': true };
		} */

	register() {
		if (this.registerForm.invalid) {
			return;
		}
		if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
			return;
		}
		this.isLoading = true;
		this.authService.createUser(this.registerForm.value.username, this.registerForm.value.password);
		this.registerForm.reset();
		this.router.navigate(['/login']);
	}

}
