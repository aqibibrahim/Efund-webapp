import { CostcenterService } from "./../../settings-service/costcenter.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface PeriodicElement {
  id: string;
  name: string;
  position: number;
  description: any;
  date: any;
}

@Component({
  selector: "app-cost-center-list",
  templateUrl: "./cost-center-list.component.html",
  styleUrls: ["./cost-center-list.component.scss"]
})
export class CostCenterListComponent implements OnInit {
  deleteitem
  modalOptions: NgbModalOptions;
  closeResult: string;
  displayedColumns: string[] = ["position", "name", "description", "actions"];
  dataSource;
  ELEMENT_DATA: PeriodicElement[] = [];
  costcenterdata = {
    id: '',
    name: '',
    description: ''
  }
  form = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*")
    ]),
    description: new FormControl("", [Validators.required])
  });
  get name() {
    return this.form.get("name");
  }
  get description() {
    return this.form.get("description");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private CostCenterService: CostcenterService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      centered: true
      // windowClass: 'customModal'
    }
  }

  ngOnInit() {
    this.populateTable()
  }

  populateTable() {
    this.CostCenterService.getCostcenters().subscribe(result => {
      let position = 1;
      for (let data in result["costcenter"]) {
        let cost: PeriodicElement = {
          id: result["costcenter"][data]._id,
          position: position,
          name: result["costcenter"][data].name,
          description: result["costcenter"][data].description,
          date: (result["costcenter"][data].date as string).slice(0, 10)
        };
        this.ELEMENT_DATA.push(cost);
        position++;
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  openDelete(modal, id) {
    this.deleteitem = id
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteCostcenter(id) {
    this.CostCenterService.deleteCostcenter(id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationDelete()
        this.dataSource.data.splice(id, 1)
        this.dataSource._updateChangeSubscription()
      }
    )
  }

  openEdit(modal, id) {
    this.CostCenterService.getCostcenter(id).subscribe(
      result => {
        this.costcenterdata.id = result['costcenter']._id
        this.costcenterdata.name = result['costcenter'].name
        this.costcenterdata.description = result['costcenter'].description
      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.emptyModalFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateCostCenter(data) {
    this.CostCenterService.updateCostcenter(this.costcenterdata.id, data).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationUpdate()
        this.emptyModalFields()
        this.ELEMENT_DATA = []
        this.populateTable()
      }
    )
  }

  emptyModalFields() {
    this.form.reset()
    this.costcenterdata = {
      id: '',
      name: '',
      description: ''
    }
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

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Cost center</span>',
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
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Cost Center</span>',
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
