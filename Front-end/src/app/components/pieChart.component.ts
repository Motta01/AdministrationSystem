import { Component, Input, OnInit } from '@angular/core';
import { GoogleChartsBaseService } from '../services/GoogleChartsBaseService';
import { PieChartConfig } from '../models/PieChartConfig';

declare var google: any;

@Component({
  selector: 'piechart',
  templateUrl: '../views/piechart/piechart.html'
})
export class PieChartComponent implements OnInit {

    @Input() data: any[];
    @Input() config: PieChartConfig;
    @Input() elementId: any;

    constructor(private _pieChartService: GoogleChartsBaseService) {}

    ngOnInit(): void {
        this._pieChartService.buildChart(this.elementId, this.data, this.config); 
    }
}