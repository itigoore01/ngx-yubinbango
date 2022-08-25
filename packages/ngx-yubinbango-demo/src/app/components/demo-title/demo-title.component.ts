import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ngx-yubinbango-demo-title',
  templateUrl: './demo-title.component.html',
  styleUrls: ['./demo-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoTitleComponent {
  @Input()
  sampleUrl?: string;

  linkIcon = faExternalLinkAlt;
}
