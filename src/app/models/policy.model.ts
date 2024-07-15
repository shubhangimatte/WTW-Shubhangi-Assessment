export interface Policy {
    policyNumber: number;
    policyHolder: {
      name: string;
      age: number;
      gender: 'Male' | 'Female' | 'Other';
    };
  }