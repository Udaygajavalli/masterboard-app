import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  myForm: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private storage: AngularFireStorage
  ) {
    this.auth.getUser().subscribe(
      (user) => {
        if (user) {
          this.user = user;
        } else {
          this.toastr.warning('Please sign in to access this page.');
        }
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      courseName: '',
      courseDescription: '',
      courseAuthor: '',
      items: this.fb.array([]),
    });
  }
  get itemForms() {
    return this.myForm.get('items') as FormArray;
  }

  addPhone() {
    const item = this.fb.group({
      moduleName: [],
      moduleLink: [],
    });

    this.itemForms.push(item);
  }
  deletePhone(i: any) {
    this.itemForms.removeAt(i);
  }
}
