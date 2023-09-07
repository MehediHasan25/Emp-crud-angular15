import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  DepartmentList: any = [];
  ModalTitle = "";
  ActivateAddEditDepartComp: boolean = false;
  depart: any;

  DepartmentIdFilter = "";
  DepartmentNameFilter = "";
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick() {
    this.depart = {
      DepartmentId: "0",
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepartComp = true;
  }

  editClick(item: any) {
    this.depart = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepartComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      console.log("depId",item.departmentId);
      this.service.deleteDepartment(item.departmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditDepartComp = false;
    this.refreshDepList();
  }


  refreshDepList() {
    this.service.getDepartmentList().subscribe(data => {
      console.log("data", data);
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;

    });
  }

  sortResult(prop: any, asc: any) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFnById() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    let initialList:any = JSON.parse(JSON.stringify(this.DepartmentListWithoutFilter)); 

    
/////////////////////Search by Id //////////////////////////////
 if(DepartmentIdFilter!== ''){
      const searchTermIdLower = this.DepartmentIdFilter.toLowerCase();

      // Use Array.filter to filter items based on searchTerm
      this.DepartmentList = initialList.filter((item:any) =>item.departmentId.toString().includes(searchTermIdLower))
      
    }else{
      this.DepartmentList = this.DepartmentListWithoutFilter;
    }


/////////////////////Search by Id //////////////////////////////

  

  }


  FilterFnByName(){
    var DepartmentNameFilter = this.DepartmentNameFilter;
    if(DepartmentNameFilter!== ''){
      const searchTermLower = this.DepartmentNameFilter.toLowerCase();

      // Use Array.filter to filter items based on searchTerm
      this.DepartmentList = this.DepartmentListWithoutFilter.filter((item:any) =>item.departmentName.toLowerCase().includes(searchTermLower))
      
    }else{
      this.DepartmentList = this.DepartmentListWithoutFilter;
    }

  }
}
