import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-details-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './policy-details-dialog.component.html',
  styleUrl: './policy-details-dialog.component.scss'
})
export class PolicyDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
