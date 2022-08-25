import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-yubinbango-two-postal-code-example',
  templateUrl: './two-postal-code-example.component.html',
  styleUrls: ['./two-postal-code-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoPostalCodeExampleComponent {
  readonly form = new FormGroup({
    postalCode1: new FormControl(''),
    postalCode2: new FormControl(''),
    region: new FormControl(''),
    locality: new FormControl(''),
    street: new FormControl(''),
    extended: new FormControl(''),
  });
}
