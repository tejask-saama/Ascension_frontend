import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SmartAssistantService, ChatMessage } from '../../services/smart-assistant.service';

@Component({
  selector: 'app-smart-assistant',
  templateUrl: './smart-assistant.component.html',
  styleUrls: ['./smart-assistant.component.scss']
})
export class SmartAssistantComponent implements OnInit {
  isExpanded = true;
  currentPatientId: number | null = null;
  question = '';
  chatMessages: ChatMessage[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smartAssistantService: SmartAssistantService
  ) { }

  ngOnInit(): void {
    // Listen for route changes to update current patient ID
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentPatientId();
    });

    // Initial check for patient ID
    this.updateCurrentPatientId();
  }

  private updateCurrentPatientId(): void {
    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 2 && urlSegments[1] === 'patients') {
      const patientId = parseInt(urlSegments[2], 10);
      if (!isNaN(patientId)) {
        this.currentPatientId = patientId;
        this.chatMessages = this.smartAssistantService.getChatHistory(patientId);
      }
    } else {
      this.currentPatientId = null;
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  clearChat(): void {
    if (this.currentPatientId) {
      this.smartAssistantService.clearChatHistory(this.currentPatientId);
      this.chatMessages = [];
    }
  }

  closeAssistant(): void {
    // This method is kept for compatibility but doesn't do anything now
    // since the assistant is always visible
  }

  sendQuestion(): void {
    if (!this.question.trim() || !this.currentPatientId) {
      return;
    }

    const questionText = this.question.trim();
    this.loading = true;

    // Add user message to chat
    this.smartAssistantService.addUserMessage(this.currentPatientId, questionText);
    this.chatMessages = this.smartAssistantService.getChatHistory(this.currentPatientId);
    
    // Clear input
    this.question = '';

    // Get response from API
    this.smartAssistantService.askQuestion(questionText, this.currentPatientId)
      .subscribe({
        next: (response) => {
          // Add assistant message to chat
          this.smartAssistantService.addAssistantMessage(this.currentPatientId!, response.answer);
          this.chatMessages = this.smartAssistantService.getChatHistory(this.currentPatientId!);
          this.loading = false;
          
          // Scroll to bottom of chat
          setTimeout(() => {
            this.scrollToBottom();
          }, 100);
        },
        error: (error) => {
          console.error('Error getting assistant response:', error);
          this.smartAssistantService.addAssistantMessage(
            this.currentPatientId!, 
            'Sorry, I encountered an error. Please try again.'
          );
          this.chatMessages = this.smartAssistantService.getChatHistory(this.currentPatientId!);
          this.loading = false;
        }
      });
  }

  selectSuggestion(suggestion: string): void {
    this.question = suggestion;
    this.sendQuestion();
  }

  private scrollToBottom(): void {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' CST';
  }
}
