import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = "http://localhost:8080/api/v1";
  constructor(private http: HttpClient) {}

  addContact(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact);
  }

  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  getContact(id: number): Observable<Contact>{
    return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`);
  }

  deleteContact(id: number){
    return this.http.delete(`${this.apiUrl}/contacts/${id}`);
  }

}
