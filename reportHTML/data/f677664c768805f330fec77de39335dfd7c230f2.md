# Test info

- Name: Comenzo prueba avianca >> prueba home avianca
- Location: C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\tests\avianca.spec.ts:5:9

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('.button.page_button.btn-action')
    - locator resolved to <button type="button" class="button page_button btn-action page_button-primary-flow ng-star-inserted">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="alert" aria-live="assertive" class="page-loader ng-star-inserted">…</div> from <notification-container ng-version="7.2.16" data-module-path="app/custom-modules/common/NotificationContainer/notification-container/notification-container.custom.module#NotificationContainerCustomModule" data-initial-value="{"isCookieLanguageActive":true,"translations":{"37935":"37935 - Los asientos y/o servicios en la orden no han sido modificados después de la creación del TSM.\n","1-DependencyMissingException":"1 - Se ha producido un error. Por favor, inténtalo de nuevo o ponte en contacto con nuestro centro de a…>…</notification-container> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="alert" aria-live="assertive" class="page-loader ng-star-inserted">…</div> from <notification-container ng-version="7.2.16" data-module-path="app/custom-modules/common/NotificationContainer/notification-container/notification-container.custom.module#NotificationContainerCustomModule" data-initial-value="{"isCookieLanguageActive":true,"translations":{"37935":"37935 - Los asientos y/o servicios en la orden no han sido modificados después de la creación del TSM.\n","1-DependencyMissingException":"1 - Se ha producido un error. Por favor, inténtalo de nuevo o ponte en contacto con nuestro centro de a…>…</notification-container> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    50 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div role="alert" aria-live="assertive" class="page-loader ng-star-inserted">…</div> from <notification-container ng-version="7.2.16" data-module-path="app/custom-modules/common/NotificationContainer/notification-container/notification-container.custom.module#NotificationContainerCustomModule" data-initial-value="{"isCookieLanguageActive":true,"translations":{"37935":"37935 - Los asientos y/o servicios en la orden no han sido modificados después de la creación del TSM.\n","1-DependencyMissingException":"1 - Se ha producido un error. Por favor, inténtalo de nuevo o ponte en contacto con nuestro centro de a…>…</notification-container> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

    at Page.page.selectButtonAndClick (C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\utils\test-extends.ts:64:46)
    at C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\tests\avianca.spec.ts:55:9
