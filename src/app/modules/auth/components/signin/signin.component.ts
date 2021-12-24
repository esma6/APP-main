import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/data/services/event.service';
import { Web3Service } from 'src/app/data/services/web3.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private web3:Web3Service,private router:Router) { }

  background ='src/assets/img/sintrop_login_back.jpg'
  ngOnInit(): void {


    EventService.get('accountStatus').subscribe((data) => {
      console.log(data);
      if (data) {
        this.router.navigate(['dashboard']);
      }else{
        return
      }
    });
  }


  logar(){
    this.web3.loadWeb3()
}
}
