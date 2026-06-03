import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, signal, DestroyRef, inject } from '@angular/core';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserResponse, UserRequest } from '../models/user.model';

@Component({
  selector: 'app-show-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './show-user.html',
  styleUrl: './show-user.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowUser implements OnInit {
  private _user = inject(User);
  private destroyRef = inject(DestroyRef);

  userList = signal<UserResponse[]>([]);
  selectedUser = signal<UserResponse | null>(null);

  ngOnInit(): void {
    this.userData();
  }

  userData() {
    this._user.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.userList.set(res);
        console.log(this.userList()[0].birthdate);
      });
  }

  openViewModal(user: UserResponse) {
    this.selectedUser.set(user);
  }

  openCreateModal() {
    this.selectedUser.set(null);
  }

  saveUser(userForm: NgForm) {
    const values = userForm.value;
    const user: UserRequest = {
      firstname: values.firstname,
      lastname: values.lastname,
      address: values.address,
      birthdate: new Date(values.birthdate).toISOString().split('T')[0],
      isActive: true,
    };

    // debugger;
    this._user.createUser(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log('User saved successfully:', res);
          this.userData();
          const closeButton = document.querySelector('#addModal .btn-close') as HTMLElement;
          if (closeButton) {
            closeButton.click();
          }
        },
        error: (err) => {
          console.error('Error saving user:', err);
        }
      });
  }
}