```

# Test source

```ts
   1 | import { test as base, ElementHandle, expect } from '@playwright/test';
   2 | import type { Lang } from '../types/aviancaTypes';
   3 | import { copys } from '../data/copys';
   4 |
   5 | export const test = base.extend({
   6 |     page: async ({ page }, use, testInfo) => {
   7 |         let step = 0;
   8 |
   9 |         page.getTimestamp = (): string => {
   10 |             const now = new Date();
   11 |             const pad = (n: number) => n.toString().padStart(2, '0');
   12 |             const dd = pad(now.getDate());
   13 |             const mm = pad(now.getMonth() + 1);
   14 |             const yyyy = now.getFullYear();
   15 |             const hh = pad(now.getHours());
   16 |             const mi = pad(now.getMinutes());
   17 |             const ss = pad(now.getSeconds());
   18 |             return `fecha-${dd}-${mm}-${yyyy}_hora-${hh}-${mi}-${ss}`;
   19 |         }
   20 |
   21 |         page.takeScreenshot = async (label: string): Promise<void> => {
   22 |             step++;
   23 |             const timestamp = page.getTimestamp();
   24 |             const name = `step${step}-${label}-${timestamp}.png`;
   25 |             const buffer = await page.screenshot({ path: `./images-tests/${name}` });
   26 |             await testInfo.attach(`${label} (${timestamp})`, {
   27 |                 body: buffer,
   28 |                 contentType: 'image/png',
   29 |             });
   30 |         };
   31 |
   32 |         page.verifyCookies = async (): Promise<void> => {
   33 |             const consentBtn = page.locator('#onetrust-pc-btn-handler');
   34 |             if (await consentBtn.isVisible()) {
   35 |                 await consentBtn.click();
   36 |                 await page.locator('.save-preference-btn-handler.onetrust-close-btn-handler').click();
   37 |             }
   38 |         }
   39 |
   40 |         page.getLangPage = async (): Promise<Lang> => {
   41 |             const responseLang = await page.evaluate(() => {
   42 |                 const lang = document.querySelector("html")?.getAttribute("lang")?.toLowerCase();
   43 |                 if (lang?.includes("-")) {
   44 |                     return lang.split("-")[1].toLowerCase();
   45 |                 }
   46 |                 return lang;
   47 |             }) as Lang;
   48 |
   49 |             return responseLang;
   50 |         }
   51 |
   52 |         page.isElementPresent = async (selector: string): Promise<boolean> => {
   53 |             return await page.locator(selector).isVisible();
   54 |         }
   55 |
   56 |         page.selectElementDOM = async (selector: string): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
   57 |             return await page.$(selector);
   58 |         }
   59 |
   60 |         page.selectButtonAndClick = async (selector: string): Promise<void> => {
   61 |             const elementPresent = await page.isElementPresent(selector);
   62 |             if (elementPresent) {
   63 |                 await expect(page.locator(selector)).toBeVisible();
>  64 |                 await page.locator(selector).click();
      |                                              ^ Error: locator.click: Test ended.
   65 |             }
   66 |         }
   67 |
   68 |         page.selectOriginFlight = async (): Promise<void> => {
   69 |             const currentLang = await page.getLangPage();
   70 |             await expect(page.locator('.content-wrap')).toBeVisible();
   71 |             await expect(page.locator('#originBtn')).toBeVisible();
   72 |             const origen = page.getByPlaceholder((copys[currentLang]).origen);
   73 |             await page.locator('button#originBtn').click();
   74 |             await origen.fill(copys['ciudad_origen']);
   75 |             await origen.press('Enter');
   76 |             await (page.locator('id=' + copys['ciudad_origen'])).click();
   77 |         }
   78 |
   79 |         page.selectDestinationFlight = async (): Promise<void> => {
   80 |             const currentLang = await page.getLangPage();
   81 |             const destino = page.getByPlaceholder(copys[currentLang].destino);
   82 |             await destino.click();
   83 |             await destino.fill(copys['ciudad_destino']);
   84 |             await destino.press('Enter');
   85 |             await (page.locator('id=' + copys['ciudad_destino'])).click();
   86 |         }
   87 |
   88 |         page.selectDateInitFlight = async (): Promise<void> => {
   89 |             await expect(page.locator('id=departureInputDatePickerId')).toBeVisible();
   90 |             const fechaIda = await page.locator('id=departureInputDatePickerId');
   91 |             fechaIda.click();
   92 |             await expect(page.locator('span').filter({ hasText: copys['fecha_salida'] })).toBeVisible();
   93 |             await page.locator('span').filter({ hasText: copys['fecha_salida'] }).click();
   94 |         }
   95 |
   96 |         page.selectDateEndFlight = async (): Promise<void> => {
   97 |             await expect(page.locator('span').filter({ hasText: copys['fecha_llegada'] })).toBeVisible();
   98 |             await page.locator('span').filter({ hasText: copys['fecha_llegada'] }).click();
   99 |         }
  100 |
  101 |         page.selectPassengers = async (): Promise<void> => {
  102 |             await page.waitForTimeout(300);
  103 |             await page.getByRole('button', { name: '' }).nth(1).click();
  104 |             await page.getByRole('button', { name: '' }).nth(2).click();
  105 |             await page.getByRole('button', { name: '' }).nth(3).click();
  106 |             const confirmar = await page.locator('div#paxControlSearchId > div > div:nth-of-type(2) > div > div > button')
  107 |             confirmar.click();
  108 |         }
  109 |
  110 |         page.selectCheckWayReturn = async (): Promise<void> => {
  111 |             const wayReturn = page.locator("#journeytypeId_0");
  112 |             await expect(wayReturn).toBeVisible();
  113 |             await wayReturn.scrollIntoViewIfNeeded();
  114 |             wayReturn.click();
  115 |         }
  116 |
  117 |         page.selectCheckOneWay = async (): Promise<void> => {
  118 |             const oneWay = page.locator("#journeytypeId_1");
  119 |             await expect(oneWay).toBeVisible();
  120 |             await oneWay.scrollIntoViewIfNeeded();
  121 |             oneWay.click();
  122 |         }
  123 |
  124 |         page.validateModalSelectionFlight = async (): Promise<void> => {
  125 |             await page.waitForTimeout(1500);
  126 |             const isVisibleModal = await page.locator("#FB310").first().isVisible();
  127 |             if (isVisibleModal) {
  128 |                 await expect(page.locator(".cro-button.cro-no-accept-upsell-button")).toBeVisible();
  129 |                 await page.locator(".cro-button.cro-no-accept-upsell-button").first().click();
  130 |             }
  131 |         }
  132 |
  133 |         page.selectFlightsOneWay = async (): Promise<void> => {
  134 |             await expect(page.locator(".journey_price_fare-select_label-text").first()).toBeVisible();
  135 |             await page.locator('.journey_price_fare-select_label-text').first().click();
  136 |             await page.waitForSelector(".journey_fares");
  137 |             await page.locator('.journey_fares').first().locator('.light-basic.cro-new-basic-button').click();
  138 |             await page.validateModalSelectionFlight();
  139 |         }
  140 |
  141 |         page.selectFlightReturns = async (): Promise<void> => {
  142 |             await page.waitForSelector("#journeysContainerId_1", { timeout: 15000 });
  143 |             const containerVuelta = page.locator("#journeysContainerId_1");
  144 |             await expect(containerVuelta).toBeVisible();
  145 |             await containerVuelta.locator(".journey_price_fare-select_label-text").first().click();
  146 |             await page.takeScreenshot('seleccion-vuelo-regreso');
  147 |             await containerVuelta.locator('.journey_fares').first().locator('.light-basic.cro-new-basic-button').click();
  148 |             await page.validateModalSelectionFlight();
  149 |         }
  150 |
  151 |         page.fillFieldsPassenger = async (): Promise<void> => {
  152 |             await page.waitForSelector(".passenger_data_group");
  153 |             await page.evaluate(() => {
  154 |                 const userNamesData: Array<string> = [
  155 |                     "john doe",
  156 |                     "jane smith",
  157 |                     "alexander wilson",
  158 |                     "maria gomez",
  159 |                     "roberto perez",
  160 |                     "lucia martinez",
  161 |                     "david hernandez",
  162 |                     "carla jones",
  163 |                     "luis vega",
  164 |                     "susan brown"
```