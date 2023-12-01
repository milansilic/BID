import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderFile } from 'src/app/components/orders/orders.model';
import { OrdersService } from 'src/app/components/orders/orders.service';

@Component({
  selector: 'add-files-modal',
  templateUrl: './add-files-modal.component.html',
  styleUrls: ['./add-files-modal.component.scss']
})
export class AddFilesModalComponent {

  @Output() closeModalEvnt = new EventEmitter<any>();
  @Output() sendObjectEvent = new EventEmitter<any>();
  @Input() selectedFile: OrderFile = new OrderFile();
  fileForm: UntypedFormGroup;
  showFileAddedMsg: boolean = false;
  orderFile = new OrderFile();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) { }

  get f() { return this.fileForm.controls; }

  ngOnInit(): void {

    if (!this.selectedFile) {
      this.selectedFile = new OrderFile();
    }

    this.fileForm = this.formBuilder.group({
      fileName: [this.selectedFile?.name, Validators.required]
    });
  }

  uploadProfilePhoto(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // temp added file name, should be removed as query param from backend
      this.orderService.uploadDocument(file, 'test')
        .subscribe((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.showFileAddedMsg = true;
            this.selectedFile = event.body;
            //extract file extension from file
            this.selectedFile.type = file.name.split('.').pop();
          }
        })

    }
  }

  submitCompanyInfo() {
    this.fileForm.markAllAsTouched();

    if (this.fileForm.invalid) {
      return;
    }

    this.selectedFile.name = this.fileForm.value.fileName;

    if (this.selectedFile.urlWithSASToken) {
      this.sendFileObject(this.selectedFile);
    } else {
      this.toastr.error("Please upload file before saving.");
    }
  }

  closeModal(value: any) {
    this.closeModalEvnt.emit();
  }

  sendFileObject(value: any) {
    this.sendObjectEvent.emit(value);
    this.closeModalEvnt.emit();
  }
}
