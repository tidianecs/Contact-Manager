// contact-infos.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/Contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-infos',
  templateUrl: './contact-infos.component.html',
  styleUrls: ['./contact-infos.component.css']
})
export class ContactInfosComponent implements OnInit, OnDestroy {
  contact?: Contact;
  routeSub?: Subscription;

  isEditing = false;
  editForm!: FormGroup;

  constructor(private route: ActivatedRoute, private contactService: ContactService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(() => {
      const id = Number(this.route.snapshot.paramMap.get('contactId'));
      if (id) {
        this.contactService.getContact(id).subscribe({
          next: (contact) => {
            this.contact = contact;
            this.buildForm(contact);
          },
          error: (err) => console.error('Error while loading the contact: ', err),
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  buildForm(c: Contact) {
    this.editForm = this.fb.group({
      contactName: [c.contactName],
      contactEmail: [c.contactEmail],
      contactPhone: [c.contactPhone]
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.contact) {
      this.editForm.patchValue({
        contactName: this.contact.contactName,
        contactEmail: this.contact.contactEmail,
        contactPhone: this.contact.contactPhone
      });
    }
  }

  save() {
    if (!this.contact || this.editForm.invalid) return;

    const payload: Contact = {
      ...this.contact,
      ...this.editForm.value
    };

    // @ts-ignore: assure-toi que ton modèle a l'ID correct (contactId ou id)
    const id = (this.contact.contactId ?? this.contact.id) as number;

    this.contactService.updateContact(id, payload).subscribe({
      next: (updated) => {
        this.contact = updated;
        this.isEditing = false;   
      },
      error: (err) => console.error('Update error:', err)
    });
  }

  cancel() {
    this.isEditing = false;
    if (this.contact) this.buildForm(this.contact);
  }
}
