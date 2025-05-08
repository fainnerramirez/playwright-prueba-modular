# Test info

- Name: Comenzo prueba avianca >> prueba home avianca
- Location: C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\tests\avianca.spec.ts:5:9

# Error details

```
Error: page.waitForSelector: Target page, context or browser has been closed
Call log:
  - waiting for locator('.main-banner--section-offer') to be visible

    at C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\tests\avianca.spec.ts:70:20
```

# Test source

```ts
   1 | import { expect } from '@playwright/test';
   2 | import { test } from '../utils/test-extends';
   3 |
   4 | test.describe('Comenzo prueba avianca', () => {
   5 |     test('prueba home avianca', async ({ page }) => {
   6 |         //#region  configuración Inicial
   7 |         test.setTimeout(300_000);
   8 |
   9 |         await page.addInitScript(() => {
  10 |             Object.defineProperty(navigator, 'webdriver', {
  11 |                 get: () => false,
  12 |             });
  13 |         });
  14 |
  15 |         await page.goto('https://www.avianca.com/');
  16 |         await page.takeScreenshot('página-principal-avianca');
  17 |         await page.verifyCookies();
  18 |
  19 |         //#endregion
  20 |
  21 |         //#region Home
  22 |
  23 |         await page.selectOriginFlight();
  24 |         await page.takeScreenshot('seleccion-ciudad-origen');
  25 |
  26 |         await page.selectDestinationFlight();
  27 |         await page.takeScreenshot('seleccion-ciudad-destino');
  28 |
  29 |         await page.selectDateInitFlight();
  30 |         await page.takeScreenshot('seleccion-fecha-ida');
  31 |
  32 |         await page.selectDateEndFlight();
  33 |         await page.takeScreenshot('seleccion-fecha-vuelta');
  34 |
  35 |         await page.selectPassengers();
  36 |         await page.takeScreenshot('seleccion-pasajeros');
  37 |
  38 |         await page.selectButtonAndClick("#searchButton");
  39 |         await page.takeScreenshot('busqueda-resultados-vuelos');
  40 |
  41 |         //#endregion
  42 |
  43 |         //#region Selección de vuelos solo Ida ó Ida y Vuelta
  44 |
  45 |         await page.waitForSelector("#pageWrap");
  46 |         await page.selectFlightsOneWay();
  47 |         await page.takeScreenshot('seleccion-vuelo-ida');
  48 |
  49 |         await page.selectFlightReturns();
  50 |         await page.takeScreenshot("seleccion-vuelo-regreso");
  51 |
  52 |         await page.waitForTimeout(500);
  53 |         await page.takeScreenshot('resumen-de-vuelos-seleccionados');
  54 |
  55 |         await page.selectButtonAndClick(".button.page_button.btn-action");
  56 |
  57 |         //#endregion
  58 |
  59 |         //página de pasajeros
  60 |         await page.takeScreenshot("inicio-de-llenado-pagina-de-pasajeros");
  61 |         await page.fillFieldsPassenger();
  62 |
  63 |         await page.takeScreenshot("llenado-de-pasajeros-ok");
  64 |         await page.waitForTimeout(2000);
  65 |
  66 |         //#region página de servicios
  67 |         await expect(page.locator(".button.page_button.btn-action").last()).toBeVisible();
  68 |         await page.locator(".button.page_button.btn-action").last().click();
  69 |
> 70 |         await page.waitForSelector(".main-banner--section-offer");
     |                    ^ Error: page.waitForSelector: Target page, context or browser has been closed
  71 |         await page.waitForTimeout(8000);
  72 |         await page.takeScreenshot("Pagina-de-servicios");
  73 |
  74 |         //#endregion
  75 |
  76 |     });
  77 | });
```