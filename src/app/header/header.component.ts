import { Component, signal, WritableSignal } from '@angular/core';
import { BuildInfoService } from '../../services/build-info.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from "../directives/time-ago.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, CommonModule, TimeAgoPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  version: WritableSignal<string> = signal('');
  lastBuild: WritableSignal<string> = signal('');

  constructor(public buildInfoService: BuildInfoService) {
    this.version.set(buildInfoService.version());
    this.lastBuild.set(buildInfoService.lastBuild());
  }
}
