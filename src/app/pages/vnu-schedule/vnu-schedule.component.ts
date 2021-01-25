import {Component, OnInit} from '@angular/core';
import {VnuScheduleService} from './vnu-schedule.service';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-vnu-schedule',
  templateUrl: './vnu-schedule.component.html',
  styleUrls: ['./vnu-schedule.component.css']
})
export class VnuScheduleComponent implements OnInit {
  closeResult = '';

  schedules: Observable<any> = this.vnuScheduleService.getScheduleByStudentId('18020032').pipe(
    map(response => response.data),
    pluck('listSchedule')
  );

  studentInformationForm = this.formBuilder.group({
    studentCode: ''
  });

  ngOnSubmit(): void {
    this.onChangeStudentId(this.studentInformationForm.value.studentCode);
  }

  constructor(
    private vnuScheduleService: VnuScheduleService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
  }

  onChangeStudentId = (studentId) => {
    this.schedules = this.vnuScheduleService.getScheduleByStudentId(studentId).pipe(
      map(response => response.data),
      pluck('listSchedule')
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.schedules.subscribe(data => console.log(data));
  }

}
