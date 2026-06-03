import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private _http: HttpClient) {}
  // base_url = 'https://jsonplaceholder.typicode.com/users';
  // base_url = 'https://localhost:8080/api/v1/users';
  base_url = 'https://localhost:7237/api';

  getData(){
    return this._http.get<any[]>(this.base_url + '/users');
  }

  createUser(data: any) {
    return this._http.post(this.base_url + '/users', data);
  }
}
