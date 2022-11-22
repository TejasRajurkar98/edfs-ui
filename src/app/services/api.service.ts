import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'https://90qm6.mocklab.io/';
  //BASE_URL = 'https://41ef-2607-fb90-21d5-f4c-a838-83cd-b6f2-eec5.ngrok.io/'

  constructor(private http: HttpClient ) { }

  currentPath = '';
  database = '';
  columns: any[] = [];
  children: String[] = [];
  searchData ='{"schema":{"fields":[{"name":"index","type":"integer"},{"name":"aaa","type":"integer"},{"name":"bbb","type":"string"},{"name":"ccc","type":"string"},{"name":"ddd","type":"integer"}],"primaryKey":["index"],"pandas_version":"1.4.0"},"data":[{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677}]}';


  catResponse = '{"schema":{"fields":[{"name":"index","type":"integer"},{"name":"aaa","type":"integer"},{"name":"bbb","type":"string"},{"name":"ccc","type":"string"},{"name":"ddd","type":"integer"}],"primaryKey":["index"],"pandas_version":"1.4.0"},"data":[{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677},{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677},{"index":0,"aaa":1,"bbb":"qwe","ccc":"asd","ddd":1234},{"index":1,"aaa":2,"bbb":"wer","ccc":"asd","ddd":23454},{"index":2,"aaa":3,"bbb":"ert","ccc":"sdf","ddd":34566},{"index":3,"aaa":4,"bbb":"rty","ccc":"dfg","ddd":456},{"index":4,"aaa":5,"bbb":"tyu","ccc":"fgh","ddd":4677}]}'

  public ls(path : String){
    return this.http.get(`${this.BASE_URL}${this.database}/ls?path=${path}`);
  }

  public cat(path: String){
    return this.http.get(`${this.BASE_URL}${this.database}/cat?path=${path}`);
  }

  public mkdir(path: String){
    return this.http.get(`${this.BASE_URL}${this.database}/mkdir?path=${path}`);
  }

  public rm(path: String){
    return this.http.get(`${this.BASE_URL}${this.database}/rm?path=${path}`)
  }
}




// filePath = '/new_df.csv'
//     aggregatorFunction = 'SUM'
//     aggregatorColumn = 'goals_scored'
//     columnFilters = [{"team_code": {"greaterThan": ['7']}}]
//     displayColumns = ['team_name', 'goals_scored']
//     groupedBy = ['team_name']