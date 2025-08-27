import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './layouts/contact-form/contact-form.component';
import { ContactInfosComponent } from './layouts/contact-infos/contact-infos.component';

const routes: Routes = [
  { path: '', component: ContactFormComponent },
  { path: 'contact/:contactId', component: ContactInfosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
