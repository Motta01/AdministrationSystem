import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import{GLOBAL} from './global';

@Injectable()
export class UserService {
    public url: string;

    constructor(private _http:Http){
        this.url = GLOBAL.url;
    }
    public signup(){
        return 'hola desde aca';
    }
}