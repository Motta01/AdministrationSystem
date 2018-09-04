import { Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js'



@Component({
    selector: 'dashboards',
    templateUrl: '../views/dashboards/dashboards.html',
    styleUrls: ['../views/dashboards/dashboards.css'],
})

export class Dashboards implements OnInit {
    Barchart=[];
    PieChart=[];
   
    constructor( ){

    }
    ngOnInit(){

        //BARCHART
    this.Barchart = new Chart('barChart',{
        type:'bar',
        data:{
          labels:["Red","Blue","Yellow","Green","Purple","Orange"],
          datasets:[{
            label:'# of votes',
            data:[9,7,6,7,10,9],
            backgroundColor:[
              'rgba(255,99,132,0.2)',
              'rgba(54,162,235,0.2)',
              'rgba(255,206,86,0.2)',
              'rgba(75,192,192,0.2)',
              'rgba(153,102,255,0.2)',
              'rgba(255,159,64,0.2)'
            ],
            borderColor:[
              'rgba(255,99,132,1)',
              'rgba(54,162,235,1)',
              'rgba(255,206,86,1)',
              'rgba(75,192,192,1)',
              'rgba(153,102,255,1)',
              'rgba(255,159,64,1  )'
            ],
            borderwidt:1
          }]
        },
        options:{
          title:{
            text:"Bar Chart",
            display:true
          },
          scales:{
            yAxes:[{
              ticks:{
                beginAtzero:true
              }
            }]
          }
        }
      });

        //PIE CHART
  this.PieChart = new Chart('pieChart',{
    type: 'pie',
    data: {
      labels: ['Red','Orange','Yellow','Green','Blue'],
      datasets: [{
        label:'pieChart',
        data: [ 5,6,6,6,8,],
        backgroundColor: [
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
          'rgba(75,192,192,1)',
          'rgba(153,102,255,1)'
        ],
        borderColor:[
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
          'rgba(75,192,192,1)',
          'rgba(153,102,255,1)'
        ],
        borderwidt:1
      }]
    },

    options:{
      title:{
        text:"Pie Chart",
        display:true
      },
      scales:{
        yAxes:[{
          ticks:{
            beginAtzero:true
          }
        }]
      }
    }
    
  });



    }

}