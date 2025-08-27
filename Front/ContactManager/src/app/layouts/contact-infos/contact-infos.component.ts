import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/Contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-infos',
  templateUrl: './contact-infos.component.html',
  styleUrls: ['./contact-infos.component.css']
})
export class ContactInfosComponent implements OnInit, OnDestroy{
  contact?: Contact;
  routeSub?: Subscription;

  constructor(private route: ActivatedRoute, private contactService: ContactService){}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = Number(this.route.snapshot.paramMap.get('contactId'));
      if (id) {
        this.contactService.getContact(id).subscribe({
          next: (contact) => this.contact = contact,
          error: (err) => console.error("Error while loading the contact: ", err)
        });
      }
    })
  }

  ngOnDestroy(): void {
      this.routeSub?.unsubscribe();
  }
}
