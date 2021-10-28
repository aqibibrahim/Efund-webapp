import { ChartofaccountsService } from './../../settings-service/chartofaccounts.service';
import { ChequebookService } from './../../settings-service/chequebook.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

interface PeriodicElement {
  id: any;
  position: number;
  name: any;
  items: any;
}


@Component({
  selector: 'app-chartofaccounts',
  templateUrl: './chartofaccounts.component.html',
  styleUrls: ['./chartofaccounts.component.scss']
})
export class ChartofaccountsComponent implements OnInit {
  account; //hold data that retrieved from server for editing
  deleteitem;
  modalOptions: NgbModalOptions;
  closeResult: string;
  displayedColumns: string[] = [
    "position",
    "name",
    "items",
    "actions"
  ];
  dataSource;
  ELEMENT_DATA: PeriodicElement[] = [];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    items: new FormArray([
      new FormGroup({
        item_name: new FormControl('', Validators.required)
      })
    ]) 
  });
  get name() {
    return this.form.get('name')
  }
  get items(){
    return this.form.get('items') as FormArray
  }
  chartdata = {
    id: '',
    name: ''
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private chartofaccountservice: ChartofaccountsService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      centered: true
    }
  }

  ngOnInit() {
    this.populateTable()
  }

  addItem(){
    (<FormArray>this.form.controls['items']).push(
      new FormGroup({
        item_name: new FormControl('', Validators.required)
      })
    )
  }

  removeItem(control:AbstractControl){
    (<FormArray>this.form.controls['items']).removeAt(this.items.controls.indexOf(control))
  }

  populateTable() {
    this.chartofaccountservice.getChartofAccounts().subscribe(
      result => {
        console.log("result : ", result)
        let position = 1
        for (let data of result['chart']) {
          let chart = {
            id: data._id,
            position: position,
            name: data.name,
            items: ''
          }
          for (let item of data.items) {
            chart.items = chart.items + item.item_name + ","
          }
          chart.items = chart.items.slice(0, chart.items.length - 1)
          this.ELEMENT_DATA.push(chart)
          position++
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      }
    )
  }

  openDelete(modal, id) {
    this.deleteitem = id
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteChart(id) {
    this.chartofaccountservice.deleteChartofAccount(id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationDelete()
        this.dataSource.data.splice(id, 1)
        this.dataSource._updateChangeSubscription()
      } , error=>{
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
      }
    )
  }

  openEdit(modal, id) {
    this.chartofaccountservice.getChartofAccount(id).subscribe(
      result => {
        console.log("Items to edit : ", result['chart'].items[0].item_name);
        this.chartdata.id = result['chart']._id
        this.chartdata.name = result['chart'].name
        this.form.setControl('items', this.setExistingItems(result['chart'].items))

        this.account = result['chart']
      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.emptyModalFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setExistingItems(chartItems): FormArray {
    const formArray = new FormArray([]);
    chartItems.forEach(element => {
      formArray.push(new FormGroup({
        item_name: new FormControl(element.item_name)
      }));
    });
    return formArray;
  }

  updateChart() : void {
    this.mapFormValues();
    console.log("this.acc",this.account);
    this.chartofaccountservice.updateChartofAccount(this.account, this.chartdata.id).subscribe(
      () => {
        this.modalService.dismissAll()
        this.showNotificationUpdate()
        this.emptyModalFields()
        this.ELEMENT_DATA = []
        this.populateTable()
      },
      (err: any) => {
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+err.message+'</span>',
          "",
          {
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-error",
            positionClass: "toast-bottom-center"
          }
        ); 
      }
    );
  }

  mapFormValues() {
    // console.log("this.form.value.name",this.form.value.name);
    this.account.name = this.form.value.name;
    // console.log("this.account.name",this.account.name);
    // console.log("this.form.value.items",this.form.value.items);
    this.account.items = this.form.value.items;
    // console.log("this.account.items",this.account.items);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.deleteitem = ""
      return 'by clicking on a backdrop';
    } else {
      "closing"
      return `with: ${reason}`;
    }
  }

  emptyModalFields() {
    this.form.reset()
    this.chartdata = {
      id: '',
      name: ''
    }
  }

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Chart</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }

  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Chart</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }

}
