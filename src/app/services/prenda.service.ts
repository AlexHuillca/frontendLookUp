import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PrendaService {
  private basePath = environment.base + '/api';

  constructor(private http: HttpClient) { }

  save = (dato: any): Observable<any> => {
    const path = this.basePath + `/prenda`;
    return this.http.post<any>(path, dato).pipe(map((res) => res));
  }

  delete = (id: any): Observable<any> => {
    const path = this.basePath + `/eliminar/prenda/${id}`;
    return this.http.delete<any>(path).pipe(map((res) => res));
  }

  list = (): Observable<any> => {
    const path = this.basePath + `/prendas`;
    return this.http.get<any>(path).pipe(map((res) => res));
  }

}
