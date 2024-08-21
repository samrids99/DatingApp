import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;
  newHobby : string | undefined;

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
  }

  addHobby(hobby: string) {
    if (!this.user || !hobby) return;
  
    // Ensure member is fetched correctly
    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        // Initialize hobbies if not present
        if (!member.hobbies) {
          member.hobbies = [];
        }
  
        // Ensure the hobby is added to the existing array
        if (!member.hobbies.includes(hobby)) {
          member.hobbies.push(hobby);
        }
  
        // Log the data being sent to the server for debugging
        console.log('Data being sent to server:', member);
  
        // Update the member with the new hobbies array
        this.memberService.updateMember(member).subscribe({
          next: _ => {
            // Successfully updated
            this.member = member; // Optionally refresh the member object in the component
            this.toastr.success('Hobby added successfully');
            this.newHobby = ''; // Clear the input field
          },

        });
      },
      error: err => {
        console.error('Failed to fetch member:', err);
        this.toastr.error('Failed to fetch member data.');
      }
    });
  }
  

  removeHobby(index: number) {
    if (!this.user) return;
    var member = this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        member.hobbies.splice(index, 1);
        this.memberService.updateMember(member).subscribe({
          next: _ => {
            this.member = member;
            this.toastr.success('Hobby removed successfully');
          }
        });
      }
    });
  }

}
