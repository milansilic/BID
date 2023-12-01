import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
	selector: 'chart-licences',
	templateUrl: './chart-licences.component.html',
	styleUrls: ['./chart-licences.component.scss']
})
export class ChartLicencesComponent implements OnInit {
	maxValue: any = '';
	colHigh: any = 'rgba(55, 214, 140, 1)';
	colLow: any = 'rgba(70, 222, 255, 1)';
	xAxsisValues: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
	dataValues = [15, 10, 20, 15, 10, 14];
	lineColors: any = [];

	constructor(private chart: ChartService) { }

	ngOnInit(): void {

		this.maxValue = Math.max(...this.dataValues);

		this.dataValues.forEach(dv => {
			if (dv <= this.maxValue * 0.5) { this.lineColors.push(this.colLow); }
         else { this.lineColors.push(this.colHigh); }
		});

		this.chart.myBarChart(
			'licences',
			this.xAxsisValues,
			this.dataValues,
			this.lineColors,
			7, // stepSize
			7, // maxTicksLimit
			function (label: any) { return label; }
		);
	}
}
