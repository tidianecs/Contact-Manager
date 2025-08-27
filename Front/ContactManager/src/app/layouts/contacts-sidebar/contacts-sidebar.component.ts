import { Component, OnInit } from '@angular/core';
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
  searchTerm: string = "";
  contact?: Contact;
  contacts$: Observable<Contact[]> | undefined;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$;
  }

  filterContacts(contacts: Contact[]): Contact[] {
    return contacts.filter(contact =>
      contact.contactName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  chooseContact(contactId: number): void{
    if(contactId !== undefined){
      this.contactService.getContact(contactId).subscribe({
        next: (contact) => {
          this.contact = contact;
          this.router.navigate(['/contact', contactId])
        },
        error: (err) => console.error("Error while choosing:", err)
      })
    }
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
