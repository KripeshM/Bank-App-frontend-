import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
    @Input() deleteAcno:any;
    ngOnInit(): void {

    }

    //userdefined event
    @Output() onCancel=new EventEmitter();
    @Output() onDelete=new EventEmitter();
    cancel(){
      this.onCancel.emit();
    }

    deleteFromChild(){
      this.onDelete.emit()
    }
}
