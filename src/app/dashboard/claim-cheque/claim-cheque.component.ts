import { ToastrService } from "ngx-toastr";
import { NotifyshareService } from "./../../shared/notifyshare.service";
import { NotificationsService } from "./../../shared/notifications.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import {GetDataService} from '../../dashboard-services/get-data.service';
import { MatTableDataSource } from "@angular/material/table";
import * as XLSX from 'xlsx'; 
interface chequedata {
  type: any;
  status: any;
  _id: any;
  from: any;
  to: any;
  message: any;
}
interface PeriodicElement {
  date: string;
  bank: string;
  purchaser_name: any;
  item_name: string;
  item_quantity: string;
  item_price:string;
  amount:string;
}

@Component({
  selector: 'app-claim-cheque',
  templateUrl: './claim-cheque.component.html',
  styleUrls: ['./claim-cheque.component.scss']
})
export class ClaimChequeComponent implements OnInit {

  constructor(
    private notifyService: NotificationsService,
    private notifyShare: NotifyshareService,
    private toastr: ToastrService,
    private _getdata: GetDataService
  ) {}
  form = new FormGroup({
    date: new FormControl("", [Validators.required]),
    pname: new FormControl("", [Validators.required]),
    bank: new FormControl("", [Validators.required]),
    item_name: new FormControl("", [Validators.required]),
    item_quantity: new FormControl("", [Validators.required]),
    item_price: new FormControl("", [Validators.required]),
    amount: new FormControl("", [Validators.required]),
  });
  chequedata: chequedata = {
    type: "",
    status: "",
    _id: "",
    to: "",
    from: "",
    message: "",
  };
  displayedColumns: string[] = [
    "date",
    "bank",
    "purchasername",
    "itemname",
    "itemquantity",
    "itemprice",
    "amount"
  ];
  message;
  fileName= 'ClaimRequest.xlsx'; 
  notification;
  bankName = "";
  itemname:"";
  quantity:"";
  itemprice:"";
  totalprice:"";
  purchasername:"";
  requestdate:"";
  dataSource;
  ELEMENT_DATA: PeriodicElement[] = [];
  ngOnInit() {
    
    this.notifyShare.currentNotify.subscribe((result) => {
     
      this.notification = result;
      this.notifyService
        .getNotificationData(result["id"])
        .subscribe((result:any) => {
          this.ELEMENT_DATA = [];
          console.log("result ",result);
          this.chequedata = result;
          //this.message = this.chequedata.message;
          this.message = JSON.parse(this.chequedata.message);
          this.bankName = result.bank_name
          console.log("message ", this.message);
          this.itemname = this.message[0].category
          this.quantity = this.message[0].qty;
          this.itemprice = this.message[0].price;
          this.totalprice = this.message[0].pkr;
          this.purchasername = result.purchaserName;
          this.requestdate = result.date.slice(0, 10)
          this.form.patchValue({
                date:  result.date.slice(0, 10),
                pname: result.purchaserName,
                bank: result.bank_name,
                item_name: this.itemname,
                item_quantity: this.quantity,
                item_price: this.itemprice,
                amount: this.totalprice,
              });
              
              let project: PeriodicElement = {
                date:result.date.slice(0, 10),
                bank: result.bank_name,
                purchaser_name: result.purchaserName,
                item_name: this.itemname,
                item_quantity: this.quantity,
                item_price: this.itemprice,
                amount:this.totalprice
              };
              this.ELEMENT_DATA.push(project);
              console.log( this.ELEMENT_DATA);
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        } ,  error=>{
          this.toastr.error(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+error.message+'</span>',
            "",
            {
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-error",
              positionClass: "toast-bottom-center"
            }
          );    
        });
    });
  }

  print(data: NgForm) {
    console.log(data);
    this.showNotification()
     this.notifyService.sendPrintData(this.chequedata._id);
    
  }

  printclaimcheque(){
    let data = {
      "date": this.requestdate,
      "bank": this.bankName,
      "pname": this.purchasername,
      "itemname": this.itemname,
      "itemqty":this.quantity,
      "itemprice": this.itemprice,
      "amount":this.totalprice,
      "id":this.chequedata._id
    }
    this.notifyService.sendClaimCheque(data);
    this.showNotification();
  }
  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Please wait for print..</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center",
      }
    );
  }
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
}
