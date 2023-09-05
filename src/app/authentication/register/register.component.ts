import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // using template driven Form
  //in html i used [(ngModel)]
  issn = '';

  //Using Reactive Forms

  formData = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    password: new FormControl(),
    confirmPass: new FormControl(),
  });

  //using Reactive form builder
  formBuilderData: FormGroup;
  singleControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  constructor(fb: FormBuilder, private router: Router) {
    this.formBuilderData = fb.group({
      name: ['',Validators.min(5)],
      email: ['',[Validators.email,
        Validators.pattern('.*com$')]],
      phone:['',Validators.min(8)],
      password: '',
      confirmPass: '',
      address: fb.group({
        city: '',
        street: '',
      }),
    });

    // this.singleControl.valueChanges.subscribe((data) => {
    //   console.log(data);
    // });


    this.formBuilderData.valueChanges.subscribe(changes => {
      console.log('changes',this.email)
      if (isNaN(changes.phone)) {
        this.formBuilderData.patchValue({
          phone: changes.phone.replace(/[a-zA-Z]/g, '')
        });
      }
    });


    // setTimeout(() => {
    //   this.singleControl.setValue('data set using setValue')
    // }, 2000);

    // this.singleControl.dispatch()
    /**
     * int x,y,z;
     * function returnData (){
     * return x+y;
     * data returnd top my data int x or y for data visulaization
     * keep data to my data engin
     * in the more info get the app data returnd
     *
     * }
     */
  }
  get email() {
   return this.formBuilderData.get('email')
  }

  onSubmit() {
    console.log(this.formBuilderData.value);
    this.formBuilderData.reset();

    this.router.navigate(['login']);
  }
}
