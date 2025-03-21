import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(response => {
      this.data = response.datas.map((item: any) => {
        let projectName = item.properties.find((p: any) => p.label === "Project Name")?.value || "N/A";
        let constructionCount = item.properties.find((p: any) => p.label === "Construction Count")?.value || "-";
        let isCompleted = item.properties.find((p: any) => p.label === "Is Construction Completed")?.value || "false";
        let roadLength = item.properties.find((p: any) => p.label === "Length of the road")?.value || "-";

        return {
          samplingTime: item.samplingTime,
          projectName,
          constructionCount,
          isCompleted,
          roadLength
        };
      });
    });
  }

  viewDetail(samplingTime: string) {
    this.router.navigate(['/detail', samplingTime]);
  }
}
