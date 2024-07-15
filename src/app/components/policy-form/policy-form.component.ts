import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-policy-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatOptionModule
  ],
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit {
  policyForm: FormGroup;
  isEdit: boolean = false;
  policyId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.policyForm = this.fb.group({
      policyId: [{ value: '', disabled: true }],
      policyNumber: ['', Validators.required],
      policyHolder: this.fb.group({
        name: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        gender: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.policyId = params.get('id');
      if (this.policyId) {
        this.isEdit = true;
        this.loadPolicyData(this.policyId);
      }
    });
  }

  loadPolicyData(id: string): void {
    const policiesString = localStorage.getItem('policies');
    const policies: any[] = policiesString ? JSON.parse(policiesString) : [];
    const policy = policies.find(p => p.policyNumber === id);
    if (policy) {
      this.policyForm.patchValue(policy);
    }
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      const formData = this.policyForm.getRawValue();
      if (this.isEdit) {
        this.updatePolicy(formData);
      } else {
        formData.policyId = uuidv4();
        if (this.policyNumberExists(formData.policyNumber)) {
          this.snackBar.open('Policy Number already exists. Please use a unique Policy Number.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.saveToLocalStorage(formData);
          this.snackBar.open('New Policy Added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      }
      this.router.navigate(['/policies']);
    }
  }

  private saveToLocalStorage(data: any): void {
    const policiesString = localStorage.getItem('policies');
    const policies: any[] = policiesString ? JSON.parse(policiesString) : [];
    policies.push(data);
    localStorage.setItem('policies', JSON.stringify(policies));
  }

  private updatePolicy(data: any): void {
    const policiesString = localStorage.getItem('policies');
    const policies: any[] = policiesString ? JSON.parse(policiesString) : [];
    const index = policies.findIndex(p => p.policyNumber === this.policyId);
    if (index !== -1) {
      policies[index] = data;
      localStorage.setItem('policies', JSON.stringify(policies));
    }
  }

  private policyNumberExists(policyNumber: string): boolean {
    const policiesString = localStorage.getItem('policies');
    const policies: any[] = policiesString ? JSON.parse(policiesString) : [];
    return policies.some(p => p.policyNumber === policyNumber);
  }
}
function uuidv4(): any {
  throw new Error('Function not implemented.');
}

