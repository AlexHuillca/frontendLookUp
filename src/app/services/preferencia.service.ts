import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PreferenciaService {
  private basePath = environment.base + '/api';

  constructor(private http: HttpClient) { }

  save = (dato: any): Observable<any> => {
    const path = this.basePath + `/AgregarPreferencia`;
    return this.http.post<any>(path, dato).pipe(map((res) => res));
  }

}
