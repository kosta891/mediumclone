import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/actions';

@Component({
  standalone: true,
  imports: [RouterModule, TopbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'mediumclone';

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
