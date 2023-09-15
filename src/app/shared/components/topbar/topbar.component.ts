import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthStateFacade } from 'src/app/auth/store/facade';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-topbar',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  providers: [AuthStateFacade],
})
export class TopbarComponent {
  data$ = combineLatest({
    currentUser: this.authStateFacade.currentUser$,
  });

  constructor(private authStateFacade: AuthStateFacade) {}
}
