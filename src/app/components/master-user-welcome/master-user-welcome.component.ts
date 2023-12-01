import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CompanyModel } from './master-user-welcome.model';
import { CompanyService } from './master-user-welcome.service';

@Component({
  selector: 'master-user-welcome',
  templateUrl: './master-user-welcome.component.html',
  styleUrls: ['./master-user-welcome.component.scss']
})
export class MasterUserWelcomeComponent implements OnInit {
  createCompanyForm: UntypedFormGroup;
  createCompanyModel = new CompanyModel();
  spinner = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) { }

  get f() { return this.createCompanyForm.controls; }

  ngOnInit(): void {
    this.createCompanyModel = new CompanyModel();
    this.createCompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      address: ['', Validators.required],
      bankName: ['', Validators.required],
      bankAccount: ['', Validators.required],
      vat: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      phone: ['', Validators.required],
      phone2: ['', Validators.required],
      email: ['', Validators.required],
      webSiteUrl: ['', Validators.required],
      ceoInfoPhone: ['', Validators.required],
      cellPhone: ['', Validators.required],
      ceoInfoEmail: ['', Validators.required],
    });
  }

  uploadedFile(event) {
    console.log(event);
  }

  uploadProfilePhoto(files: FileList) {
    this.companyService.uploadProfilePhoto(files[0])
      .subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
        // this.createCompanyModel.general.logoUrl = response;
        // this.toastr.success("Profile photo uploaded successfully.");
      })
  }

  submitCompanyInfo() {
    this.createCompanyForm.markAllAsTouched();

    if (this.createCompanyForm.invalid) {
      return;
    }

    this.createCompanyModel.general.name = this.createCompanyForm.value.name;
    this.createCompanyModel.general.country = this.createCompanyForm.value.country;
    this.createCompanyModel.general.city = this.createCompanyForm.value.city;
    this.createCompanyModel.general.postalCode = this.createCompanyForm.value.postalCode;
    this.createCompanyModel.general.bankName = this.createCompanyForm.value.bankName;
    this.createCompanyModel.general.address = this.createCompanyForm.value.address;
    this.createCompanyModel.general.bankAccount = this.createCompanyForm.value.bankAccount;
    this.createCompanyModel.general.vat = this.createCompanyForm.value.vat;
    this.createCompanyModel.general.identificationNumber = this.createCompanyForm.value.identificationNumber;
    this.createCompanyModel.general.phone = this.createCompanyForm.value.phone;
    this.createCompanyModel.general.phone2 = this.createCompanyForm.value.phone2;
    this.createCompanyModel.general.email = this.createCompanyForm.value.email;
    this.createCompanyModel.general.webSiteUrl = this.createCompanyForm.value.webSiteUrl;
    this.createCompanyModel.general.logoUrl = this.createCompanyForm.value.logoUrl;

    this.createCompanyModel.ceoInfo.phone = this.createCompanyForm.value.ceoInfoPhone;
    this.createCompanyModel.ceoInfo.cellPhone = this.createCompanyForm.value.cellPhone;
    this.createCompanyModel.ceoInfo.email = this.createCompanyForm.value.ceoInfoEmail;

    this.companyService.createCompany(this.createCompanyModel)
      .subscribe({
        next: (_response) => {
          // this.router.navigate(['/check-mail']);
        }, error: () => {

        }
      });
  }

}
