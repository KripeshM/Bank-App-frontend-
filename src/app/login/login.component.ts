import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, RouterConfigOptions } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginErrorMsg:string=''
  loginSpinner:boolean=false;
  

  constructor(private loginFb:FormBuilder,private api:ApiService,private loginRouter:Router){}

  loginForm=this.loginFb.group({  //Formgroup
    //formarray
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })

    login(){
  
      if(this.loginForm.valid){
       //console.log(this.registerForm.value);//console - formgroup
       let acno=this.loginForm.value.acno
       let password=this.loginForm.value.password
      //  alert('button clicked'+acno + password);
      //make api call for login
      this.api.login(acno,password).subscribe((result:any)=>{


        //store currentUser in localstorage
        localStorage.setItem('currentUser',result.currentUser);
        //set token in localstorage
        localStorage.setItem('token',result.token);
        //store acno in localstorage
        localStorage.setItem('currentAcno',result.currentAcno);

       
        this.loginSpinner=true;
        
        //redirect to dashboard
        setTimeout(() => {
          this.loginRouter.navigateByUrl('/dashboard')
        },1000);
        
      },
        //response 401
        (result:any)=>{
          //error message
          this.loginErrorMsg=result.error.message
          //set timeout
          setTimeout(() => {
            this.loginForm.reset()
            this.loginErrorMsg='';
          },3000);
        }
      )
      }
      else{
       alert('Invalid Form')
      }
     
     
       
      }
}
