import { Component, OnInit} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
   
  }


  login(){
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: error => this.toastr.error(error.error) // remove this line once error interceptor problems are fixed
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
