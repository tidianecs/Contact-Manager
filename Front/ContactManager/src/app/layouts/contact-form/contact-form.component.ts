import { Component } from '@angular/core';
import { Contact } from 'src/app/models/Contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  newContact: Contact = {
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  }

  constructor(private contactService: ContactService){}

  onSubmit() {
    if (this.newContact) {
      this.contactService.addContact(this.newContact).subscribe({
        next: (res) => {
          console.log("Contact added:", res);
          this.newContact = { contactName: '', contactEmail: '', contactPhone: '' };
        },
        error: (err) => {
          console.error("Error while creating contact:", err);
        }
      });
    }
  }
}
