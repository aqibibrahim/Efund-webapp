import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js';
import { trigger, transition, style, animate } from '@angular/animations';
import { BankService } from '../../settings-service/bank.service';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddBankComponent } from '../../settings/add-bank/add-bank.component';
import { ProjectsService } from '../../dashboard-services/projects.service';
import {GetDataService} from '../../dashboard-services/get-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  
  banks;
  LoggedInUser_id;
  totalaccountant;
  totalpurchaser;
  totalsupervisor;
  banksWithBranches = [];
  modalOptions: NgbModalOptions;
  constructor(private bankService: BankService,private ref: ChangeDetectorRef, private _GetDataService: GetDataService,
    private projectService: ProjectsService,
    private modalService: NgbModal) { 
      
      this.modalOptions = {
        backdrop: 'static',
        backdropClass: 'customBackdrop',
        size: 'lg',
        centered: true
      }
    }

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public barChart;
  public chartHours;


  userProjects = [];
  
  ngOnInit() {
    var BarLabels = new Array();
    var BarData = new Array();
    let labels = [];
    let data = [];
    this.LoggedInUser_id = localStorage.getItem("userid");
    this.projectService.getUsersOnProjects().subscribe(
      (users:any)=>{
        console.log("users " ,users);
        this.userProjects = users.project;
      },
      error=>{
        console.error(error)
      }
    );

    this._GetDataService.getallusers(this.LoggedInUser_id).subscribe(
      result=>{
        
        this.totalaccountant = result["totalAccountant"];
        this.totalpurchaser = result["totalPurchaser"];
        this.totalsupervisor = result["totalSupervisor"];
        
      }
    )

    this.bankService.getAllBanksAndAccounts().subscribe(
      (banksInfo:any)=>{
      console.log("banks ",banksInfo);
      let banks = banksInfo.account.map(bank=>bank.name);
      banks = banks.filter(bank=>bank!=null);
      let uniq = [...new Set(banks)];

      let data = uniq.map(bank=>{
        return {
          id:bank,
          total: banksInfo.account.filter(account=>account.name==bank).reduce((total, account)=>{
            return total + parseFloat(account.amount) ;
          } , 0),
          accounts: banksInfo.account.filter(account=>account.name==bank)
        }
      });
     
      this.banksWithBranches = data;
      console.log(this.banksWithBranches);
    },
    error=>{
      console.error(error)
    });


    this.bankService.getBank().subscribe(
      result => {
        console.log("Getting Banks ", (result));
        this.banks = result['bank'];

        this.banks.forEach(element => {
          data.push(element["pin"]);
          labels.push(element["name"].toString());
        });

        this.canvas = document.getElementById("chartHours");
        this.ctx = this.canvas.getContext("2d");

        this.chartHours = new Chart(this.ctx, {
          type: 'bar',

          data: {
            labels: labels,
            datasets: [{
              label: 'pin #',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        });

      }
    );
    this.chartColor = "#FFFFFF";



    this.canvas = document.getElementById("barChart");
    this.ctx = this.canvas.getContext("2d");
    this.barChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
            '#ef8157'
          ],
          borderWidth: 0,
          data: [342, 480, 530, 120]
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });

    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [dataFirst, dataSecond]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });


  }

  open(){
    const modalRef = this.modalService.open(AddBankComponent);
  }
 
}