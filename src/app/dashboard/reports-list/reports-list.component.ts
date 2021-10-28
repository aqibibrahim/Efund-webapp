import { ReportsService } from "./../../dashboard-services/reports.service";
import { ProjectsService } from "./../../dashboard-services/projects.service";
import { ReportsharingService } from "./../../dashboard-services/reportsharing.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {take} from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'; 
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface PeriodicElement {
  position: number;
  check_no: string;
  payee_name: string;
  amount: any;
  date_submit: string;
  status: any;
}

@Component({
  selector: "app-reports-list",
  templateUrl: "./reports-list.component.html",
  styleUrls: ["./reports-list.component.scss"]
})
export class ReportsListComponent implements OnInit {
  paymentvalues:any;
  fileName= 'ExcelSheet.xlsx'; 
  reportname:any;
  displayedColumns: string[] = [
    "position",
    "check_no",
    "payee_name",
    "amount",
    "date_submit",
    "status"
  ];
  dataSource;
  ELEMENT_DATA: PeriodicElement[] = [];
  showpayment = false;
  constructor(
    private reportsharing: ReportsharingService,
    private reportservice: ReportsService
  ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listdata;
  
  ngOnInit() {
    let res = this.reportsharing.currentdata.pipe(take(1)).subscribe(result => {
      console.log(result);
      this.reportname = result;
      this.listdata = result;
     
      
      if (this.listdata != "") {
        if (result.payee) {
          this.reportservice.getFromPayee(result).subscribe(result => {
             this.paymentvalues = result;
            let position = 1;
            console.log(result); 
            this.paymentvalues = result;
            for (let data in result["report"]) {
              for (let detail in result["report"][data]["details"]) {
                
                let debcred, status;
                if ((result["report"][data]["details"][detail].credit == 0)) {
                  debcred = result["report"][data]["details"][detail].debit;
                  status = "Debit";
                } else {
                  debcred = result["report"][data]["details"][detail].credit;
                  status = "Credit";
                }
                let item: PeriodicElement = {
                  position: position,
                  check_no:
                    result["report"][data]["details"][detail].cheque_number,
                  payee_name:
                    result["report"][data]["details"][detail].payee_name,
                  amount: debcred,
                  date_submit: (result["report"][data]["details"][detail]
                    .date as string).slice(0, 10),
                  status: status
                };
                position++;
                this.ELEMENT_DATA.push(item);
              }
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          });
        }
        else if (result.payment) {
          this.showpayment = true;
          this.displayedColumns = [
            "position",
            "payee_name",
            "amount",
            "date_submit",
            "status"
          ];
          this.reportservice.getFromPayment(result).pipe(take(1)).subscribe(result => {
            console.log(result["report"].length);
            if(result["report"] == 0){
              alert("There is no record against your query")
            }
            else{
              this.paymentvalues = result;
              let position = 1;
              for (let data in result["report"]["purchase"]) {
                let status;
                if ((result["report"]["purchase"][0].payment_status = 1)) {
                  status = "Approved";
                } else if ((result["report"]["purchase"][0].payment_status = 2)) {
                  status = "Rejected";
                }
                let item: PeriodicElement = {
                  position: position,
                  check_no: result["report"]["purchase"][0].cheque_number,
                  payee_name: result["report"]["user"].name,
                  amount: result["report"]["purchase"][data].payment,
                  date_submit: (result["report"]["purchase"][0].date as string).slice(
                    0,
                    10
                  ),
                  status: status
                };
                position++;
                this.ELEMENT_DATA.push(item);
              }
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            }
            
          });
        }
        else if (result.bankAccount) {
          this.reportservice.getFromBank(result).subscribe(result => {
            console.log(result);
            let position = 1;
            this.paymentvalues = result;
            for (let data in result["report"]) {
              for (let detail in result["report"][data]["details"]) {
                let debcred, status;
                if ((result["report"][data]["details"][detail].credit == 0)) {
                  debcred = result["report"][data]["details"][detail].debit;
                  status = "Debit";
                } else {
                  debcred = result["report"][data]["details"][detail].credit;
                  status = "Credit";
                }
                let item: PeriodicElement = {
                  position: position,
                  check_no:
                    result["report"][data]["details"][detail].cheque_number,
                  payee_name:
                    result["report"][data]["details"][detail].payee_name,
                  amount: debcred,
                  date_submit: (result["report"][data]["details"][detail]
                    .date as string).slice(0, 10),
                  status: status
                };
                position++;
                this.ELEMENT_DATA.push(item);
              }
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          });
        }
        else if (result.check_st_no) {
          this.reportservice.getFromChequebook(result).subscribe(result => {
             console.log(result);
             this.paymentvalues = result;
            let position = 1;
            for(var i=0;i<result["report"].length;i++){
              for(var j=0;j<result["report"][i]["details"].length;j++){
                console.log(result["report"][i]["details"]);
                let status,amount;
                if ((result["report"][i]["details"][j].credit == 0)) {
                  status = "Debit";
                  amount= result["report"][i]["details"][j].debit
                } else if ((result["report"][i]["details"][j].debit == 0)) {
                  status = "Credit";
                  amount= result["report"][i]["details"][j].credit
                }
                let item: PeriodicElement = {
                  position: position,
                  check_no: result["report"][i]["details"][j].cheque_number,
                  payee_name: result["report"][i]["details"][j].payee_name,
                  amount: amount,
                  date_submit: (result["report"][i]["details"][j].date as string).slice(
                    0,
                    10
                  ),
                  status: status
                };
                position++;
                this.ELEMENT_DATA.push(item);
              }
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
              }
             
            
            
          });
        }
        else if (result.amount_start) {
           
          this.reportservice.getFromCost(result).subscribe(result => {
            let position = 1;
             console.log(result);
             this.paymentvalues = result;
            for (let data in result["report"]) {
              for (let detail in result["report"][data]["details"]) {
                let debcred, status;
                if ((result["report"][data]["details"][detail].credit == 0)) {
                  debcred = result["report"][data]["details"][detail].debit;
                  status = "Debit";
                } else {
                  debcred = result["report"][data]["details"][detail].credit;
                  status = "Credit";
                }
                let item: PeriodicElement = {
                  position: position,
                  check_no:
                    result["report"][data]["details"][detail].cheque_number,
                  payee_name:
                    result["report"][data]["details"][detail].payee_name,
                  amount: debcred,
                  date_submit: (result["report"][data]["details"][detail]
                    .date as string).slice(0, 10),
                  status: status
                };
                position++;
                this.ELEMENT_DATA.push(item);
              }
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          });
        }
        else {
          this.reportservice.getFromDate(result).subscribe(result => {
            let position = 1;
            this.paymentvalues = result;
            console.log(this.paymentvalues);
            for (let data in result["report"]) {
              for (let detail in result["report"][data]["details"]) {
                let debcred, status;
                if (result["report"][data]["details"][detail].credit == 0) {
                  debcred = result["report"][data]["details"][detail].debit;
                  status = "Debit";
                } else {
                  debcred = result["report"][data]["details"][detail].credit;
                  status = "Credit";
                }
                let item: PeriodicElement = {
                  position: position,
                  check_no:
                    result["report"][data]["details"][detail].cheque_number,
                  payee_name:
                    result["report"][data]["details"][detail].payee_name,
                  amount: debcred,
                  date_submit: (result["report"][data]["details"][detail]
                    .date as string).slice(0, 10),
                  status: status
                };
                position++;
                this.ELEMENT_DATA.push(item);
              }
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          });
        }
      }
    });

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
  generatepdf(){
  
    var rows = [];
    var debcred;
    rows.push(['Cheque No','Payee Name','Amount','Date of Submitt','Status']);
    
    for(var i=0;i<this.paymentvalues["report"].length;i++){
      for(var j of this.paymentvalues["report"][i]["details"]) {
    console.log(j.payee_name);
    if (j.credit == 0) {
     status = "Debit";
     debcred = j.debit;
    } else {
      status = "Credit";
      debcred = j.credit;
    }
        rows.push([j.cheque_number,j.payee_name,debcred,j.date.slice(0,10),status]);
    }

  }
    var dd = {
        content: {
            table: {
                    widths: ['*', 100, 150, 150, '*'],
                    body: rows
                }
        }
    
    }
    pdfMake.createPdf(dd).open();
     }
  
  
}
