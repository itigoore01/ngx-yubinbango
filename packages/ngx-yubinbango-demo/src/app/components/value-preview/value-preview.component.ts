import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngx-yubinbango-value-preview',
  templateUrl: './value-preview.component.html',
  styleUrls: ['./value-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuePreviewComponent {}
