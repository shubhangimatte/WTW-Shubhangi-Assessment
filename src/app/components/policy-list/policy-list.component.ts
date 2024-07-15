import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PolicyDetailsDialogComponent } from '../../policy-details-dialog/policy-details-dialog.component';
import { Router } from '@angular/router';

interface PolicyHolder {
  name: string;
  age: number;
  gender: string;
}

interface Policy {
  policyNumber: string;
  policyHolder: PolicyHolder;
}

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Policy>([]);
  columns: string[] = ['policyNumber', 'name', 'age', 'gender', 'actions'];
  columnDefs = [
    { key: 'policyNumber', label: 'Policy Number' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'actions', label: 'Actions' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    const policiesString = localStorage.getItem('policies');
    const policies: Policy[] = policiesString ? JSON.parse(policiesString) : [];
    this.dataSource.data = policies;
  }

  deletePolicy(policyNumber: string, event: Event): void {
    event.stopPropagation();
    const policies = this.dataSource.data.filter(policy => policy.policyNumber !== policyNumber);
    this.dataSource.data = policies;
    localStorage.setItem('policies', JSON.stringify(policies));
    this.snackBar.open('Delete Successful', 'Close', {
      duration: 2000,
    });
  }

  showDetails(policy: Policy): void {
    this.dialog.open(PolicyDetailsDialogComponent, {
      data: policy
    });
  }

  editPolicy(element: any): void {
    this.router.navigate(['edit-policy', element.policyNumber]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
