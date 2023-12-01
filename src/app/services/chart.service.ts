import { Injectable } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Injectable({
   providedIn: 'root'
})
export class ChartService {

   constructor() { }

   myBarChart(id: string, labels: any, data: any, backgroundColor: any, stepSize: any, maxTicksLimit: any, callbackFunc: any) {
      var chartB = new Chart(id, {
         type: 'bar',
         data: {
            labels: labels,
            datasets: [{
               data: data,
               backgroundColor: backgroundColor,
               barThickness: 6,
               borderRadius: 3,
               borderWidth: 0,
            }]
         },
         options: {
            borderColor: 'transparent',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
               legend: {
                  display: false
               }
            },
            scales: {
               x: {
                  grid: {
                     lineWidth: 0,
                     display: false,
                  },
                  ticks: {
                     color: '#b0b5d3',
                  }
               },
               y: {
                  border: {
                     display: false,
                  },
                  ticks: {
                     padding: 10,
                     color: '#b0b5d3',
                     stepSize: stepSize,
                     maxTicksLimit: maxTicksLimit,
                     callback: callbackFunc
                  }
               }
            },
         }
      });
   }

   myLineChart(
      id: string,
      labels: any,
      data1: any,
      data2: any,
      colGreen: any,
      colBlue: any,
      stepSize: any,
      maxTicksLimit: any,
      callbackFunc: any) {
      var chartL = new Chart(id, {
         type: 'line',
         data: {
            labels: labels,
            datasets: [
               {
                  borderColor: colGreen,
                  data: data1,
                  tension: 0.4
               },
               {
                  borderColor: colBlue,
                  data: data2,
                  tension: 0.4
               }
            ]
         },
         options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
               legend: {
                  display: false
               }
            },
            elements: {
               point: {
                  radius: 0
               }
            },
            scales: {
               x: {
                  grid: {
                     lineWidth: 0,
                     display: false,
                  },
                  ticks: {
                     color: '#b0b5d3',
                  }
               },
               y: {
                  beginAtZero: true,
                  border: {
                     display: false,
                  },
                  ticks: {
                     padding: 10,
                     color: '#b0b5d3',
                     stepSize: stepSize,
                     maxTicksLimit: maxTicksLimit,
                     callback: callbackFunc
                  }
               }
            },
         }
      });
   }

   myPolarChart(id: string, labels: any, data: any, backgroundColor: any, chartStartValue: any) {
      var chartB = new Chart(id, {
         type: 'polarArea',
         data: {
            datasets: [{
               data: data,
               backgroundColor: backgroundColor,
               borderWidth: 0,
            }]
         },
         options: {
            aspectRatio: 1,
            borderColor: 'transparent',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
               legend: { display: false },
               tooltip: {
                  enabled: false,
               },
            },
            scales: {
               r: {
                  ticks: { display: false },
                  grid: { display: false },
                  min: chartStartValue
               },
            }
         }
      });
   }
}