package com.tidiane.contactManager.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tidiane.contactManager.Entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    
}
