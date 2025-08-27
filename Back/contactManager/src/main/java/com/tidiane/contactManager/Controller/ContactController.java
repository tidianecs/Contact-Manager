package com.tidiane.contactManager.Controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tidiane.contactManager.Entity.Contact;
import com.tidiane.contactManager.Repository.ContactRepository;


@RestController
@RequestMapping("/api/v1")
public class ContactController {
    @Autowired ContactRepository contactRepository;

    @PostMapping("/contacts")
    public Contact createContact(@RequestBody Contact contact){
        return contactRepository.save(contact);
    }

    @GetMapping("/contacts")
    public List<Contact> getContacts(){
        return contactRepository.findAll();
    }

    @GetMapping("/contacts/{id}")
    public Optional<Contact> getcontact(@PathVariable Long id){
        return contactRepository.findById(id);
    }

    @PutMapping("/contacts/{id}")
    public Contact updateContact(@PathVariable Long id, @RequestBody Contact contact){
        return contactRepository.findById(id)
            .map(c -> {
                c.setContactName(contact.getContactName());
                c.setContactEmail(contact.getContactEmail());
                c.setContactPhone(contact.getContactPhone());
                return contactRepository.save(c);
            })
            .orElseThrow(() -> new RuntimeException("Contact not found with id " + id));
    }

    @DeleteMapping("/contacts/{id}")
    public void delContact(@PathVariable Long id){
        contactRepository.deleteById(id);
    }
}
