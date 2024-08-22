import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { Pagination } from '../../_models/pagination';
import { UserParams } from '../../_models/userParams';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';



@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members: Member[] = []
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 6;
  userParams: UserParams | undefined;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  user: User | undefined;

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.user = user;
          console.log("i have the user", user); 
        }
      }
    });
    this.loadMembers();
  }

  loadMembers() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams)
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }

  }

  toggleNotActive() {
    console.log(this.user);
    if (!this.user) return;

    const newActiveStatus = !this.user.notActive;
  
    if (this.user) {
      this.memberService.setNotActive(newActiveStatus)!.subscribe({
        next: () => {
          if (this.user) {
            this.user.notActive = newActiveStatus;
            console.log("we have liftoff, new status: ", this.user.notActive);
          }
        }, error: error => {
          console.error("failed", error);
        }
      });
    }
  }

  resetFilters() {
    console.log("inside reset filters")
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

}