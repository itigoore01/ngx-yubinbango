import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { Observable, of } from 'rxjs';
import { Address } from '../core/address';
import { PostalCodeResolver } from '../core/postal-code-resolver.service';
import { NgxYubinbangoModule } from '../ngx-yubinbango.module';
import { normalizePostalCode } from '../utils/normalize-postal-code';
import { validatePostalCode } from '../utils/validate-postal-code';
import userEvent from '@testing-library/user-event';

describe('AddressCompletion', () => {
  describe('FormsModule, ReactiveFormModule', () => {
    it('should completion ReactiveForm', async () => {
      const user = userEvent.setup();

      const { fixture } = await render(
        `
      <form [formGroup]="form" ybProvider>
        <input data-testid="postal-code" formControlName="postalCode" ybPostalCode>
        <input formControlName="region" ybCompletion ybRegion>
        <input formControlName="locality" ybCompletion ybLocality>
        <input formControlName="street" ybCompletion ybStreet>
        <input data-testid="extended" formControlName="extended" ybCompletion ybExtended>
      </form>
      `,
        {
          imports: [ReactiveFormsModule, NgxYubinbangoModule],
          providers: [
            { provide: PostalCodeResolver, useClass: MockPostalCodeResolver },
          ],
          componentProperties: {
            form: new FormGroup({
              postalCode: new FormControl(''),
              region: new FormControl(''),
              locality: new FormControl(''),
              street: new FormControl(''),
              extended: new FormControl(''),
            }),
          },
        }
      );

      await user.type(screen.getByTestId('postal-code'), '1000001');

      screen.getByDisplayValue('東京都');
      screen.getByDisplayValue('千代田区');
      screen.getByDisplayValue('千代田');
      expect(screen.getByTestId('extended')).toHaveProperty('value', '');

      const form = fixture.componentInstance.form;

      expect(form.value).toEqual<typeof form.value>({
        postalCode: '1000001',
        region: '東京都',
        locality: '千代田区',
        street: '千代田',
        extended: '',
      });
    });
    it('should completion', async () => {
      const user = userEvent.setup();

      const { fixture } = await render(
        `
      <form ybProvider>
        <input data-testid="postal-code" name="postalCode" [(ngModel)]="form.postalCode" ybPostalCode>
        <input [(ngModel)]="form.region" name="region" ybCompletion ybRegion>
        <input [(ngModel)]="form.locality" name="locality" ybCompletion ybLocality>
        <input [(ngModel)]="form.street" name="street" ybCompletion ybStreet>
        <input data-testid="extended" [(ngModel)]="form.extended" name="extended" ybCompletion ybExtended>
      </form>
      `,
        {
          imports: [FormsModule, NgxYubinbangoModule],
          providers: [
            { provide: PostalCodeResolver, useClass: MockPostalCodeResolver },
          ],
          componentProperties: {
            form: {
              postalCode: '',
              region: '',
              locality: '',
              street: '',
              extended: '',
            },
          },
        }
      );

      await user.type(screen.getByTestId('postal-code'), '1000001');

      screen.getByDisplayValue('東京都');
      screen.getByDisplayValue('千代田区');
      screen.getByDisplayValue('千代田');
      expect(screen.getByTestId('extended')).toHaveProperty('value', '');

      const form = fixture.componentInstance.form;

      expect(form).toEqual<typeof form>({
        postalCode: '1000001',
        region: '東京都',
        locality: '千代田区',
        street: '千代田',
        extended: '',
      });
    });
  });

  it('two postal code', async () => {
    const user = userEvent.setup();

    const { fixture } = await render(
      `
    <form [formGroup]="form" ybProvider>
      <input data-testid="postal-code1" formControlName="postalCode1" ybPostalCode>
      <input data-testid="postal-code2" formControlName="postalCode2" ybPostalCode>
      <input formControlName="address" ybCompletion ybRegion ybLocality ybStreet ybExtended>
    </form>
    `,
      {
        imports: [ReactiveFormsModule, NgxYubinbangoModule],
        providers: [
          { provide: PostalCodeResolver, useClass: MockPostalCodeResolver },
        ],
        componentProperties: {
          form: new FormGroup({
            postalCode1: new FormControl(''),
            postalCode2: new FormControl(''),
            address: new FormControl(''),
          }),
        },
      }
    );

    await user.type(screen.getByTestId('postal-code1'), '999');
    await user.type(screen.getByTestId('postal-code2'), '9999');

    screen.getByDisplayValue('東京都LOCALITYSTREETEXTENDED');

    const form = fixture.componentInstance.form;

    expect(form.value).toEqual<typeof form.value>({
      postalCode1: '999',
      postalCode2: '9999',
      address: '東京都LOCALITYSTREETEXTENDED',
    });
  });

  it('completion when change', async () => {
    const user = userEvent.setup();

    const { fixture } = await render(
      `
    <form [formGroup]="form" ybProvider ybAutocompleteMode="change">
      <input data-testid="postal-code" formControlName="postalCode" ybPostalCode>
      <input data-testid="address" formControlName="address" ybCompletion ybRegion ybLocality ybStreet ybExtended>
    </form>
    `,
      {
        imports: [ReactiveFormsModule, NgxYubinbangoModule],
        providers: [
          { provide: PostalCodeResolver, useClass: MockPostalCodeResolver },
        ],
        componentProperties: {
          form: new FormGroup({
            postalCode: new FormControl(''),
            address: new FormControl(''),
          }),
        },
      }
    );

    await user.type(screen.getByTestId('postal-code'), '9999999');
    // また補完されない
    expect(screen.getByTestId('address')).toHaveProperty('value', '');

    // フォーカスが外れるとonchangeが走る
    await user.tab();
    screen.getByDisplayValue('東京都LOCALITYSTREETEXTENDED');

    const form = fixture.componentInstance.form;

    expect(form.value).toEqual<typeof form.value>({
      postalCode: '9999999',
      address: '東京都LOCALITYSTREETEXTENDED',
    });
  });

  it('manual trigger', async () => {
    const user = userEvent.setup();

    const { fixture } = await render(
      `
    <form [formGroup]="form" ybProvider ybAutocompleteMode="manual" #ybProvider="ybProvider">
      <input data-testid="postal-code" formControlName="postalCode" ybPostalCode>
      <button type="button" (click)="ybProvider.complete()">Completion</button>
      <input formControlName="address" ybCompletion ybRegion ybLocality ybStreet ybExtended>
    </form>
    `,
      {
        imports: [ReactiveFormsModule, NgxYubinbangoModule],
        providers: [
          { provide: PostalCodeResolver, useClass: MockPostalCodeResolver },
        ],
        componentProperties: {
          form: new FormGroup({
            postalCode: new FormControl(''),
            address: new FormControl(''),
          }),
        },
      }
    );

    await user.type(screen.getByTestId('postal-code'), '9999999');

    await user.click(screen.getByText('Completion'));

    screen.getByDisplayValue('東京都LOCALITYSTREETEXTENDED');

    const form = fixture.componentInstance.form;

    expect(form.value).toEqual<typeof form.value>({
      postalCode: '9999999',
      address: '東京都LOCALITYSTREETEXTENDED',
    });
  });
});

class MockPostalCodeResolver implements PostalCodeResolver {
  resolve(postalCode: string): Observable<Address | null> {
    postalCode = normalizePostalCode(postalCode);

    if (!validatePostalCode(postalCode)) {
      return of(null);
    }

    const addresses = new Map<string, Address>([
      [
        '1000001',
        {
          regionId: 13,
          region: '東京都',
          locality: '千代田区',
          street: '千代田',
          extended: '',
        },
      ],
      [
        '9999999',
        {
          regionId: 13,
          region: '東京都',
          locality: 'LOCALITY',
          street: 'STREET',
          extended: 'EXTENDED',
        },
      ],
    ]);

    return of(addresses.get(postalCode) ?? null);
  }
}
