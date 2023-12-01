import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
   selector: 'chart-profit',
   templateUrl: './chart-profit.component.html',
   styleUrls: ['./chart-profit.component.scss']
})
export class ChartProfitComponent implements OnInit {
   maxValue: any = '';
   colHigh: any = 'rgba(238, 67, 192, 1)';
   colLow: any = 'rgba(156, 0, 255, 1)';
   xAxsisValues: string[] = ['Sep 18', 'Sep 19', 'Sep 20', 'Sep 21', 'Sep 22', 'Sep 23', 'Sep 24'];
   dataValues = [36000, 21000, 44000, 32000, 22000, 13000, 26000];
   lineColors: any = [];

   constructor(private chart: ChartService) { }

   ngOnInit(): void {

      this.maxValue = Math.max(...this.dataValues);

      this.dataValues.forEach(dv => {
         if (dv <= this.maxValue * 0.5) { this.lineColors.push(this.colLow); }
         else { this.lineColors.push(this.colHigh); }
      });

      this.chart.myBarChart(
         'profit',
         this.xAxsisValues,
         this.dataValues,
         this.lineColors,
         1500, // stepSize
         4, // maxTicksLimit
         function (label: any) { return '$' + label / 1000 + 'k'; }
      );
   }
}