const express = require('express');
const path = require('path');
const app = express();
const port = 3009;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/ascension-frontend')));

// Serve node_modules for any dependencies
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Sample patient data
const patients = [
  {
    id: 1,
    name: 'Adams, Joey',
    dob: '05/13/1974',
    age: 50,
    gender: 'M',
    mrn: '09876'
  },
  {
    id: 2,
    name: 'Caraway, Lisa',
    dob: '08/24/1968',
    age: 56,
    gender: 'F',
    mrn: '12345'
  },
  {
    id: 3,
    name: 'Miller, Nathan',
    dob: '11/02/1985',
    age: 39,
    gender: 'M',
    mrn: '23456'
  },
  {
    id: 4,
    name: 'Tate, Jamal',
    dob: '03/15/1990',
    age: 35,
    gender: 'M',
    mrn: '34567'
  },
  {
    id: 5,
    name: 'Parker-Jones, Samantha',
    dob: '07/09/1982',
    age: 42,
    gender: 'F',
    mrn: '45678'
  }
];

// Sample patient detail data (LPR)
const patientDetails = {
  1: {
    id: 1,
    name: 'Adams, Joey',
    dob: '05/13/1974',
    age: 50,
    gender: 'M',
    mrn: '09876',
    background: {
      pastMedicalHistory: 'History of GI bleed due to esophageal varices, hypertension, hepatic mass, cirrhosis, HCC, hepatitis C (completed treatment), esophageal banding, appendectomy, tonsillectomy, adenoidectomy. Hospitalized in December 2024 for hemoptysis, during which a 7 cm liver mass and pulmonary nodules (suggestive of metastatic disease) were discovered. Biopsy confirmed metastatic HCC. Discharged on 2L NC continuous. Reined first immunotherapy treatment on 1/13/2025.',
      currentPlanInfo: 'Presented to ED on 1/29/2025 with bloody bowel movements, shortness of breath, and palpitations. Reported using old, unsanitized water in his home oxygen humidifier. ED findings showed significant lactic acidosis, CTA showed no acute GI bleed but showed internal progression of metastatic disease. Admitted for observation. EGD on 1/21/2025 showed no active GI bleeding but required banding of esophageal varices.'
    },
    assessment: {
      vitalSigns: {
        bp: '114/72',
        hr: '88',
        temp: '37 °C (oral)',
        rr: '18',
        o2Saturation: '92% on 4L NC'
      },
      painLevel: 'Current pain level: Not specified in most recent notes, previously reported pain improvement',
      goalPainLevel: 'Not specified',
      abnormalFindings: 'Black, bloody stools. Chronic hemoptysis with small episodes overnight. Course rhonchi in bilateral lower lobes. Labs: Hb 10.3 (low), Hct 32.5% (low), Plts 99 (low), INR 1.6 (high), Lactic 5.2 (critical on 2/26, not repeated)',
      recentPRN: 'Not specified in recent notes',
      fallRating: 'Not specified - assess and document',
      activity: 'Independent ambulation to bathroom with assistance. Independent movement in bed.',
      wounds: 'Not specified. Monitor for post-EGD complications.',
      specimen: 'Sputum, legionella, Strep urine antigen ordered by Pulmonary.',
      ivs: 'Octreotide drip (50 mcg/hr) in NS, LR at 126 mL/hr',
      procedures: 'Recent EGD with banding of esophageal varices',
      diet: 'Not specified',
      npoStatus: 'Advance to full liquid per GI',
      safety: 'Not specified',
      labResults: 'See "Abnormal/pertinent findings."'
    },
    recommendations: {
      shiftGoal: 'Monitor hemodynamic stability, respiratory status (including hemoptysis), and GI bleeding. Maintain oxygen saturation >92%. Manage pain.',
      dayPlan: 'Continue current IV medications. Monitor labs (CBC, coags). Pulmonary recommends continuing Pulmicort and DuoNeb, resuming Trelegy on discharge. Continue Zosyn per ID. Avoid anticoagulation/antiplatelet therapy. GI and Heme/Onc following',
      dischargePlan: 'Destination: Likely discharge tomorrow if stable and cleared by GI and Pulmonary\nNeeds: oxygen, medications (Trelegy, pulmicort, DuoNeb), potential home health services depending on stability and needs assessment. Clarify discharge plan with MD'
    },
    nursesNotes: [
      {
        date: '02/26/2025',
        time: '09:00 CST',
        user: 'Alexis Smith, RN',
        content: 'Pt medically stable, afebrile. Assigned O2 4L/min, ambulating with minimal assistance to bathroom. Continues to have small amounts of hemoptysis when coughing. Denies pain. Received scheduled medications.'
      },
      {
        date: '02/26/2025',
        time: '14:00 CST',
        user: 'Alexis Smith, RN',
        content: 'Pt resting comfortably. Vital signs stable. Respirations even and unlabored with O2 at 4L NC. Pt states he is "feeling much better today." Encouraged use of incentive spirometer. Pulmonary consult completed, recommending continuation of current respiratory treatments.'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Caraway, Lisa',
    dob: '08/24/1968',
    age: 56,
    gender: 'F',
    mrn: '12345',
    background: {
      pastMedicalHistory: 'Type 2 diabetes, hypertension, hyperlipidemia, obesity (BMI 34), history of DVT (2022), osteoarthritis of knees.',
      currentPlanInfo: 'Admitted for elective total knee replacement (right). Pre-op evaluation showed well-controlled diabetes (A1c 6.8%) and hypertension. Surgical procedure completed without complications.'
    },
    assessment: {
      vitalSigns: {
        bp: '132/84',
        hr: '76',
        temp: '36.8 °C (oral)',
        rr: '16',
        o2Saturation: '97% on RA'
      },
      painLevel: 'Current pain level: 4/10 at rest, 6/10 with movement',
      goalPainLevel: '3/10 or less',
      abnormalFindings: 'Expected post-surgical swelling and bruising around right knee. Incision clean and dry with staples intact.',
      recentPRN: 'Oxycodone 5mg PO given at 10:00 for pain (6/10), effective in reducing pain to 3/10.',
      fallRating: 'High fall risk - bed alarm activated, fall precautions in place',
      activity: 'Physical therapy twice daily. Ambulating with walker, weight bearing as tolerated on right leg.',
      wounds: 'Surgical incision right knee, approximately 20cm, clean and dry with staples intact. No signs of infection.',
      specimen: 'None',
      ivs: 'Saline lock in place, right forearm',
      procedures: 'Total knee replacement (right) performed 2/25/2025',
      diet: 'Regular',
      npoStatus: 'N/A',
      safety: 'Fall precautions, bed alarm, call light within reach',
      labResults: 'Hgb 10.2 (slightly decreased from pre-op 12.4), otherwise WNL'
    },
    recommendations: {
      shiftGoal: 'Maintain pain control, prevent complications (DVT, infection), encourage mobility with PT guidelines',
      dayPlan: 'Continue PT twice daily, advance mobility as tolerated. Monitor incision site. Continue DVT prophylaxis. Transition to oral pain management.',
      dischargePlan: 'Anticipated discharge in 1-2 days if meeting PT goals. Will need home health PT, DME (walker), and outpatient PT follow-up.'
    },
    nursesNotes: [
      {
        date: '02/26/2025',
        time: '08:30 CST',
        user: 'Maria Rodriguez, RN',
        content: 'Patient resting comfortably. Reports pain at 4/10 at rest. Incision clean and dry. Completed morning PT session with good participation. Ambulated 50 feet with walker. Vital signs stable.'
      }
    ]
  },
  3: {
    id: 3,
    name: 'Miller, Nathan',
    dob: '11/02/1985',
    age: 39,
    gender: 'M',
    mrn: '23456',
    background: {
      pastMedicalHistory: 'Crohn\'s disease (diagnosed 2015), anxiety, seasonal allergies',
      currentPlanInfo: 'Admitted for Crohn\'s flare with severe abdominal pain, diarrhea (10+ episodes daily), and low-grade fever. Not responding to outpatient management with oral steroids.'
    },
    assessment: {
      vitalSigns: {
        bp: '118/70',
        hr: '92',
        temp: '37.2 °C (oral)',
        rr: '18',
        o2Saturation: '98% on RA'
      },
      painLevel: 'Current pain level: 3/10 (improved from 8/10 at admission)',
      goalPainLevel: '0-2/10',
      abnormalFindings: 'Mild abdominal tenderness in right lower quadrant. Bowel movements reduced to 4-5 per day, less bloody than at admission.',
      recentPRN: 'Hydromorphone 0.5mg IV given at 06:00 for abdominal cramping',
      fallRating: 'Low fall risk',
      activity: 'Ambulatory, independent',
      wounds: 'None',
      specimen: 'Stool for C. diff (pending), blood cultures (negative at 48 hours)',
      ivs: 'PICC line right arm - receiving TPN and IV methylprednisolone',
      procedures: 'Colonoscopy scheduled for tomorrow',
      diet: 'NPO after midnight for procedure',
      npoStatus: 'Clear liquids today, NPO after midnight',
      safety: 'Standard precautions',
      labResults: 'CRP 8.2 (improved from 15.4 at admission), Hgb 11.2, WBC 10.8'
    },
    recommendations: {
      shiftGoal: 'Maintain comfort, monitor bowel movements, prepare for colonoscopy',
      dayPlan: 'Continue IV steroids, TPN, clear liquid diet transitioning to NPO. Ensure patient understands colonoscopy prep instructions.',
      dischargePlan: 'Will depend on colonoscopy findings. GI considering starting biologic therapy.'
    },
    nursesNotes: [
      {
        date: '02/26/2025',
        time: '10:15 CST',
        user: 'James Wilson, RN',
        content: 'Patient reports feeling "much better than yesterday." Abdominal pain controlled at 3/10. Had 2 loose bowel movements this shift with minimal blood. Tolerating clear liquids. PICC line site clean, no signs of infection. Reviewed colonoscopy prep instructions.'
      }
    ]
  },
  4: {
    id: 4,
    name: 'Tate, Jamal',
    dob: '03/15/1990',
    age: 35,
    gender: 'M',
    mrn: '34567',
    background: {
      pastMedicalHistory: 'Sickle cell disease, asthma, history of acute chest syndrome (last episode 2023)',
      currentPlanInfo: 'Admitted for vaso-occlusive crisis with severe pain in back and legs. Also reporting mild shortness of breath.'
    },
    assessment: {
      vitalSigns: {
        bp: '126/78',
        hr: '88',
        temp: '37.1 °C (oral)',
        rr: '20',
        o2Saturation: '95% on 2L NC'
      },
      painLevel: 'Current pain level: 6/10 (improved from 9/10 at admission)',
      goalPainLevel: '3/10 or less',
      abnormalFindings: 'Mild respiratory distress, diminished breath sounds at bases. Tenderness in lower back and bilateral legs.',
      recentPRN: 'Hydromorphone 1mg IV given at 09:30 for pain (7/10)',
      fallRating: 'Moderate fall risk',
      activity: 'Bed rest with bathroom privileges, requires assistance',
      wounds: 'None',
      specimen: 'Blood cultures (pending), sputum culture (pending)',
      ivs: 'Peripheral IV right forearm - receiving IV fluids and pain medication',
      procedures: 'Chest X-ray completed this morning, results pending',
      diet: 'Regular',
      npoStatus: 'N/A',
      safety: 'Fall precautions',
      labResults: 'Hgb 7.2 (baseline 8-9), WBC 12.4, platelets 350, reticulocyte count 12%'
    },
    recommendations: {
      shiftGoal: 'Pain management, prevent acute chest syndrome, maintain hydration',
      dayPlan: 'Continue IV fluids at 125ml/hr, incentive spirometry q2h while awake, pain management per protocol. Monitor for signs of acute chest syndrome.',
      dischargePlan: 'Will likely need 3-5 days of inpatient management before discharge consideration'
    },
    nursesNotes: [
      {
        date: '02/26/2025',
        time: '11:00 CST',
        user: 'Tasha Brown, RN',
        content: 'Patient experiencing moderate pain despite IV pain medication. Reports pain at 6/10 in lower back and legs. Encouraging use of incentive spirometry. Maintaining oxygen at 2L NC with sats 95%. Pushing oral fluids, IV fluids continuing at 125ml/hr.'
      }
    ]
  },
  5: {
    id: 5,
    name: 'Parker-Jones, Samantha',
    dob: '07/09/1982',
    age: 42,
    gender: 'F',
    mrn: '45678',
    background: {
      pastMedicalHistory: 'Bipolar disorder, hypothyroidism, migraine headaches, GERD',
      currentPlanInfo: 'Admitted following suicide attempt by medication overdose (acetaminophen, lorazepam). Found by roommate approximately 2 hours after ingestion. NAC protocol initiated in ED.'
    },
    assessment: {
      vitalSigns: {
        bp: '110/68',
        hr: '72',
        temp: '36.5 °C (oral)',
        rr: '16',
        o2Saturation: '99% on RA'
      },
      painLevel: 'Current pain level: 2/10 (headache)',
      goalPainLevel: '0/10',
      abnormalFindings: 'Mildly elevated liver enzymes (improving). Alert and oriented x3, affect flat.',
      recentPRN: 'Ondansetron 4mg IV given at 08:00 for nausea',
      fallRating: 'Low fall risk',
      activity: 'Up ad lib',
      wounds: 'None',
      specimen: 'None',
      ivs: 'Peripheral IV left forearm - NAC infusion completing final dose',
      procedures: 'None',
      diet: 'Regular',
      npoStatus: 'N/A',
      safety: '1:1 observation, suicide precautions',
      labResults: 'AST 62 (down from 120), ALT 78 (down from 150), acetaminophen level undetectable'
    },
    recommendations: {
      shiftGoal: 'Complete NAC protocol, maintain safety, psychiatric evaluation',
      dayPlan: 'Complete final dose of NAC, repeat LFTs this afternoon, psychiatric consultation today',
      dischargePlan: 'Will require inpatient psychiatric admission once medically cleared'
    },
    nursesNotes: [
      {
        date: '02/26/2025',
        time: '09:45 CST',
        user: 'David Chen, RN',
        content: '1:1 observation maintained. Patient quiet and withdrawn but cooperative with care. Final dose of NAC infusing without complications. Denies current suicidal ideation but states "I just don\'t want to feel this way anymore." Psychiatric consultation scheduled for 13:00.'
      }
    ]
  }
};

// API endpoint to get all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// API endpoint to get patient LPR data
app.get('/api/lpr/:patientId', (req, res) => {
  const patientId = parseInt(req.params.patientId);
  const patientDetail = patientDetails[patientId];
  
  if (patientDetail) {
    res.json(patientDetail);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

// API endpoint for smart assistant questions
app.post('/api/assistant', (req, res) => {
  const { question, patientId } = req.body;
  
  if (!question || !patientId) {
    return res.status(400).json({ error: 'Question and patientId are required' });
  }
  
  // Check if patient exists
  const patient = patientDetails[patientId];
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  
  // Generate response based on question and patient
  let answer = '';
  
  // For demo purposes, we'll provide specific responses for patient 1 (Joey Adams)
  if (patientId === 1) {
    if (question.toLowerCase().includes('admit') || question.toLowerCase().includes('admission')) {
      answer = `The patient, Joey Adams, was admitted to Ascension St. Vincent St. John's emergency department on Feb 26, 2025 due to bloody bowel movements, shortness of breath, and heart palpitations [History and Physical, Feb 26]. He also reported chronic hemoptysis [History and Physical, Feb 26]. A significant lactic acidosis was found in the ED [History and Physical, Feb 26].`;
    } else if (question.toLowerCase().includes('medication') || question.toLowerCase().includes('med')) {
      answer = `Several notes list the patient's active medications, and they vary slightly between notes. It's important to reconcile these with the most up-to-date MAR. Here's a summary from the available notes:

**Pulmonology Process Note [Feb 26]:** This note lists 10 active medications

Scheduled: albuterol-ipratropium nebulizer q6h, budesonide nebulizer bid, pantoprazole IV q12h, phytonadione subQ daily, piperacillin-tazobactam IV q8h

Continuous: lactated ringers IV at 126 mL/hr octreotide IV at 50 mcg/hr (in sodium chloride 0.9%)

PRN: alum-mag-sim (Mylanta II) oral q4h, ondansetron IV q6h, polyethylene glycol 3350 oral daily

General medicine and heme/ onc progress notes [both Feb 26]. These notes list 9 active medications, omitting the lactated ringers continuous IV infusion. Otherwise, the medications are the same as in the Pulmonology note.

General Medicine Progress Note [Feb 26]: This note lists inpatient medications as lactated ringers IV, aalo/Mylanta oral PRN q4h, MiraLAX oral daily PRN, ondansetron IV PRN q6h, and Zosyn. Home medications are listed as benzoate, ondansetron, and traMADol. This note predates the other progress notes and likely reflects medications ordered upon admission before consultations.`;
    } else if (question.toLowerCase().includes('vital') || question.toLowerCase().includes('vital sign')) {
      answer = `The patient's latest vital signs are:
BP: 114/72
HR: 88
Temp: 37 °C (oral)
RR: 18
O₂ Saturation: 92% on 4L NC`;
    } else if (question.toLowerCase().includes('lab') || question.toLowerCase().includes('result')) {
      answer = `The patient's abnormal lab results include:
Hb 10.3 (low)
Hct 32.5% (low)
Plts 99 (low)
INR 1.6 (high)
Lactic 5.2 (critical on 2/26, not repeated)`;
    } else if (question.toLowerCase().includes('order')) {
      answer = `Current provider orders include:
- Octreotide drip at 50 mcg/hr
- Lactated Ringers at 126 mL/hr
- Respiratory treatments including nebulizers
- Sputum, legionella, and Strep urine antigen tests ordered by Pulmonary
- Advance to full liquid diet per GI
- Continue Pulmicort and DuoNeb
- Continue Zosyn per ID
- Avoid anticoagulation/antiplatelet therapy`;
    } else {
      answer = `I don't have specific information about that question for Joey Adams. The patient has a history of GI bleed, hemoptysis, and metastatic HCC. He was admitted for bloody bowel movements, shortness of breath, and palpitations. Recent EGD showed no active bleeding but required banding of esophageal varices. Please check the patient's chart for more detailed information.`;
    }
  } else {
    // Generic response for other patients
    answer = `I don't have specific information about that question for this patient. Please check the patient's chart for more detailed information.`;
  }
  
  res.json({ answer });
});

// Serve the demo.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

// Catch all other routes and return the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ascension-frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Nurse Handoff Tool running at http://localhost:${port}`);
});
