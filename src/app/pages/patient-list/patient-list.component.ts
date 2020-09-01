import { AddFormComponent } from './../addForm/addForm.component';
import { RestApiService } from './../../shared/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../shared/patient';
import { MatTableDataSource } from '@angular/material/table';
import {  Sort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {

  ELEMENT_DATA: any = [];
  dataSource: any = [];
  displayedColumns: any = ['id', 'name', 'gender', 'dateOfBirth'];
  sortedData: Patient[];

  constructor(private restApi: RestApiService, public dialog: MatDialog) {

  }

   // *********Open Form for Edit and Update*******
  openDialog(info): void {
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '680px', disableClose: true,
      data: {info}
    });
    dialogRef.afterClosed().subscribe(result => {
      // for new entry
      if ( info === ''){

      }
      // for edit
      if ( info ! === ''){

      }
    });
}

  ngOnInit(): void {
    this.loadPatient();
    console.log(this.dataSource);

  }

   // List of Patient
   loadPatient() {
    return this.restApi.getPatients().subscribe((data: {}) => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.sortedData = this.ELEMENT_DATA.slice();

    });
  }
// *****Delete Patient */
  deletePatient(id): void{
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deletePatient(id).subscribe(data => {
        this.loadPatient();
      });
    }
  }

  /// ****Sorting Data**** */
  sortData(sort: Sort): void {
    const data = this.ELEMENT_DATA.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'gender': return compare(a.gender, b.gender, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        case 'dateOfBirth': return compare(a.dateOfBirth, b.dateOfBirth, isAsc);
        default: return 0;
      }
    });
  }
}

// tslint:disable-next-line: typedef
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
