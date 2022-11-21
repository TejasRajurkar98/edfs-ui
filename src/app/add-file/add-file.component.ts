import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {

  file: any;
  constructor(public dialogRef: MatDialogRef<AddFileComponent>, public api: ApiService) { }

  ngOnInit(): void {
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  create(name: String) {
    console.log(name)
    if (this.api.currentPath.length > 1){
       //call mkdir
       console.log('Create:' + this.api.currentPath + '/' + name);
       console.log(this.file);
       let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
    }
     
    else
      //call mkdir
      console.log('Create:' + this.api.currentPath + name);
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

  upload(event: any) {
    this.file = null;
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

}
