import { Component, OnInit } from '@angular/core';
import {GoogleChartInterface, GoogleChartType} from "ng2-google-charts";
import {TestService} from "../../services/test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  fileImageUploadHiddenEverything: string = '';
  FileImageLink: any = '';
  fileImageOverlay: string = '';
  fileName = '';
  fileImageUploadChecker: boolean = true;
  fileImageUploadHiddenEverythingChecker: string = '';
  fileImageOverlayChecker: string = '';
  data:number=75;
  constructor(private service: TestService) { }

  ngOnInit(): void {

  }
  onFileSelected(event: any) {
    console.log(event);
    let file: File = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.service.upload(formData).subscribe(response => {
        this.FileImageLink = response;
        console.log(this.FileImageLink);
        this.fileImageUploadChecker = false;
        if (this.fileImageUploadChecker == false) {
          this.fileImageUploadHiddenEverythingChecker = 'none';
          this.fileImageUploadHiddenEverything = this.fileImageUploadHiddenEverythingChecker;
          this.fileImageOverlayChecker = 'rgba(201, 201, 201, 0.6)'
          // console.log(this.FileImageLink)
        }
      }, error1 => {
        console.log(error1)
      })
    }
  }
  public pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Matched', 'Unmatched'],
      ['Unsuitable Colors',     25],
      ['Suitable Colors',      75],
    ],
    //firstRowIsData: true,
    // options: {'title': 'Tasks'},
    options :{
      colors: ['blue', 'lightblue'],
      backgroundColor:'#f7f2f7',
      chartArea: {width: 900, height: 900},
    }
  };

  onClick() {

  }
}
