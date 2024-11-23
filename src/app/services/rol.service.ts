import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class rol {
  private url = ` ${base_url}/rol`;
  private listaCambio = new Subject<rol[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<rol[]>(this.url);
  }

  insert(de: rol) {
    return this.http.post(this.url, de);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: rol[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: Number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<rol>(`${this.url}/${id}`);
  }

  update(d: rol) {
    return this.http.put(this.url, d);
  }


}

