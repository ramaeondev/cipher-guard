import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WhatsNewComponent } from './whats-new/whats-new.component';
import { CipherUtilityComponent } from './cipher-utility/cipher-utility.component';


export const routes: Routes = [
  { path: '', component: CipherUtilityComponent, title: 'CipherGuard' },
  { path: 'whats-new', component: WhatsNewComponent, title: 'What\'s New' },
  { path: '404', component: NotFoundComponent, title: '404 - Not Found' },
  { path: '**', redirectTo: '/404' }
];