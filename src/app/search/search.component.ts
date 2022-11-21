import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ApiService} from '../services/api.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {faX} from '@fortawesome/free-solid-svg-icons'

interface columnFilter{
  column: String,
  operator: String,
  value: number
}
interface operator{
  name: String,
  value: String
}

interface apiColumnFilter{
  column : {}
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  columns: any[] = [];
  selectedColumns: any[]= [];
  aggregators = ['Sum', 'Average', 'Count', 'Min', 'Max'];
  selectedAggregator = '';
  selectedAggregatorColumn = '';
  columnFilters: columnFilter[] = [];
  operators: operator[] = [{name:'lesserThan', value: '<'},{name:'greaterThan', value: '>'},{name:'equalTo', value: '='},{name:'lesserThanOrEqualTo', value: '<='},{name:'greaterThanOrEqualTo', value: '>='}];
  selectedOperator = '';
  selectedValue = "";
  selectedFilterColumn = '';
  selectedDistinctColumns = '';
  selectedGroupByColumns = '';
  parameters = {};
  showData = false;
  jsonData : any;
  data : any
  faCross = faX;


  constructor(public dialogRef: MatDialogRef<SearchComponent>, public api: ApiService) { }

  ngOnInit(): void {
    this.columns = this.api.columns;
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  search() {
    // console.log(this.selectedColumns)
    // console.log(this.selectedAggregator);
    // console.log(this.selectedAggregatorColumn);
    // console.log(this.selectedFilterColumn)
    // console.log(this.selectedOperator)
    // console.log(this.selectedValue)
    // console.log(this.selectedDistinctColumns);
    // console.log(this.selectedGroupByColumns);
    this.columns = [];
    this.jsonData = null;
    this.data = null;
    this.parameters = {
      "filePath": this.api.currentPath,
      "aggregatorFunction": this.selectedAggregator,
      "aggregatorColumn": this.selectedAggregatorColumn,
      "columnFilters": [
          {
            "column": this.selectedFilterColumn,
            "operator": this.selectedOperator,
            "value": this.selectedValue
          }
      ],
      "displayColumns": this.selectedColumns,
      "distinctCols": this.selectedDistinctColumns,
      "groupedBy": this.selectedGroupByColumns
    }
    console.log(this.parameters);
    this.jsonData = JSON.parse('{"schema":{"fields":[{"name":"index","type":"integer"},{"name":"aaa","type":"integer"},{"name":"bbb","type":"string"},{"name":"ccc","type":"string"},{"name":"ddd","type":"integer"}],"primaryKey":["index"],"pandas_version":"1.4.0"},"data":[{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677},{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677},{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677}]}');
    // this.api.refreshData(this.data);
    for(let x of this.jsonData['schema']['fields']){
      this.columns.push(x['name']);
    }
    console.log(this.columns)
    this.data =this.jsonData['data'];
    this.showData = true;

  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
