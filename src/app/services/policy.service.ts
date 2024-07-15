import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from '../models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:5001/api/policy';

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.apiUrl);
  }

  getPolicy(policyNumber: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/${policyNumber}`);
  }

  addPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.apiUrl, policy);
  }

  updatePolicy(policy: Policy): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${policy.policyNumber}`, policy);
  }

  deletePolicy(policyNumber: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${policyNumber}`);
  }
  
}
