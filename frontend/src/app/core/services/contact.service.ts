import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ContactForm, ContactResponse } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  sendMessage(contactData: ContactForm): Observable<ContactResponse> {
    return this.apiService.post<ContactResponse>('contact', contactData);
  }
}
