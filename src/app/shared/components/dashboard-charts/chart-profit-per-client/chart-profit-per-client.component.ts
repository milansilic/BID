import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
   selector: 'chart-profit-per-client',
   templateUrl: './chart-profit-per-client.component.html',
   styleUrls: ['./chart-profit-per-client.component.scss']
})
export class ChartProfitPerClientComponent implements OnInit, AfterViewInit {
   maxValue: any = '';
   maxValueNegative: any = '';
   colHigh: any = 'rgba(55, 214, 140, 1)';
   colMed: any = 'rgba(70, 222, 255, 1)';
   colLow: any = 'rgba(238, 67, 192, 1)';

   clients: string[] = ['tempo', 'roda', 'maxi', 'idea', 'aman', 'rest'];
   dataValues = [123000, 95000, 73000, 48000, 32000, 15000];

   noOfVals = this.dataValues.length;
   dataValuesFormated = this.dataValues.map((vl) => { return '$' + vl / 1000 + 'k' });
   lineColors: any = ['#36d68b', '#9c00ff', '#46deff', '#ffb81a', '#f97432', '#ef3a54'];
   valuePercs: any = [];
   lis1: any = [];
   percs1: any = [];
   noOfRows: any;
   centralValue: any;

   constructor(private chart: ChartService) { }

   ngOnInit(): void {
      var sum = this.dataValues.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0);

      this.dataValues.forEach((el, i) => {this.valuePercs.push(Math.round((el / sum) * 100));});

      this.maxValue = Math.max(...this.dataValues);
      this.maxValueNegative = -Math.max(...this.dataValues) * 1.5;

      this.dataValues.sort(function (a, b) { return b - a })

      this.chart.myPolarChart(
         'chart-profil-per-client',
         this.clients,
         this.dataValues,
         this.lineColors,
         this.maxValueNegative
      );

      this.noOfRows = Math.round(this.clients.length / 2);
   }

   ngAfterViewInit(): void {
      this.lis1 = document.querySelectorAll('chart-profit-per-client>ul>li');
      this.percs1 = document.querySelectorAll('chart-profit-per-client>div>div>span');
   }

   nekaFunkcija12(i: any) {
      for (const li of this.lis1) { li.classList.remove('selected'); }
      this.lis1[i].classList.add('selected');
      for (const pe of this.percs1) { pe.classList.remove('show'); }
      this.percs1[i].classList.add('show');
      this.centralValue = this.dataValuesFormated[i];
   }
}
