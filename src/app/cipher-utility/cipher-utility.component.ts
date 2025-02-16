import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BuildInfoService } from '../../services/build-info.service';

@Component({
  selector: 'app-cipher-utility',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatListModule, MatSidenavModule, MatToolbarModule,RouterModule],
  templateUrl: './cipher-utility.component.html',
  styleUrl: './cipher-utility.component.scss'
})
export class CipherUtilityComponent {
    title: WritableSignal<string> = signal('CipherGuard');
    plainText: WritableSignal<string> = signal('');
    encryptedText: WritableSignal<string> = signal('');
    decryptedText: WritableSignal<string> = signal('');
    secretKey: WritableSignal<string> = signal('');
    hashResult: WritableSignal<string> = signal('');
    selectedMethod: WritableSignal<string> = signal('AES');
    version: WritableSignal<string> = signal('');
    lastBuild: WritableSignal<string> = signal('');
  
    encryptionMethods = [
      { name: 'AES', label: 'AES Encryption/Decryption' },
      { name: 'DES', label: 'DES Encryption/Decryption' },
      { name: '3DES', label: '3DES Encryption/Decryption' },
      { name: 'Rabbit', label: 'Rabbit Encryption/Decryption' },
      { name: 'RC4', label: 'RC4 Encryption/Decryption' },
      { name: 'MD5', label: 'MD5 Hashing' },
      { name: 'SHA-1', label: 'SHA-1 Hashing' },
      { name: 'SHA-256', label: 'SHA-256 Hashing' },
      { name: 'SHA-512', label: 'SHA-512 Hashing' },
      { name: 'HMAC-SHA256', label: 'HMAC-SHA256 Hashing' }
    ];
  
    constructor(private snackBar: MatSnackBar, private clipboard: Clipboard, public buildInfoService: BuildInfoService) {
      this.version.set(buildInfoService.version());
      this.lastBuild.set(buildInfoService.lastBuild());
    }
  
    showToast(message: string, action: string = 'Close', duration: number = 3000) {
      this.snackBar.open(message, action, {
        duration,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbar-style'],
      });
    }
  
    copyToClipboard(value: string) {
      this.clipboard.copy(value);
      this.showToast('📋 Copied to clipboard!', 'OK');
    }
  
    readInput(event: Event, from: string) {
      const target = event.target as HTMLInputElement;
      if (from === 'textArea') {
        this.plainText.set(target.value);
      } else if (from === 'password') {
        this.secretKey.set(target.value);
      }
    }
  
    selectMethod(method: string) {
      this.selectedMethod.set(method);
      this.plainText.set('');
      this.encryptedText.set('');
      this.decryptedText.set('');
      this.secretKey.set('');
      this.hashResult.set('');
    }
  
    isActiveMethod(method: string): boolean {
      return this.selectedMethod() === method;
    }
  
    encrypt() {
      if (!this.plainText() || !this.secretKey()) {
        this.showToast('⚠️ Please enter both text and secret key!', 'OK');
        return;
      }
  
      let encrypted = '';
      switch (this.selectedMethod()) {
        case 'AES':
          encrypted = CryptoJS.AES.encrypt(this.plainText(), this.secretKey()).toString();
          break;
        case 'DES':
          encrypted = CryptoJS.DES.encrypt(this.plainText(), this.secretKey()).toString();
          break;
        case '3DES':
          encrypted = CryptoJS.TripleDES.encrypt(this.plainText(), this.secretKey()).toString();
          break;
        case 'Rabbit':
          encrypted = CryptoJS.Rabbit.encrypt(this.plainText(), this.secretKey()).toString();
          break;
        case 'RC4':
          encrypted = CryptoJS.RC4.encrypt(this.plainText(), this.secretKey()).toString();
          break;
      }
  
      this.encryptedText.set(encrypted);
      this.showToast('✅ Text encrypted successfully!', 'OK');
    }
  
    decrypt() {
      if (!this.encryptedText() || !this.secretKey()) {
        this.showToast('⚠️ Please enter encrypted text and secret key!', 'OK');
        return;
      }
  
      try {
        let decrypted = '';
        switch (this.selectedMethod()) {
          case 'AES':
            decrypted = CryptoJS.AES.decrypt(this.encryptedText(), this.secretKey()).toString(CryptoJS.enc.Utf8);
            break;
          case 'DES':
            decrypted = CryptoJS.DES.decrypt(this.encryptedText(), this.secretKey()).toString(CryptoJS.enc.Utf8);
            break;
          case '3DES':
            decrypted = CryptoJS.TripleDES.decrypt(this.encryptedText(), this.secretKey()).toString(CryptoJS.enc.Utf8);
            break;
          case 'Rabbit':
            decrypted = CryptoJS.Rabbit.decrypt(this.encryptedText(), this.secretKey()).toString(CryptoJS.enc.Utf8);
            break;
          case 'RC4':
            decrypted = CryptoJS.RC4.decrypt(this.encryptedText(), this.secretKey()).toString(CryptoJS.enc.Utf8);
            break;
        }
  
        if (!decrypted) throw new Error('Invalid key!');
        this.decryptedText.set(decrypted);
        this.showToast('🔓 Decryption successful!', 'OK');
      } catch (error) {
        this.showToast('❌ Decryption failed! Check your secret key.', 'OK');
        this.decryptedText.set('');
      }
    }
  
    generateHash() {
      if (!this.plainText()) {
        this.showToast('⚠️ Please enter text to hash!', 'OK');
        return;
      }
  
      let hash = '';
      switch (this.selectedMethod()) {
        case 'MD5':
          hash = CryptoJS.MD5(this.plainText()).toString();
          break;
        case 'SHA-1':
          hash = CryptoJS.SHA1(this.plainText()).toString();
          break;
        case 'SHA-256':
          hash = CryptoJS.SHA256(this.plainText()).toString();
          break;
        case 'SHA-512':
          hash = CryptoJS.SHA512(this.plainText()).toString();
          break;
        case 'HMAC-SHA256':
          hash = CryptoJS.HmacSHA256(this.plainText(), this.secretKey()).toString();
          break;
      }
      this.hashResult.set(hash);
      this.showToast('🔑 Hash generated successfully!', 'OK');
    }
  
}
