import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { StatisticService } from 'src/app/services/statistic.service'

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private chartsData: DashboardChartsData,
    private statisticService: StatisticService
  ) {
  }

  protected pageStat;
  protected fundChartData;
  protected shelterChartData;
  protected petChartData;
  receivedFund = Array.from({ length: 12 }).fill(0);

  async ngOnInit() {
    await this.getStat();
  }



  async getStat() {
    await this.statisticService.getAllStat().then(res => {
      this.pageStat = res;
    })
      .catch(err => {
        console.log(err.error.message)
      })


    this.fundChartData = {
      title: 'Main chart',
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: "Quỹ vào",
          backgroundColor: '#f87979',
          data: this.getfundChartData(this.pageStat.totalOfFundReceivedByMonth)
        },
        {
          label: 'Quỹ ra',
          backgroundColor: '#f7e4e5',
          data: this.getfundChartData(this.pageStat.totalOfFundSentByMonth)
        }
      ]

    }
  }

  getfundChartData(object) {
    let fundMap = new Map(Object.entries(object));
    let data = Array.from({ length: 12 }).fill(0);

    for (let i = 0; i < 12; i++) {
      if (fundMap.get((i + 1).toString()) !== undefined) {
        let fund = new Map(Object.entries(fundMap.get((i + 1).toString())));
        data[i] = fund.get("count")
      }
    }
    return data
  }
}
