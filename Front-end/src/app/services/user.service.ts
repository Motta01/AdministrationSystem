import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
    public identity = null;
    public token;
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
    public signup(userToLogin, gethash = 'null') {
        if (gethash != 'null') {
            userToLogin.gethash = gethash;
        }
        let json = userToLogin;
        let params = json;
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + 'loginuser', params, options).pipe(map(res => res.json()));
    }
    public save(userToSave, gethash = 'null') {
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url + 'saveuser', userToSave, options).pipe(map(res => res.json()));
    }
    public delete(id) {
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(this.url + 'deleteaccount/' + id);
        return this._http.delete(this.url + 'deleteaccount/' + id, options).pipe(map(res => res.json()));
    }

    public getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }
    public getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    public getUsers() {
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + '/selectuser', options).pipe(map(res => res.json()));
    }
}