import { Component, OnInit, Inject } from '@angular/core';
import { faFile, faFolder, faAngleLeft, faHome, faAdd } from '@fortawesome/free-solid-svg-icons';



interface Children{
  name: String,
  folder: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  children: String[] = [];
  selectedDatabase = 'MySQL';
  databases = ['MySQL', 'MongoDB'];
  faFile = faFile;
  faFolder = faFolder;
  faAngleLeft = faAngleLeft;
  faHome = faHome;
  faAdd = faAdd;
  currentPath = '';
  addFolder = false;


  ngOnInit(){
    this.currentPath = '/';
    //call ls of root at start
    this.children = ['Tejas', 'Zainab', 'Qasim', 'Hello.csv'];
  }
  
  print(){
    console.log(this.selectedDatabase);
  }

  explore(name: String){
    //call ls of name
    if(name == 'Tejas'){
      this.currentPath = '/Tejas';
      this.children = ['Cars.csv', 'User'];
    }
  }
  back(){
    let path = this.currentPath.split('/');
    for(let x = 0; x<path.length-1; x++){
      this.currentPath = '/'+path[x];
    }
    //call ls of currentPath
    this.children = ['Tejas', 'Zainab', 'Qasim', 'Hello.csv'];
  }

  openAddFolder(){
    console.log('openAddFolder called');
    this.addFolder= true;
  }
}
