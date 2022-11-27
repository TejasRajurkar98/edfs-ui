import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ApiService} from '../services/api.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {NgxSpinnerService} from 'ngx-spinner';

interface columnFilter{
  column: String,
  operator: String,
  value: String,
  condition: String
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
  selectedAggregator = null;
  selectedAggregatorColumn = null;
  columnFilters: columnFilter[] = [];
  operators: operator[] = [{name:'lessThan', value: '<'},{name:'greaterThan', value: '>'},{name:'equals', value: '='},{name:'lessThanEqualTo', value: '<='},{name:'greaterThanEqualTo', value: '>='},{name:'notEqualTo', value: '!='}];
  selectedOperator = null;
  selectedValue = null;
  selectedFilterColumn = '';
  selectedDistinctColumns = [];
  selectedGroupByColumns = [];
  parameters = {};
  showData = false;
  jsonData : any;
  data : any
  faCross = faX;
  conditions = ['and', 'or'];
  currentPath = ''

  constructor(public dialogRef: MatDialogRef<SearchComponent>, public api: ApiService, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.columns = this.api.columns;
    this.columnFilters.push({
      column : '',
      operator : '',
      value : '',
      condition :''
    });
    this.currentPath = this.api.currentPath;
  }

  addFilter(){
    this.columnFilters.push({
      column: '',
      operator: '',
      value: '',
      condition: ''
    });
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

    if(!this.columnFilters[0].column){
      this.columnFilters.pop()
    }
    
    this.columns = [];
    this.jsonData = null;
    this.data = null;
    this.parameters = {
      "filePath": this.api.currentPath,
      "aggregatorFunction": this.selectedAggregator,
      "aggregatorColumn": this.selectedAggregatorColumn,
      "columnFilters": this.columnFilters,
      "displayColumns": this.selectedColumns,
      "distinctCols": this.selectedDistinctColumns,
      "groupedBy": this.selectedGroupByColumns
    }
    console.log(this.parameters);
    // this.jsonData = JSON.parse('{"schema":{"fields":[{"name":"index","type":"integer"},{"name":"aaa","type":"integer"},{"name":"bbb","type":"string"},{"name":"ccc","type":"string"},{"name":"ddd","type":"integer"}],"primaryKey":["index"],"pandas_version":"1.4.0"},"data":[{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677},{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677},{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677}]}');
    // this.api.refreshData(this.data);
    this.api.executeQuery(this.currentPath, this.parameters).subscribe((response) => {
      // this.spinner.show();
      this.jsonData = response;
      for(let x of this.jsonData['schema']['fields']){
        this.columns.push(x['name']);
      }
      console.log(this.columns)
      this.data =this.jsonData['data'];
      this.showData = true;
      // this.spinner.hide();
    });
    

  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
