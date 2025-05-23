import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { PatientDetail } from '../../models/patient.model';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patientId!: number;
  patient: PatientDetail | null = null;
  loading = false;
  error = '';
  expandedSuggestions: { [key: string]: boolean } = {
    background: false,
    assessment: false,
    recommendations: false,
    notes: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];
      this.loadPatientDetails();
    });
  }

  loadPatientDetails(): void {
    this.loading = true;
    this.patientService.getPatientDetail(this.patientId)
      .subscribe({
        next: (data) => {
          this.patient = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading patient details. Please try again.';
          this.loading = false;
          console.error('Error loading patient details:', error);
        }
      });
  }

  checkForUpdates(): void {
    this.loadPatientDetails();
  }

  toggleSuggestions(section: 'background' | 'assessment' | 'recommendations' | 'notes'): void {
    // Toggle the suggestions panel for the given section
    this.expandedSuggestions[section] = !this.expandedSuggestions[section];
  }

  openSuggestions(): void {
    // Implement suggestions functionality
    console.log('Open suggestions');
  }

  viewHistory(): void {
    // Redirect to the history page with the current patient ID
    this.router.navigate(['/history', this.patientId]);
  }

  printPatientInfo(): void {
    // Implement print functionality
    window.print();
  }
}
