import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {host, externalContext, getScheduleEndpoint, scheduleContext} from './vnu-schedule.const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnuScheduleService {

  schedule = {}

  constructor(
    private http: HttpClient
  ) {
  }

  getScheduleByStudentId(studentCode: string): Observable<any> {
    return this.http.get(`${host}${externalContext}${scheduleContext}${getScheduleEndpoint}?studentCode=${studentCode}`, {});
  }
}
