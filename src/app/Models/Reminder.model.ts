export class Reminder {
    title: string = '';
    description: string = '';
    email: string = '';
    phone: string = '';
    dateTime: Date = new Date();
    repeat: string = 'none';
    priority: string = 'medium';
    notificationPreferences: string[] = [];
    location: string = '';
    notes: string = '';
    attachments: string[] = [];
    calendarIntegration: boolean = false;
    smartSuggestions: boolean = false;
    customizableThemes: boolean = false;
    collaborationFeatures: boolean = false;
  }
  