import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getApiUrls } from '../Apis.ts/NewsApis';

@Injectable({
  providedIn: 'root'
})
export class TrendService {

  constructor(private http: HttpClient) { }

  getTeslaNews(): Observable<any> {
    return this.http.get<any>(getApiUrls().newsApiUrl);
  }



  getGuardianNews(): Observable<any> {
    return this.http.get<any>(getApiUrls().guardianApiUrl);
  }
}