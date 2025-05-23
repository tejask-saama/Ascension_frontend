# Ascension Nurse Handoff Tool

A web-based application for nurses to manage patient handoffs, view patient details, and use a smart assistant for clinical questions.

## Features

- Login screen with dummy credentials (user/user)
- Patient list with 5 sample patients
- Detailed patient view with:
  - Background information
  - Assessment data
  - Recommendations
  - Nurses' notes
- Smart Assistant for asking clinical questions about patients
- API integration for LPR (Longitudinal Patient Record) data
- API integration for clinical questions

## Project Structure

```
ascension-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── patient-list/
│   │   │   ├── patient-detail/
│   │   │   └── smart-assistant/
│   │   ├── services/
│   │   ├── models/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   └── styles.scss
├── angular.json
├── package.json
├── server.js
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. Set up the project (install dependencies and build):
   ```
   npm run full-setup
   ```

   Or install dependencies only:
   ```
   npm run setup
   ```

2. Build the Angular application:
   ```
   npm run build
   ```

3. Start the server:
   ```
   npm start
   ```

4. Or build and start in one command:
   ```
   npm run build-and-start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```

5. Login with the following credentials:
   - Username: user
   - Password: user

## Usage

1. After logging in, you'll see a list of patients.
2. Click on a patient (preferably "Adams, Joey" for the full demo) to view their details.
3. Use the Smart Assistant in the top right corner to ask clinical questions about the selected patient.

## API Endpoints

- `/api/patients` - Get list of all patients
- `/api/lpr/:patientId` - Get LPR data for a specific patient
- `/api/assistant` - POST endpoint for Smart Assistant questions
