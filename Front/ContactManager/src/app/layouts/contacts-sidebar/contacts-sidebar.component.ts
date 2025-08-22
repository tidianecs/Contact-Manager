import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-sidebar',
  templateUrl: './contacts-sidebar.component.html',
  styleUrls: ['./contacts-sidebar.component.css']
})
export class ContactsSidebarComponent implements OnInit {
  newContactList: Contact[] = [];
  searchTerm: string = "";

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
      this.loadContacts();
  }

  loadContacts(): void{
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
          this.newContactList = contacts.map(contacts => ({
            ...contacts
          }));
        },
        error: (err) => console.error(err)
      })
  }

  get filteredContacts(): Contact[] {
    return this.newContactList.filter(contact =>
      contact.contactName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
