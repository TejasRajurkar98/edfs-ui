import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ApiService} from '../services/api.service';
import {faX} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-view-partition',
  templateUrl: './view-partition.component.html',
  styleUrls: ['./view-partition.component.scss']
})
export class ViewPartitionComponent implements OnInit {
  partitions: String[] = [];
  selectedPartition = '';
  jsonData : any;
  data: any;
  showData = false;
  columns: any[] = [];
  faCross = faX;

  constructor(public dialogRef: MatDialogRef<ViewPartitionComponent>, public api: ApiService) { }

  ngOnInit(): void {
    //call get partitions
    
    this.partitions = ['p0','p1','p2','p3','p4'];
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  view() {
    //call get parttion
    //then call refreshData from servce file
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
    if(this.showData){
      this.showData = false;
      this.columns = [];
      this.jsonData = null;
      this.data = null;
      this.selectedPartition = ''
    }
    this.dialogRef.close();
  }

}
