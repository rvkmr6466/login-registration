import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private token: string;
	private tokenTimer: any;
	private isAuthenticated: boolean = false;
	private authStatusListener = new Subject<boolean>();

	constructor(
		public http: HttpClient,
		private router: Router
	) { }

	getToken() {
		return this.token;
	}

	getIsAuth() {
		return this.isAuthenticated;
	}

	get userAuth() {
		return this.isAuthenticated;
	}

	public getAuthStatusListener(): Observable<boolean> {
		return this.authStatusListener.asObservable();
	}

	createUser(username: string, password: string) {
		const authData: AuthData = { email: username, password: password }
		this.http.post("http://localhost:3000/api/user/register", authData)
			.subscribe(
				response => {
					console.log("Response on creating user:", response);
				}
			);
	}

	login(username: string, password: any) {
		const authData: AuthData = { email: username, password: password }
		this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", authData)
			.subscribe(
				response => {
					console.log("Reponse:", response);
					if (response) {
						const token = response.token;
						const expiresInDuration = response.expiresIn;
						this.setAuthTimer(expiresInDuration)
						this.token = token;
						this.isAuthenticated = true;
						this.authStatusListener.next(true);
						const now = new Date();
						const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
						this.saveAuthData(token, expirationDate);
						this.router.navigate(['/user']);
					}
					this.router.navigate(['/user']);
				}
			);
	}

	logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListener.next(false);
		clearTimeout(this.tokenTimer);
		this.clearAuthData();
		this.router.navigate(['/login']);
	}

	private saveAuthData(token: string, expiresInDuration: Date) {
		localStorage.setItem('token', token);
		console.log("---->", expiresInDuration.toISOString())
		localStorage.setItem('expiresIn', expiresInDuration.toISOString());
	}

	private clearAuthData() {
		localStorage.removeItem("token");
		localStorage.removeItem("expiresIn");
	}

	autoAuthData() {
		if (!!this.getAuthData()) {
			const userInformation = this.getAuthData();
			const now = new Date();
			const expiresIn = userInformation.expiresIn.getTime() - now.getTime();
			if (expiresIn > 0) {
				this.token = userInformation.token;
				this.isAuthenticated = true;
				this.setAuthTimer(expiresIn / 1000)
				this.authStatusListener.next(true);
			}
		}
	}

	setAuthTimer(duration: number) {
		this.tokenTimer = setTimeout(() => {
			this.logout()
		}, duration * 1000);
	}

	private getAuthData() {
		const token = localStorage.getItem("token");
		const expiresIn = localStorage.getItem("expiresIn");
		if (!token && !expiresIn) {
			return;
		}
		return {
			token: token,
			expiresIn: new Date(expiresIn)
		}
	}

}
