import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/Contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-sidebar',
  templateUrl: './contacts-sidebar.component.html',
  styleUrls: ['./contacts-sidebar.component.css']
})
export class ContactsSidebarComponent implements OnInit {
  searchTerm: string = "";
  contact?: Contact;
  contacts$: Observable<Contact[]> | undefined;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$;
  }

  filterContacts(contacts: Contact[]): Contact[] {
    return contacts.filter(contact =>
      contact.contactName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  deleteContact(contactId: number): void{
    if (contactId !== undefined) {
      this.contactService.deleteContact(contactId).subscribe({
        next: () => console.log("Contact deleted!"),
        error: (err) => console.error("Error while deleting:", err)
      });
    }
  }
}
