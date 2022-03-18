import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  readonly inventoryAPIUrl = "http://localhost:7183/api";
  readonly photoUrl = "http://localhost:7183/Photos";

  // readonly inventoryAPIUrl = "https://localhost:7182/api";
  // readonly photoUrl = "https://localhost:7182/Photos";

  constructor(private http:HttpClient) { }

  getItemList():Observable<any[]> {
    return this.http.get<any>(this.inventoryAPIUrl + '/Items');
  }

  addItem(data:any) {
    return this.http.post(this.inventoryAPIUrl + '/Items', data);
  }

  updateItem(id:number|string, data:any) {
    return this.http.put(this.inventoryAPIUrl + `/Items/${id}`, data);
  }

  deleteItem(id:number|string) {
    return this.http.delete(this.inventoryAPIUrl + `/Items/${id}`);
  }

  getItemTypeList():Observable<any[]> {
    return this.http.get<any>(this.inventoryAPIUrl + '/ItemTypes');
  }

  getItemLocationList():Observable<any[]> {
    return this.http.get<any>(this.inventoryAPIUrl + '/ItemLocations');
  }

  addFile(image:any) {
    return this.http.post(this.inventoryAPIUrl + '/ItemImages/AddFile', image);
  }

  addImage(data:any) {
    return this.http.post(this.inventoryAPIUrl + '/ItemImages', data);
  }

  updateImage(id:number|string, data:any) {
    return this.http.put(this.inventoryAPIUrl + `/ItemImages/${id}`, data);
  }

  getImageByItemId(itemId:any) {
    return this.http.get<any>(this.inventoryAPIUrl + `/ItemImages/GetImageByItemId/${itemId}`)
  }

  removeFile(fileName:string) {
    return this.http.delete(this.inventoryAPIUrl + `/ItemImages/RemoveFile/${fileName}`);
  }
}
