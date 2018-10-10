import { Component, OnInit } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../services/global';
import { Recommendation } from '../models/recommendation';

@Component({
    selector: 'saverec',
    templateUrl: '../views/saveRec/saveRec.html',
    styleUrls: ['../views/saveRec/saveRec.css']
})

export class SaveRec implements OnInit {
    private service;
    private url;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.service = new Recommendation(null, null);
    }
    ngOnInit() {
    }

    public saveService() {
        if (this.service.service != null && this.service.description != null) {
            let headers = new Headers({ 'content-type': 'application/json' });
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            var request = this._http.post(this.url + 'saveRec', this.service, options).pipe(map(res => res.json()));
            request.subscribe();
            this.service.service = null;
            this.service.description = null;
            return;
        }
    }

}