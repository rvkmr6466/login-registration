import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	private authStatusListenerSubs: Subscription;
	authStatusListenerObs: Observable<boolean>;
	userIsAuthenticated: boolean = false;

	constructor(private authService: AuthService) {
		try {
			this.authStatusListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
				console.log(isAuth);
				this.userIsAuthenticated = isAuth;
			})
			// this.userIsAuthenticated = this.authService.userAuth;
		} catch (e) {
			console.log(e)
		}
	}

	ngOnInit() {

	}

	logout() {
		this.authService.logout();
		console.log("clicked!")
	}

	ngOnDestroy() {
		this.authStatusListenerSubs.unsubscribe();
	}

}
