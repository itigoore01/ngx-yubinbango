import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-yubinbango-basic-example',
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicExampleComponent {
  readonly form = new FormGroup({
    postalCode: new FormControl(''),
    region: new FormControl(''),
    locality: new FormControl(''),
    street: new FormControl(''),
    extended: new FormControl(''),
  });
}
