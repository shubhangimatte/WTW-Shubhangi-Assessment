import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, PolicyListComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WTW-angular-project';
}
