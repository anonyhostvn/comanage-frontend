import {Component, OnInit} from '@angular/core';
import {VnuScheduleService} from './vnu-schedule.service';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';

@Component({
  selector: 'app-vnu-schedule',
  templateUrl: './vnu-schedule.component.html',
  styleUrls: ['./vnu-schedule.component.css']
})
export class VnuScheduleComponent implements OnInit {

  schedules: Observable<any> = this.vnuScheduleService.getScheduleByStudentId('18020032').pipe(
    map(response => response.data),
    pluck('listSchedule')
  );

  constructor(
    private vnuScheduleService: VnuScheduleService
  ) { }

  ngOnInit(): void {
    this.schedules.subscribe(data => console.log(data));
  }

}
