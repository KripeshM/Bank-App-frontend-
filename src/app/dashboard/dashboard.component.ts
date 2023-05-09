import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapse: boolean = true;
  User: string = '';
  currentAcno: string = '';
  balance: Number = 0;

  fundTransferSuccessMsg:string=''
  fundTransferErrorMsg:string=''

  //delete account
  acno:any;
  deleteConfirmStatus:boolean=false;
  deleteSuccessMessage:string=''

  constructor(private fundTransfer: FormBuilder, private api: ApiService,private dashboardRouter:Router) { }

  ngOnInit(): void {

    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.dashboardRouter.navigateByUrl('')
    }
    if (localStorage.getItem('currentUser')) {
      this.User = localStorage.getItem('currentUser') || ''
    }
    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = localStorage.getItem('currentAcno') || ''
    }
  }



  transferForm = this.fundTransfer.group({
    creditaAcno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })

  collapse() {
    this.isCollapse = !this.isCollapse;
  }

  getBalance() {
    //api call to get balance

    this.api.getBalance(this.currentAcno).subscribe((result: any) => {
      this.balance = result.balance;
    })

  }


  fundtransfer() {
    if(this.transferForm.valid){

      //get the details from the fund transfer form 
      let creditAcno=this.transferForm.value.creditaAcno
      let amount=this.transferForm.value.amount
      let password=this.transferForm.value.password
      this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
        console.log(result);
        this.fundTransferSuccessMsg=result.message

        setTimeout(() => {
          this.transferForm.reset()
          this.fundTransferSuccessMsg=''
        },2000);
        
      },
      (result:any)=>{
        console.log(result.error.message);
        this.fundTransferErrorMsg=result.error.message
        

        setTimeout(() => {
          this.transferForm.reset()
          this.fundTransferErrorMsg=''
        },1000);
      }

      )
    }
    else{
      alert("Please provide a valid data")
    }
   
  }
  resetForm(){
    this.transferForm.reset();
  }

  logout(){
    localStorage.clear()
    this.dashboardRouter.navigateByUrl('')
  }

  deleteAccount(){
    //data to be shared with child
    this.acno=localStorage.getItem('currentAcno')
    this.deleteConfirmStatus=true;
  }

  Canceldelete(){
    this.acno='';
    this.deleteConfirmStatus=false;
  }
  deleteFromParent(){
    this.api.deleteUserAccount().subscribe((result:any)=>{
      this.deleteSuccessMessage=result.message
      alert(this.deleteSuccessMessage)
      localStorage.clear();
      this.dashboardRouter.navigateByUrl('')
    })
  }
}
