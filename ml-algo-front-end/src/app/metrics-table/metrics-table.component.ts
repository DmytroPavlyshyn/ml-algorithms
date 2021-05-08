import {Component, Input, OnInit} from '@angular/core';
import {TemplateItem} from "../template/templateItem";

interface ErrorMetrics {
  mean_absolute_percentage: number,
  root_mean_squared: number,
  sum_of_squared_errors: number,
  symmetric_mean_absolute_percentage_error: number,
  mean_absolute_error: number
}

@Component({
  selector: 'metrics-table',
  templateUrl: './metrics-table.component.html',
  styleUrls: ['./metrics-table.component.css']
})
export class MetricsTableComponent implements OnInit {

  lookup = {
    "mean_absolute_percentage": "Mean absolute percentage error",
    "root_mean_squared": "Root-mean-square deviation",
    "sum_of_squared_errors": "Sum of squared errors",
    "symmetric_mean_absolute_percentage_error": "Symmetric mean absolute percentage error",
    "mean_absolute_error": "Mean absolute error",
  }

  @Input() content: ErrorMetrics;

  // content = {
  //   "mean_absolute_percentage": 18.355116939533893,
  //   "root_mean_squared": 0.46038347446743844,
  //   "sum_of_squared_errors": 20.329983766527842,
  //   "symmetric_mean_absolute_percentage_error": 0.05625259416112305,
  //   "mean_absolute_error": 0.25170561218364973
  // }

  table_data = null;
  displayedColumns = ['error_type', 'error_value'];

  constructor() {
  }


  ngOnInit(): void {
    this.table_data = this.convert(this.content)
  }

  convert(obj: Object): Object {
    let table_content = [];
    for (const [key, value] of Object.entries(obj)) {
      table_content.push({
        "error_type": this.lookup[key],
        "error_value": value,
      })
    }
    return table_content;
  }

}
