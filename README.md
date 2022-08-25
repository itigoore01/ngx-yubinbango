# ngx-yubinbango

[![Test](https://github.com/itigoore01/ngx-yubinbango/actions/workflows/test.yml/badge.svg)](https://github.com/itigoore01/ngx-yubinbango/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/ngx-yubinbango.svg)](https://badge.fury.io/js/ngx-yubinbango)

ngx-yubinbango は Angular 用の郵便番号自動補完ライブラリです。

# Demo

https://itigoore01.github.io/ngx-yubinbango/

# Get Started

```sh
# npm
npm install ngx-yubinbango --save
# yarn
yarn add ngx-yubinbango
```

```typescript
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgxYubinBangoModule } from 'ngx-yubinbango';

@NgModule({
  ...
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    NgxYubinbangoModule,
    ...
  ]
  ...
})
export class AppModule {}
```

```html
<!-- 個別に住所補完 -->
<form ybProvider>
  <input placeholder="郵便番号" ybPostalCode />

  <input placeholder="都道府県" ybCompletion ybRegion />

  <input placeholder="市区町村" ybCompletion ybLocality />

  <input placeholder="町名" ybCompletion ybStreet />

  <input placeholder="その他" ybCompletion ybExtended />
</form>

<!-- 一つの入力欄に住所補完 -->
<form ybProvider>
  <input placeholder="郵便番号" ybPostalCode />

  <input
    placeholder="住所"
    ybCompletion
    ybRegion
    ybLocality
    ybStreet
    ybExtended
  />
</form>
```
