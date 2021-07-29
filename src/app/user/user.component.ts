import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	isLoading: boolean = false;

	constructor() { }

	ngOnInit(): void {
		this.isLoading = false;
	}

}
