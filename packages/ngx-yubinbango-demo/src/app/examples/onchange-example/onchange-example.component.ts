import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-yubinbango-onchange-example',
  templateUrl: './onchange-example.component.html',
  styleUrls: ['./onchange-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnchangeExampleComponent {
  readonly form = new FormGroup({
    postalCode: new FormControl(''),
    address: new FormControl(''),
  });
}
