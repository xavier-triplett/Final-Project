import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {

	public headers: HttpHeaders = new HttpHeaders();
	public url = "https://localhost:44326/api";

	constructor(
		private http: HttpClient
  ) {
		this.headers = this.headers.append('Content-Type', 'application/json');
	}

	async postUser(user: User) {
		const result = await this.http.post(this.url + "/users", user)
			.toPromise();
		return result as User;
	}

	async getUsers() {
		const result = await this.http.get(this.url + '/users')
			.toPromise();
		return result as User[];
	}

	async getUser(id: number) {
		const result = await this.http.get(this.url + '/users/' + id)
			.toPromise();
		return result as User;
	}

	async putUser(user: User, id: number) {
		const result = await this.http.put(this.url + '/users/' + id, user)
			.toPromise();
		return result as User;
	}

	async deleteUser(id: number) {
		const result = await this.http.delete(this.url + '/users/' + id)
			.toPromise();
		return result as User;
	}
}