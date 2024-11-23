import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private basePath = environment.base + '/api';

  constructor(private http: HttpClient) { }

  list = (): Observable<any> => {
    const path = this.basePath + `/marcas`;
    return this.http.get<any>(path).pipe(map((res) => res));
  }

}
