import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientDetail } from '../models/patient.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  getPatientDetail(id: number): Observable<PatientDetail> {
    // Call API with parameter as LPR and Patient as per requirements
    return this.http.get<PatientDetail>(`${this.apiUrl}/lpr/${id}`);
  }
}
