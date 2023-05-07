import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Result } from 'src/app/shared/models/result';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  @Input() loggedInUser?: firebase.default.User | null;

  resultForm: FormGroup;
  dataSource: MatTableDataSource<Result> | null = null;
  displayedColumns: string[] = ['position', 'bib', 'name', 'time', 'actions'];

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.resultForm = this.fb.group({
      bib: ['', Validators.required],
      name: ['', Validators.required],
      time: ['', [Validators.required, this.timeFormatValidator()]]
    });
  }

  ngOnInit(): void {
    this.crudService.getResults().subscribe((data: Result[] | undefined) => {
      if (data) {
        this.dataSource = new MatTableDataSource<Result>(data);
      }
    });
  }

  addResult(): void {
    if (this.resultForm.valid) {
      const newResult: Result = {
        id: '',
        bib: this.resultForm.value.bib,
        name: this.resultForm.value.name,
        time: this.resultForm.value.time
      };
      this.crudService.addResult(newResult)
        .then(() => {
          this.resultForm.reset();
        })
        .catch((error) => {
          console.error('Error adding result: ', error);
        });
    }
  }

  timeFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
      const validFormat = timeRegex.test(control.value);
      return validFormat ? null : { invalidTimeFormat: { value: control.value } };
    };
  }

  

  deleteItem(resultId: string): void {
    this.crudService.deleteResult(resultId)
      .then(() => {
        console.log('Item deleted successfully.');
      })
      .catch((error) => {
        console.error('Error deleting item: ', error);
      });
  }
}
