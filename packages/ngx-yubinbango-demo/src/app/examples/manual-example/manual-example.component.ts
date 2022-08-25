import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-yubinbango-manual-example',
  templateUrl: './manual-example.component.html',
  styleUrls: ['./manual-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualExampleComponent {
  readonly form = new FormGroup({
    postalCode: new FormControl(''),
    address: new FormControl(''),
  });
}
