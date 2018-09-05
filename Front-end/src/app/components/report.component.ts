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
    public honeypots = [];
    public identity;
    public token;
    public named;
    public date;
    public selected = null;
    public isSelection = false;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.named = '';
        this.date='';

    }
    public url: string;
    ngOnInit() {
        this.showGerentialReports();
        this.getHoneypot();

    }


    public getHoneypot() {
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'getallhoneypot', options).pipe(map(res => res.json())).subscribe(
            response => {
                this.honeypots = response.honeypots;
            },
            error => {
                this.honeypots = null;
            }
        );
    }
    public showGerentialReports() {
        let add = '';
        if (this.named!='') {
            add = '/' + this.named;
            console.log(add);
        }
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'getgerentialreports' + add, options).pipe(map(res => res.json())).subscribe(
            response => {
                this.reports = response.data;
                console.log(this.reports);
            },
            error => {
                this.reports = null;
            }
        );
    }
    public changed( data = null ){
    this.isSelection = !this.isSelection;
    this.selected = data;
    }
    
}