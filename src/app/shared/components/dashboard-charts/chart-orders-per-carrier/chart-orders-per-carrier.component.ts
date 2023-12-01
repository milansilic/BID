import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
   selector: 'chart-orders-per-carrier',
   templateUrl: './chart-orders-per-carrier.component.html',
   styleUrls: ['./chart-orders-per-carrier.component.scss']
})
export class ChartOrdersPerCarrierComponent implements OnInit, AfterViewInit {
   maxValue: any = '';
   maxValueNegative: any = '';
   colHigh: any = 'rgba(55, 214, 140, 1)';
   colMed: any = 'rgba(70, 222, 255, 1)';
   colLow: any = 'rgba(238, 67, 192, 1)';

   clients: string[] = ['toza', 'boza', 'loza', 'koza', 'goza', 'rest'];
   dataValues = [82000, 72000, 53000, 48000, 32000, 15000];

   noOfVals = this.dataValues.length;
   dataValuesFormated = this.dataValues.map((vl) => { return '$' + vl / 1000 + 'k' });
   lineColors: any = ['#36d68b', '#9c00ff', '#46deff', '#ffb81a', '#f97432', '#ef3a54'];
   valuePercs: any = [];
   lis: any = [];
   percs: any = [];
   noOfRows: any;
   centralValue: any;

   constructor(private chart: ChartService) { }

   ngOnInit(): void {
      var sum = this.dataValues.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);

      this.dataValues.forEach((el, i) => {this.valuePercs.push(Math.round((el / sum) * 100));});

      this.maxValue = Math.max(...this.dataValues);
      this.maxValueNegative = -Math.max(...this.dataValues) * 1.5;

      this.dataValues.sort(function (a, b) { return b - a })

      this.chart.myPolarChart(
         'chart-orders-per-carrier',
         this.clients,
         this.dataValues,
         this.lineColors,
         this.maxValueNegative
      );

      this.noOfRows = Math.round(this.clients.length / 2);
   }

   ngAfterViewInit(): void {
      this.lis = document.querySelectorAll('chart-orders-per-carrier>ul>li');
      this.percs = document.querySelectorAll('chart-orders-per-carrier>div>div>span');
   }

   nekaFunkcija(i) {
      for (const li of this.lis) { li.classList.remove('selected'); }
      this.lis[i].classList.add('selected');
      for (const pe of this.percs) { pe.classList.remove('show'); }
      this.percs[i].classList.add('show');
      this.centralValue = this.dataValuesFormated[i];
   }
}
