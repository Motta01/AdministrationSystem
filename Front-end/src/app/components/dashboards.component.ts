import { Component, Input, OnInit} from '@angular/core';
import { PieChartConfig } from '../models/PieChartConfig';
import{PieChartComponent} from './pieChart.component';


@Component({
    selector: 'dashboards',
    templateUrl: '../views/dashboards/dashboards.html',
    styleUrls: ['../views/dashboards/dashboards.css'],
})

export class Dashboards implements OnInit {

    title = 'Reusable charts sample';

    data1: any[];
    config1: PieChartConfig;
    elementId1: String;

    data2: any[];
    config2: PieChartConfig;
    elementId2: String; 

    constructor( ){

    }
    ngOnInit(){
        //Piechart1 Data & Config
        this.data1 = [['Task', 'Hours per Day'],
        ['Eat',      3],
        ['Commute',  2],
        ['Watch TV', 5],
        ['Video games', 4],
        ['Sleep',    10]];

        this.config1 = new PieChartConfig('My Daily Activities at 20 years old', 0.4);
        this.elementId1 = 'myPieChart1';

        //Piechart2 Data & Config
        this.data2 = [['Task', 'Hours per Day'],
                    ['Work',     11],
                    ['Eat',      2],
                    ['Commute',  2],
                    ['Watch TV', 2],
                    ['Sleep',    7]]

        this.config2 = new PieChartConfig ('My Daily Activities at 30 years old', 0.4);
        this.elementId2 = 'myPieChart2';
    }

}