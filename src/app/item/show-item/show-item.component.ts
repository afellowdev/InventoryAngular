import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryApiService } from 'src/app/inventory-api.service';
import { formatDate } from '@angular/common';
//import { MatPaginator } from '@angular/material/paginator';
//import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})



export class ShowItemComponent implements OnInit, AfterViewInit {
  totalItems:any;
  pageSize:any = [5, 10, 20];
  page:number = 1;

  //itemList$!:Observable<any[]>;
  itemList:any = [];
  itemListNoFilter:any = [];

  //itemTypeList$!:Observable<any[]>;
  itemTypeMap:Map<number,string> = new Map();
  itemTypeIdMap:Map<string,number> = new Map();
  
  //itemLocationList$!:Observable<any[]>;
  itemLocationMap:Map<number,string> = new Map();
  itemLocationIdMap:Map<string,number> = new Map();

  ItemFilter:string = "";
  ItemLocationFilter:string = "";
  ItemTypeFilter:string = "";

  constructor(private service:InventoryApiService) { }

  ngOnInit(): void {
    this.refreshItemTypeMap();
    this.refreshItemTLocationMap();
    this.refreshItemList();
  }
  
  ngAfterViewInit(): void {

  }

  //  Properties
  modalTitle:string = "";
  activateAddEditItemComponent:boolean = false;
  item:any;

  modalAdd() {
    this.item = {
      id: 0,
      name: null,
      notes: null,
      itemTypeId: null,
      itemLocationId: null,
      updatedDate: null,
      imageFileName: null
    }
    this.modalTitle = "Add Item";
    this.activateAddEditItemComponent = true;
  }

  modalEdit(item:any) {
      this.item = item;
      this.modalTitle = "Edit Item";
      this.activateAddEditItemComponent = true;
  }

  modalClose() {
    this.activateAddEditItemComponent = false;
    this.refreshItemList();
  }

  deleteItem(item:any) {
    if (confirm(`Are you sure to delete item ${item.id}?`)) {

      //delete file associated with item
      this.service.getImageByItemId(item.id).subscribe(data => {
        if (data.imageFile != "") {
           this.service.removeFile(data.imageFile).subscribe();
         }          
        });

      this.service.deleteItem(item.id).subscribe(res => {

        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
  
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block !important";
        }
        setTimeout(function() {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none !important";
          }
        }, 5000);

        this.refreshItemList();
        
      })
    }
  }

  refreshItemTypeMap() {
    this.service.getItemTypeList().subscribe(data => {
      for(let i = 0; i < data.length; i++) {
        this.itemTypeMap.set(data[i].id, data[i].type);
        this.itemTypeIdMap.set(data[i].type.toLowerCase(), data[i].id);
      }
    });
  }

  refreshItemTLocationMap() {
    this.service.getItemLocationList().subscribe(data => {
      for(let i = 0; i < data.length; i++) {
        this.itemLocationMap.set(data[i].id, data[i].location);
        this.itemLocationIdMap.set(data[i].location.toLowerCase(), data[i].id);
      }
    });
  }
  
  refreshItemList() {
    this.service.getItemList().subscribe(data => {      
      this.itemListNoFilter = data;
      this.itemList = data;
      this.totalItems = this.itemList.length;
    })
  }

  formatDateTime(data:any) {
    return formatDate(data, "MM-dd-yyyy", "en-US");
  }

  filterFn() {
    let ItemFilter = this.ItemFilter.trim().toLocaleLowerCase();
    let ItemLocationIdFilter = "";
    let ItemTypeIdFilter = "";

    let ItemLocationId = this.itemLocationIdMap.get(this.ItemLocationFilter.trim().toLocaleLowerCase());
    let ItemTypeId = this.itemTypeIdMap.get(this.ItemTypeFilter.trim().toLocaleLowerCase());

    if (ItemLocationId !== undefined)
      ItemLocationIdFilter = ItemLocationId.toString();
    if (ItemTypeId !== undefined)
      ItemTypeIdFilter = ItemTypeId.toString();

    this.itemList = this.itemListNoFilter.filter(function (el:any) {
      return el.name.toLowerCase().includes(ItemFilter)
        && el.itemLocationId.toString().includes(ItemLocationIdFilter)
        && el.itemTypeId.toString().includes(ItemTypeIdFilter)
    });
    this.totalItems = this.itemList.length;
  }

  sortFn(prop:string, asc:boolean) {
    this.itemList = this.itemListNoFilter.sort(function(a:any,b:any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (a[prop] < b[prop]) ? 1 : ((a[prop] > b[prop]) ? -1 : 0);
      }
    })
  }
}
