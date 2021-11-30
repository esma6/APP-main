import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  PoBreadcrumb,
  PoNotification,
  PoNotificationService,
} from '@po-ui/ng-components';
import {
  PoModalComponent,
  PoStepComponent,
  PoStepperComponent,
} from '@po-ui/ng-components';
import { CEPService } from 'src/app/data/services/cep.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from 'src/app/data/services/web3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'dashboard', link: '/' }, { label: 'Register' }],
  };
  personaType: any;
  step: any = true;
  nextLabelWidget = 'Next';
  previousLabelWidget = 'Previous';
  secondStepLabel: string =
    'No data selected. Go back to the previous step';
  mask: string = '99999-999';
  inputCEP: any;
  loadingRegister: boolean = false;
  cepReturn: Object | undefined;

  registerForm!: FormGroup;
  selectedDocType: any;
  selecteDocConfirm: boolean = false;

  constructor(
    private cep: CEPService,
    private formBuilder: FormBuilder,
    private web3: Web3Service,
    public poNotification: PoNotificationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.checkAccount();
    this.createForm();

  }


  checkAccount(){
    this.web3.producerExists().then((res)=>{
      console.log( res)
      if(!res){
        this.web3.activistExists().then((res)=>{
          console.log( res)
          if(!res){
          return
          }else{
            this.notificationAlertError('This account is already registered as an Activist.');
            this.router.navigate(['dashboard'])
          }
        })
      }else{
        this.notificationAlertError('This account is already registered as a Producer');
        this.router.navigate(['dashboard'])
      }
    })
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      personaType: ['', Validators.required],
      cep: ['', Validators.required],
      document: ['', Validators.required],
      document_type: ['', Validators.required],
      country: ['Brasil', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  selectType(e: any) {
    console.log(e);
    this.personaType = e;

    let persona = this.personaType == 'producer' ? 'Producer' : 'Activist';
    this.secondStepLabel = 'Enter your data from ' + persona;
  }

  selectDocType(e: any) {
    this.selectedDocType = e;
    this.selecteDocConfirm = true;
  }

  searchCEP() {
    console.log(this.inputCEP);
    if (this.inputCEP && this.inputCEP.length == 8) {
      this.loadingRegister = true;
      this.cep.getCEP(this.inputCEP).subscribe((res: any) => {
        this.cepReturn = res;
        this.registerForm.controls['cep'].setValue(res.cep);
        this.registerForm.controls['city'].setValue(res.localidade);
        this.registerForm.controls['state'].setValue(res.uf);
        console.log(this.registerForm.value);
        console.log(res);
        setTimeout(() => {
          this.loadingRegister = false;
        }, 200);
      });
    } else {
      this.notificationAlertError('Enter the zip code correctly');
      return;
    }
  }

  async notificationAlertError(err: any) {
    await this.poNotification.error({ message: err, duration: 3000 });
  }

  async notificationAlertSuccess(msg: string) {
    await this.poNotification.success({ message: msg, duration: 3000 });
  }

  saveForm() {
    console.log(this.registerForm.value);

    this.loadingRegister = true
    if (this.registerForm.controls['personaType'].value == 'PRODUCER') {
      this.web3.addProducer(this.registerForm.value).then((res) => {
        console.log(res);
        this.loadingRegister = false;
        this.notificationAlertSuccess('Registration performed successfully');
        this.router.navigate(['dashboard/inspections'])
      });
    } else {
      this.web3.addActivist(this.registerForm.value).then((res) => {
        console.log(res);
        this.loadingRegister = false;
        this.notificationAlertSuccess('Registration performed successfully');
        this.router.navigate(['dashboard/inspections'])
      });
    }
  }
}
