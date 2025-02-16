import { Component, signal, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuildInfoService } from '../../services/build-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whats-new',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './whats-new.component.html',
  styleUrl: './whats-new.component.scss'
})
export class WhatsNewComponent {
  version: WritableSignal<string> = signal('');

  constructor(public buildInfoService: BuildInfoService) {
    this.version.set(buildInfoService.version());
  }

}
