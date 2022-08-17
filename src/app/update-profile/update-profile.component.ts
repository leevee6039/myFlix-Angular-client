import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  updateUser(): void {
    console.log(this.userData);
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('Succesfully updated profile', 'OK', {
        duration: 2000,
      });
    });
  }
}
