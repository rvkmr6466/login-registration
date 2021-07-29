import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isLoading: boolean = false;

	constructor(
		private authService: AuthService
	) {
		this.loginForm = new FormGroup({
			username: new FormControl('', [Validators.minLength(3), Validators.required]),
			password: new FormControl('', [Validators.minLength(3), Validators.required])
		});
	}

	ngOnInit(): void {
	}

	login() {
		// console.log(this.loginForm.value);
		if (this.loginForm.invalid) {
			return;
		}
		this.isLoading = true;
		this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
		
	}

}
