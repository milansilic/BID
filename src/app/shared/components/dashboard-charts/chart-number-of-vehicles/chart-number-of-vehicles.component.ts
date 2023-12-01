import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
   selector: 'chart-number-of-vehicles',
   templateUrl: './chart-number-of-vehicles.component.html',
   styleUrls: ['./chart-number-of-vehicles.component.scss']
})
export class ChartNumberOfVehiclesComponent implements OnInit, AfterViewInit {
   maxValue: any = '';
   maxValueNegative: any = '';

   // MOCK DATA:
   clients: string[] = ['van', 'truck', 'tow'];
   dataValues: number[] = [23, 19, 15];

   noOfVals: number = this.dataValues.length;
   lineColors: any = ['#46deff', '#36d68b', '#9c00ff'];
   valuePercs: any = [];
   lis: any = [];
   percs: any = [];
   centralValue1: any;
   centralValue2: any;

   constructor(private chart: ChartService) {}

   ngOnInit(): void {
      var sum = this.dataValues.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);

      this.dataValues.forEach((el, i) => { this.valuePercs.push(Math.round((el / sum) * 100)); });

      this.maxValue = Math.max(...this.dataValues);
      this.maxValueNegative = -Math.max(...this.dataValues);

      this.chart.myPolarChart(
         'chart-number-of-vehicles',
         this.clients,
         this.dataValues,
         this.lineColors,
         this.maxValueNegative
      );
   }

   ngAfterViewInit(): void {
      this.lis = document.querySelectorAll('chart-number-of-vehicles>ul>li');
      this.percs = document.querySelectorAll('chart-number-of-vehicles>div>div>span');
   }

   selectOption(i: any) {
      for (const li of this.lis) { li.classList.remove('selected'); }
      this.lis[i].classList.add('selected');
      for (const pe of this.percs) { pe.classList.remove('show'); }
      this.percs[i].classList.add('show');

      this.centralValue1 = this.dataValues[i];
      this.centralValue2 = this.clients[i];
   }
}