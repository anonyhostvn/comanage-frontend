import {Component, OnInit} from '@angular/core';
import {VnuScheduleService} from './vnu-schedule.service';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

const googleLoginOptions = {
  scope: ['https://www.googleapis.com/auth/calendar']
};

@Component({
  selector: 'app-vnu-schedule',
  templateUrl: './vnu-schedule.component.html',
  styleUrls: ['./vnu-schedule.component.css']
})
export class VnuScheduleComponent implements OnInit {
  closeResult = '';
  isLoading = false;

  schedules$: Observable<any> = null;

  listTerm$: Observable<any> = this.vnuScheduleService.getAllTerm().pipe(
    map(response => response.data),
    pluck('vnuTermList')
  );

  studentInformationForm = this.formBuilder.group({
    studentCode: '',
    termId: '0'
  });

  ngSignInWithGoogle = (): void => {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => console.log(data)).catch(err => console.log(err));
  }

  ngOnSubmit(): void {
    const {studentCode, termId} = this.studentInformationForm.value;
    this.onChangeStudentId(studentCode, termId);
  }

  constructor(
    private vnuScheduleService: VnuScheduleService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: SocialAuthService
  ) {}

  onChangeStudentId = (studentId, termId) => {
    this.isLoading = true;
    this.schedules$ = this.vnuScheduleService.getScheduleByStudentId(studentId, termId).pipe(
      map(response => {
        this.isLoading = false;
        return response.data
      }),
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
  }

}
