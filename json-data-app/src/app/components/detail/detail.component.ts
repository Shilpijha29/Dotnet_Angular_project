import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data: any;
  selectedData: any;
  selectedSamplingTime: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      if (this.data.datas.length > 0) {
        this.selectSamplingTime(this.data.datas[0].samplingTime);
      }
    });
  }

  selectSamplingTime(time: string) {
    this.selectedSamplingTime = time;
    this.selectedData = this.data.datas.find((d: { samplingTime: string; }) => d.samplingTime === time);
    this.ensureAllProperties(); 
  }

  ensureAllProperties() {
    const requiredFields = [
      { label: "Project Name", default: "" },
      { label: "Construction Count", default: 0 },
      { label: "Is Construction Completed", default: null },
      { label: "Length of the road", default: 0 }
    ];

    requiredFields.forEach(field => {
      if (!this.selectedData.properties.some((p: any) => p.label === field.label)) {
        this.selectedData.properties.push({ label: field.label, value: field.default });
      }
    });
  }

  updateProperty(label: string, value: any) {
    let property = this.selectedData.properties.find((p: any) => p.label === label);
    if (property) {
      property.value = value;
    }
  }

  saveData() {
    this.dataService.saveData(this.data).subscribe(() => alert('Data saved successfully!'));
  }
}
