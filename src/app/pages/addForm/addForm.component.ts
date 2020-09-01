import { RestApiService } from './../../shared/rest-api.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addForm',
  templateUrl: './addForm.component.html',
  styleUrls: ['./addForm.component.scss']
})
export class AddFormComponent implements OnInit {

   breakpoint: number; // Breakpoint observer code
   id: number;
   addPatientForm: FormGroup;
  convertDate: string;
  wasFormChanged = false;



  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public restApiService: RestApiService,
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   )
  {

  }

 /****Change Date Format ****/
  date(e): void {
    this.convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.addPatientForm.get('dateOfBirth').patchValue(this.convertDate, {
     onlyself: true
   });
 }

  ngOnInit(): void {
    this.addPatientForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]

    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    if (this.data.info !== ''){
      // tslint:disable-next-line: jsdoc-format
      /**Get By ID ***/
    this.restApiService.getPatient(this.data.info.id).subscribe((data: {}) => {
      console.log(data);
    });
  }
    if (this.data.info !== ''){
      this.addPatientForm.patchValue({
        id: this.data.info.id,
        name: this.data.info.name,
        gender: this.data.info.gender,
        dateOfBirth: this.data.info.dateOfBirth
      });
    }
}

// ******ADD and Edit ****/
   onaddPatient(): void {
    this.markAsDirty(this.addPatientForm);
    if (this.data.info  == ''){
      this.restApiService.createPatient(this.addPatientForm.value).subscribe((data: {}) => {
        console.log(data);
      });


  } else {
    this.restApiService.updatePatient(this.data.info.id, this.addPatientForm.value).subscribe((data: {}) => {
      console.log(data);
    });
  }
    this.dialog.closeAll();
  }

  // ****Close Button*****/
  openDialog(): void {
    console.log(this.wasFormChanged);
    this.dialog.closeAll();
  }


  /**** Media Size ***/
   onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

   markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line: forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged(): void {
    this.wasFormChanged = true;
  }
}
