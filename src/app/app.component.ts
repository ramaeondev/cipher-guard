import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatListModule, MatSidenavModule, MatToolbarModule],
})
export class AppComponent {
  title: WritableSignal<string> = signal('CipherGuard'); // Writable Signal
  plainText: WritableSignal<string> = signal(''); // Writable Signal for text input
  encryptedText: WritableSignal<string> = signal(''); // Writable Signal for encryption result
  decryptedText: WritableSignal<string> = signal(''); // Writable Signal for decryption result
  secretKey: WritableSignal<string> = signal(''); // Writable Signal for secret key
  selectedMethod: WritableSignal<string> = signal('AES'); // Default to AES

  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-style'],
    });
  }

  encrypt() {
    if (!this.plainText() || !this.secretKey()) {
      this.showToast('⚠️ Please enter both text and secret key!', 'OK');
      return;
    }
    const encrypted = CryptoJS.AES.encrypt(this.plainText(), this.secretKey()).toString();
    this.encryptedText.set(encrypted); // Update writable signal
    this.showToast('✅ Text encrypted successfully!', 'OK');
  }

  decrypt() {
    if (!this.encryptedText() || !this.secretKey()) {
      this.showToast('⚠️ Please enter encrypted text and secret key!', 'OK');
      return;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(this.encryptedText(), this.secretKey());
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        throw new Error('Invalid key!');
      }
      this.decryptedText.set(decrypted); // Update writable signal
      this.showToast('🔓 Decryption successful!', 'OK');
    } catch (error) {
      this.showToast('❌ Decryption failed! Check your secret key.', 'OK');
      this.decryptedText.set('');
    }
  }

  readInput(event: Event, from: string) {
    const target = event.target as HTMLInputElement;
    if (from === 'textArea') {
      this.plainText.set(target.value); // Update writable signal
    } else if (from === 'password') {
      this.secretKey.set(target.value); // Update writable signal
    } 
  }

  selectMethod(method: string) {
    this.selectedMethod.set(method);
  }
}