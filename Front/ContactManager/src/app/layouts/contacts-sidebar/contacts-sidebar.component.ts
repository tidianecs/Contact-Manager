import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/Contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-sidebar',
  templateUrl: './contacts-sidebar.component.html',
  styleUrls: ['./contacts-sidebar.component.css']
})
export class ContactsSidebarComponent implements OnInit {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  searchTerm = '';
  contacts$!: Observable<Contact[]>;
  contact?: Contact;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$;
  }

  filterContacts(contacts: Contact[]): Contact[] {
    const q = this.searchTerm.toLowerCase().trim();
    return contacts.filter(c => c.contactName.toLowerCase().includes(q));
  }

  chooseContact(contactId: number): void {
    if (contactId !== undefined) {
      this.contactService.getContact(contactId).subscribe({
        next: (contact) => {
          this.contact = contact;
          this.router.navigate(['/contact', contactId]);
          this.close.emit();
        },
        error: (err) => console.error('Error while choosing:', err)
      });
    }
  }

  deleteContact(contactId: number, ev?: MouseEvent): void {
    ev?.stopPropagation();
    if (contactId !== undefined) {
      this.contactService.deleteContact(contactId).subscribe({
        next: () => console.log('Contact deleted!'),
        error: (err) => console.error('Error while deleting:', err)
      });
    }
  }

  trackById(_: number, c: Contact) {
    return (c as any).contactId ?? (c as any).id;
  }
}
