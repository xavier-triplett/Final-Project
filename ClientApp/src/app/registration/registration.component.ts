import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/models/address.model';
import { AddressService } from 'src/services/address.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	public user = new User;
	public address = new Address;

	constructor(
		private _auth: AuthService,
		private _userService: UserService,
		private _addressService: AddressService,
		private _toastr: ToastrService,
		private router: Router
	) { }

	ngOnInit() {
		this.reload();
	}

	goToLogin() {
		this.router.navigateByUrl('login');
	}

	goToHome() {
		this.router.navigateByUrl('');
	}

	reload() {
		this.user = new User;
		this.address = new Address;
	}

	//TODO: Add a function that checks if the address already exists. If it does use that address instead of creating one
	onSubmit() {
		this._addressService.postAddress(this.address).then(res => {
			this.user.AddressId = res.AddressId;
			this.insertUser();
		},
		err => {
			this._toastr.error('Failed to create address. Reason: ' + err.statusText, 'Failure');	
		});
	}

	insertUser() {
		this._userService.postUser(this.user).then(res => {
			this._toastr.success('Successfully registered', 'Success');
			this._auth.setLoggedIn(true);
			this._auth.setUserId(res.UserId);
			this.reload();
			this.goToHome();
		},
		err => {
			this._toastr.error('Failed to create user. Reason: ' + err.statusText, 'Failure');
		});
	}
}
