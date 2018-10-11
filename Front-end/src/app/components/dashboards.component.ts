import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../services/global';



@Component({
  selector: 'dashboards',
  templateUrl: '../views/dashboards/dashboards.html',
  styleUrls: ['../views/dashboards/dashboards.css'],
})

export class Dashboards implements OnInit {
  Barchart = [];
  PieChart = [];
  public portDashboard;
  public servicesDashboards;
  public hostDashboards;
  public url;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
    this.portDashboard = [];
    this.servicesDashboards = [];
    this.hostDashboards = [];

  }
  ngOnInit() {
    this.showPortDashboards();
    this.showServicesDashboards();
    this.showHostsDashboardss();

    //***************************************************************************** */
    //
    // EN ESTE PUNTO LAS VARIABLES DE this.hostDashboards   this.portDashboard Y this.servicesDashboards YA TIENE LA INFORMACION DE LA API
    //************************************************************************************/ */
    //BARCHART
 
  }
  public showPortDashboards() {

    let headers = new Headers({ 'content-type': 'application/json' });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'portdashboards', options).pipe(map(res => res.json())).subscribe(
      response => {
      

        this.portDashboard = response.data;
        let labelPorts=[];
        let valuePort = [];
        this.portDashboard.forEach(port => {
          labelPorts.push(port.port);
          valuePort.push(port.count);
        });

        this.Barchart = new Chart('barChart', {
          type: 'bar',
          data: {
            labels:labelPorts,
            datasets: [{
              label: 'Puertos mas atacados',
              data: valuePort,
              backgroundColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)',
                'rgba(255,206,88,1)',
                'rgba(75,192,192,1)',
                'rgba(153,102,255,1)',
                'rgba(255,159,69,1  )',
                'rgba(255,129,132,1)',
                'rgba(54,50,235,1)',
                'rgba(255,206,86,1)',
                'rgba(75,15,192,1)',
                'rgba(153,0,255,1)',
                'rgba(255,220,64,1  )',
                'rgba(255,250,64,1  )',
                'rgba(205,20,64,1  )',
                'rgba(250,22,164,1  )',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)',
                'rgba(255,206,88,1)',
                'rgba(75,192,192,1)',
                'rgba(153,102,255,1)',
                'rgba(255,159,69,1  )',
                'rgba(255,129,132,1)',
                'rgba(54,50,235,1)',
                'rgba(255,206,86,1)',
                'rgba(75,15,192,1)',
                'rgba(153,0,255,1)',
                'rgba(255,220,64,1  )',
                'rgba(255,250,64,1  )',
                'rgba(205,20,64,1  )',
                'rgba(250,22,164,1  )',
              ],
              borderwidt: 1
            }]
          },
          options: {
            title: {
              text: "PUERTOS",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtzero: true
                }
              }]
            }
          }
        });



      },
      error => {
        this.portDashboard = null;
      }
    );
  }
  public showServicesDashboards() {
    let headers = new Headers({ 'content-type': 'application/json' });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'servicesdashboards', options).pipe(map(res => res.json())).subscribe(
      response => {
        this.servicesDashboards = response.data;
        let labelPorts=[];
        let valuePort = [];
        this.servicesDashboards.forEach(port => {
          labelPorts.push(port.service);
          valuePort.push(port.count);
        });
        this.PieChart = new Chart('pieChart', {
          type: 'pie',
          data: {
            labels:labelPorts,
            datasets: [{
              label: 'pieChart',
              data: valuePort,
              backgroundColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)',
                'rgba(255,206,88,1)',
                'rgba(75,192,192,1)',
                'rgba(153,102,255,1)',
                'rgba(255,159,69,1  )',
                'rgba(255,129,132,1)',
                'rgba(54,50,235,1)',
                'rgba(255,206,86,1)',
                'rgba(75,15,192,1)',
                'rgba(153,0,255,1)',
                'rgba(255,220,64,1  )',
                'rgba(255,250,64,1  )',
                'rgba(205,20,64,1  )',
                'rgba(250,22,164,1  )',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)',
                'rgba(255,206,88,1)',
                'rgba(75,192,192,1)',
                'rgba(153,102,255,1)',
                'rgba(255,159,69,1  )',
                'rgba(255,129,132,1)',
                'rgba(54,50,235,1)',
                'rgba(255,206,86,1)',
                'rgba(75,15,192,1)',
                'rgba(153,0,255,1)',
                'rgba(255,220,64,1  )',
                'rgba(255,250,64,1  )',
                'rgba(205,20,64,1  )',
                'rgba(250,22,164,1  )',
              ],
              borderwidt: 1
            }]
          },
    
          options: {
            title: {
              text: "SERVICIOS",
              display: true
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtzero: true
                }
              }]
            }
          }
        });


      },
      error => {
        this.servicesDashboards = null;
      }
    );
  }
  public showHostsDashboardss() {
    let headers = new Headers({ 'content-type': 'application/json' });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'remote_hostDashboards', options).pipe(map(res => res.json())).subscribe(
      response => {
        this.hostDashboards = response.data;
      },
      error => {
        this.hostDashboards = null;
      }
    );
  }

}