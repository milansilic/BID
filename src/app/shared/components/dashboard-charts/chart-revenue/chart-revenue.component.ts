import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
  selector: 'chart-revenue',
  templateUrl: './chart-revenue.component.html',
  styleUrls: ['./chart-revenue.component.scss']
})
export class ChartRevenueComponent implements OnInit {
  colBlue: any = 'rgba(70, 222, 255, 1)';
  colGreen: any = 'rgba(55, 214, 140, 1)';
  xAxsisValues: string[] = ['Sep 18', 'Sep 19', 'Sep 20', 'Sep 21', 'Sep 22', 'Sep 23', 'Sep 24'];
  dataValues1 = [12000, 16000, 12000, 14000, 12000, 17000, 16000];
  dataValues2 = [16000, 12000, 15000, 16500, 14000, 13000, 12000];

  constructor(private chart: ChartService){}

  ngOnInit(): void {

     this.chart.myLineChart(
        'revenue', 
        this.xAxsisValues, 
        this.dataValues1, 
        this.dataValues2, 
        this.colGreen,
        this.colBlue,
        7000, // stepSize
        4, // maxTicksLimit
        function (label: any){return label / 1000 + 'k';}
     );
  }
}
