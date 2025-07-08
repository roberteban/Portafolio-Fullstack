export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface Contact extends ContactForm {
  _id?: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}