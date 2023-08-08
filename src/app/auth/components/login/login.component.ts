import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
