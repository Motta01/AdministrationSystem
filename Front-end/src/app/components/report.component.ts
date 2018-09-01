import { Component, OnInit } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'reportComponent',
    templateUrl: '../views/report/report.html',
    styleUrls: ['../views/report/report.css']
})

export class ReportComponent implements OnInit {
    public title: string;
    public reports;
    public identity;
    public token;
    public url: string;
    ngOnInit() {
        this.showGerentialReports().subscribe(
            response => {
                this.reports = response.data;
            },
            error => {
                this.reports = null;
            }
        );
    }

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
    public showGerentialReports() {
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'getgerentialreports', options).pipe(map(res => res.json()));
    }
}