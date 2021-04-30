import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  myForm : any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      phones: this.fb.array([])
    })
    
  }
  get phoneForms() {
    return this.myForm.get('phones') as FormArray
  }

  addPhone() {

    const phone = this.fb.group({ 
      area: [],
      prefix: [],
      line: [],
    })

    this.phoneForms.push(phone);
  }
  deletePhone(i:any) {
    this.phoneForms.removeAt(i)
  }

  

}
