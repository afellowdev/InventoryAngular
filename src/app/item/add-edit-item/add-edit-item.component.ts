import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryApiService } from 'src/app/inventory-api.service';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.css']
})
export class AddEditItemComponent implements OnInit {

  itemTypeList$!: Observable<any[]>;
  itemLocationList$!: Observable<any[]>;

  uploadedFile: any;
  uploadedFormData!: FormData;
  isFileUploaded: boolean = false;

  constructor(private service:InventoryApiService) { }

  @Input() item:any;
  id: number = 0;
  name: string = "";
  notes: string = "";
  itemTypeId!: number;
  itemLocationId!: number;
  updatedDate: Date = new Date();
  imageFileName: string = "";
  imageFileNameOld: string = "";

  ngOnInit(): void {
    this.itemTypeList$ = this.service.getItemTypeList();
    this.itemLocationList$ = this.service.getItemLocationList();

    this.id = this.item.id;
    this.name = this.item.name;
    this.notes = this.item.notes;
    this.itemTypeId = this.item.itemTypeId;
    this.itemLocationId = this.item.itemLocationId;
    this.updatedDate = this.item.updatedDate;

    if (this.id !== 0) {
      this.service.getImageByItemId(this.id).subscribe(data => {
        this.imageFileName = data.imageFile;
        this.imageFileNameOld = data.imageFile;
      });
    }
  }

  addItem() {
    var item = {
      name: this.name,
      notes: this.notes,
      itemTypeId: this.itemTypeId,
      itemLocationId: this.itemLocationId,
      updatedDate: new Date
    }

    this.service.addItem(item).subscribe(res => {
      let ret:any = res;
      this.addUpdateImage(this.imageFileName, (new Date).toLocaleString(), ret.id); 
      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = "block !important";
      }
      setTimeout(function() {
        if (showAddSuccess) {
          showAddSuccess.style.display = "none !important";
        }
      }, 5000);            
    });         
  }

  updateItem() {
    var item = {
      id: this.id,
      name: this.name,
      notes: this.notes,
      itemTypeId: this.itemTypeId,
      itemLocationId: this.itemLocationId,
      updatedDate: new Date()
    }

    this.service.updateItem(this.id, item).subscribe(res => {
      this.addUpdateImage(this.imageFileName, (new Date).toLocaleString(), this.id);     

      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block !important";
      }
      setTimeout(function() {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none !important";
        }
      }, 5000);       
    });   
  }

  addUpdateImage(imageFileName:string, imageNote:string, imageItemId:any) {
    if (!this.isFileUploaded)
      return;

      var itemImage = {
        id: 0,
        imageFile: imageFileName,
        notes: imageNote,
        itemId: imageItemId
      }

      if (this.imageFileNameOld == "") {
        this.service.addImage(itemImage).subscribe();  
      } 
      else {
        this.service.getImageByItemId(imageItemId).subscribe(data => {
          itemImage.id = data.id;

          if (itemImage.id !== 0) {
            this.service.updateImage(itemImage.id, itemImage).subscribe(res => {
              this.service.removeFile(this.imageFileNameOld).subscribe();
            });  
          }    
        });           
      }  
  }

  uploadPhoto(event:any) {
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.FileName);

    this.service.addFile(formData).subscribe(data => {
      this.imageFileName = data.toString();
      this.isFileUploaded = true; //file uploaded to server
    });
  }

  getIamgeFilePath() {
    if (this.imageFileName === undefined || this.imageFileName === null)
      return "";
    return this.service.photoUrl + "/" + this.imageFileName;
  }
}
