import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AssistantQuestion {
  question: string;
  patientId: number;
}

export interface AssistantResponse {
  answer: string;
}

export interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SmartAssistantService {
  private apiUrl = environment.apiUrl;
  private chatHistory: Map<number, ChatMessage[]> = new Map();

  constructor(private http: HttpClient) { }

  askQuestion(question: string, patientId: number): Observable<AssistantResponse> {
    // Call the API and pass the clinical question and patient ID as per requirements
    const payload: AssistantQuestion = { question, patientId };
    return this.http.post<AssistantResponse>(`${this.apiUrl}/assistant`, payload);
  }

  addUserMessage(patientId: number, content: string): void {
    this.addMessage(patientId, 'user', content);
  }

  addAssistantMessage(patientId: number, content: string): void {
    this.addMessage(patientId, 'assistant', content);
  }

  private addMessage(patientId: number, type: 'user' | 'assistant', content: string): void {
    if (!this.chatHistory.has(patientId)) {
      this.chatHistory.set(patientId, []);
    }
    
    const message: ChatMessage = {
      type,
      content,
      timestamp: new Date()
    };
    
    this.chatHistory.get(patientId)?.push(message);
  }

  getChatHistory(patientId: number): ChatMessage[] {
    return this.chatHistory.get(patientId) || [];
  }

  clearChatHistory(patientId: number): void {
    this.chatHistory.set(patientId, []);
  }
}
