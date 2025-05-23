export interface Patient {
  id: number;
  name: string;
  dob: string;
  age: number;
  gender: string;
  mrn: string;
}

export interface PatientDetail extends Patient {
  background: {
    pastMedicalHistory: string;
    currentPlanInfo: string;
  };
  assessment: {
    vitalSigns: {
      bp: string;
      hr: string;
      temp: string;
      rr: string;
      o2Saturation: string;
    };
    painLevel: string;
    goalPainLevel: string;
    abnormalFindings: string;
    recentPRN: string;
    fallRating: string;
    activity: string;
    wounds: string;
    specimen: string;
    ivs: string;
    procedures: string;
    diet: string;
    npoStatus: string;
    safety: string;
    labResults: string;
  };
  recommendations: {
    shiftGoal: string;
    dayPlan: string;
    dischargePlan: string;
  };
  nursesNotes: NurseNote[];
}

export interface NurseNote {
  date: string;
  time: string;
  user: string;
  content: string;
}
