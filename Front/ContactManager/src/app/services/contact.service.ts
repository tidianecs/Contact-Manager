import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Contact } from '../models/Contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = "http://localhost:8080/api/v1";
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadContacts();
  }

  loadContacts(): void {
    this.http.get<Contact[]>(`${this.apiUrl}/contacts`).subscribe({
      next: (contacts) => this.contactsSubject.next(contacts),
      error: (err) => console.error(err)
    });
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact).pipe(
      tap(() => this.loadContacts())
    );
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`);
  }

  updateContact(id: number, contactToUpd: Contact):Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/contacts/${id}`, contactToUpd).pipe(
      tap(() => this.loadContacts())
    );
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contacts/${id}`).pipe(
      tap(() => this.loadContacts())
    );
  }
}
