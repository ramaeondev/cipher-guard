import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuildInfoService {
  version: WritableSignal<string> = signal<string>('');
  lastBuild: WritableSignal<string> = signal<string>('');

  constructor(private http: HttpClient) {
    this.version.set(environment.version);
    this.lastBuild.set(new Date(environment.lastBuild).toLocaleString());
  }
}
