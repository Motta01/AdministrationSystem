import { Component, OnInit } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../services/global';
import { Honeypot } from '../models/honeypot';

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
    public normalRecomendation = {
        all1: '',
        all2: '',
        all3: '',
        all4: '',
        all5: ''
    };
    public specificRecomendation;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.named = '';
        this.date = '';

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
                
                response.honeypots.forEach(honeypot => {
                    if(honeypot.name != null){
                        this.honeypots.push(honeypot);
                    }
                });
            },
            error => {
                this.honeypots = null;
            }
        );
    }
    public getRecomendation() {
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'recomendation/' + this.selected['service'], options).pipe(map(res => res.json())).subscribe(
            response => {
                this.normalRecomendation.all1 = response.recomendationToSend.normal.all1;
                this.normalRecomendation.all2 = response.recomendationToSend.normal.all2;
                this.normalRecomendation.all3 = response.recomendationToSend.normal.all3;
                this.normalRecomendation.all4 = response.recomendationToSend.normal.all4;
                this.normalRecomendation.all5 = response.recomendationToSend.normal.all5;

                if(response.recomendationToSend.specific != 'undefined')
                this.specificRecomendation = response.recomendationToSend.specific;

            },
            error => {
                this.honeypots = null;
            }
        );
    }
    
    public showGerentialReports() {
        let add = '';
        if (this.named != '') {
            add = '/' + this.named;
        }
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'getgerentialreports' + add, options).pipe(map(res => res.json())).subscribe(
            response => {
                this.reports = response.data;
            },
            error => {
                this.reports = null;
            }
        );
    }
    public changed(data = null) {
        this.isSelection = !this.isSelection;
        this.selected = data;
        if(this.selected){
            this.getRecomendation()
        }
    }
}