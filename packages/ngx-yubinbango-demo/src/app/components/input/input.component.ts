import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[ngx-yubinbango-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @HostBinding()
  readonly class = 'bg-input rounded px-4 py-1 placeholder:text-placeholder';
}
