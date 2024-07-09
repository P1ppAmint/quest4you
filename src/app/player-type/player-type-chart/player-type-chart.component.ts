import {Component, Input, OnInit} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";

import {PlayerType} from "../../shared-components/user-data/player-type";


@Component({
  selector: 'app-player-type-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <canvas baseChart
            [datasets]="ChartDatasets"
            [options]="ChartOptions"
            [labels]="ChartLabels"
            [type]="'pie'"
    ></canvas>
  `,
  styles: ``
})
export class PlayerTypeChartComponent implements OnInit{
  @Input({required:true}) playerTypeData : PlayerType | undefined;
  public chartType : ChartType = 'pie';

  public ChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: false,
  };
  public ChartLabels: string[] = ['Achiever', 'Explorer', 'Killer', 'Socializer'];

  public ChartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [
    { data: [0, 0, 0, 0], label: ""}
  ];


  constructor() {
  }

  ngOnInit() {
    if (this.playerTypeData) {
      let values = [];
      values.push(this.playerTypeData.achiever);
      values.push(this.playerTypeData.explorer);
      values.push(this.playerTypeData.killer);
      values.push(this.playerTypeData.socializer);
      this.ChartDatasets = [{data: values}]
    }
  }


}
