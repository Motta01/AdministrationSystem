import { Component, OnInit } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../services/global';
import { Honeypot } from '../models/honeypot'
import { UserService } from '../services/user.service';


@Component({
    selector: 'configs',
    templateUrl: '../views/configs/configs.html',
    styleUrls: ['../views/configs/configs.css']
})

export class Configs implements OnInit {
    private users_no_named;
    public url: string;
    private selectedValue;
    private honeypot;

    constructor(private _http: Http, private _userService: UserService) {
        this.url = GLOBAL.url;
        this.users_no_named = [];
        this.selectedValue = "";
        this.honeypot = new Honeypot('', '', '');
    }

    ngOnInit() {
        this.getUsersNoNamed();
    }

    public getUsersNoNamed() {
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this._http.get(this.url + 'getnonamedhoneypot', options).pipe(map(res => res.json())).subscribe(
            response => {
                this.users_no_named = response.honeypots;
            },
            error => {
                console.log(error);
            }
        );;
    }

    public saveHoneypot() {
        if (this.honeypot.name != "" && this.honeypot.ip != "") {
            this.honeypot.owner = this._userService.getIdentity().name;

            let headers = new Headers({ 'content-type': 'application/json' });
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this._http.post(this.url + 'savehoneypot', this.honeypot, options).pipe(map(res => res.json())).subscribe(
                response => {
                    if (response.user) {
                        this.getUsersNoNamed();
                    }
                }
            );
        }
        this.honeypot = new Honeypot('', '', '');
    }

}