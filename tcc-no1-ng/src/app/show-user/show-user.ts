import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, signal, DestroyRef, inject } from '@angular/core';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-show-user',
  imports: [CommonModule],
  templateUrl: './show-user.html',
  styleUrl: './show-user.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowUser implements OnInit {
  private _user = inject(User);
  private destroyRef = inject(DestroyRef);

  userList = signal<any[]>([]);

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
}
