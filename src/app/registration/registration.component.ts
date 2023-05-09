import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  regErrorMsg:string=''
  regSuccessMsg:string='';
 constructor(private registerFb:FormBuilder,private api:ApiService,private registerRouter:Router){}

 registerForm=this.registerFb.group({  //Formgroup
 //formarray
 username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
 acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
 password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
 })
 //formcontrol passes to the registration.html
 register(){
  
 if(this.registerForm.valid){
  //console.log(this.registerForm.value);//console - formgroup
  let uname=this.registerForm.value.username
  let acno=this.registerForm.value.acno
  let password=this.registerForm.value.password
  // alert('button clicked'+ uname + acno + password);
  this.api.register(acno,uname,password).subscribe((result:any)=>{
    // alert(result.message)
    this.regSuccessMsg=result.message

    //loading timeout
    setTimeout(() => {
      this.registerRouter.navigateByUrl('')
    },5000);
   
  },
  (result:any)=>{
  this.regErrorMsg=result.error.message; //already registered
 })
//time interval
setTimeout(()=>{
  this.registerForm.reset();
  this.regErrorMsg='Please provide a unique account number';
},2000);
 }
 else{
  alert('Invalid Form')
 }
 }
}
