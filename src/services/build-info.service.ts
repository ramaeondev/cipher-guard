import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuildInfoService {
  version: WritableSignal<string> = signal('Unknown');
  lastBuild: WritableSignal<string> = signal('Unknown');

  constructor(private http: HttpClient) {}

  loadBuildInfo() {
    this.http.get<{ version: string; lastBuild: string }>('assets/build-info.json').subscribe(
      (data) => {
        this.version.set(data.version);
        this.lastBuild.set(new Date(data.lastBuild).toLocaleString());
      },
      (error) => {
        console.warn('⚠️ build-info.json not found or invalid. Using default values.');
        this.version.set('local-dev');
        this.lastBuild.set('N/A');
      }
    );
  }
}
