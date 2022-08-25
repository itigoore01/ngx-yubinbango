import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-yubinbango-one-completion-target-example',
  templateUrl: './one-completion-target-example.component.html',
  styleUrls: ['./one-completion-target-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneCompletionTargetExampleComponent {
  readonly form = new FormGroup({
    postalCode: new FormControl(''),
    address: new FormControl(''),
  });
}
