import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SafePipe } from './src.pipe';
@Component({
  imports: [SafePipe, MatProgressSpinnerModule],
  standalone: true,
  selector: 'app-iframe-container',
  template: `
    <iframe width="100%" height="100%" [src]="src() | safe"> </iframe>
  `,
})
export class IframeContainerComponent {
  src = toSignal(inject(ActivatedRoute).data.pipe(map((d) => d['src'])));
}
