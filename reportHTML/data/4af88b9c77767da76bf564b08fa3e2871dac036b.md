# Test info

- Name: página de avianca >> test flujos de avianca
- Location: C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\tests\avianca.spec.ts:4:9

# Error details

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('.button_label').last()
    - locator resolved to <span class="button_label" _ngcontent-jkj-c12=""> Confirmar </span>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="alert" aria-live="assertive" class="page-loader ng-star-inserted">…</div> from <notification-container aria-hidden="true" ng-version="7.2.16" data-module-path="app/custom-modules/common/NotificationContainer/notification-container/notification-container.custom.module#NotificationContainerCustomModule" data-initial-value="{"isCookieLanguageActive":true,"translations":{"37935":"37935 - Los asientos y/o servicios en la orden no han sido modificados después de la creación del TSM.\n","1-DependencyMissingException":"1 - Se ha producido un error. Por favor, inténtalo de nuevo o ponte en contacto con …>…</notification-container> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="alert" aria-live="assertive" class="page-loader ng-star-inserted">…</div> from <notification-container aria-hidden="true" ng-version="7.2.16" data-module-path="app/custom-modules/common/NotificationContainer/notification-container/notification-container.custom.module#NotificationContainerCustomModule" data-initial-value="{"isCookieLanguageActive":true,"translations":{"37935":"37935 - Los asientos y/o servicios en la orden no han sido modificados después de la creación del TSM.\n","1-DependencyMissingException":"1 - Se ha producido un error. Por favor, inténtalo de nuevo o ponte en contacto con …>…</notification-container> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    10 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div role="alert" aria-live="assertive" class="page-loader ng-star-inserted">…</div> from <notification-container aria-hidden="true" ng-version="7.2.16" data-module-path="app/custom-modules/common/NotificationContainer/notification-container/notification-container.custom.module#NotificationContainerCustomModule" data-initial-value="{"isCookieLanguageActive":true,"translations":{"37935":"37935 - Los asientos y/o servicios en la orden no han sido modificados después de la creación del TSM.\n","1-DependencyMissingException":"1 - Se ha producido un error. Por favor, inténtalo de nuevo o ponte en contacto con …>…</notification-container> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

    at Page.page.servicesPageAvianca (C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\utils\test-extends.ts:321:56)
    at C:\Users\framir02\projects\avianca\automatizacion\playwright-modular\tests\avianca.spec.ts:9:9
```

# Page snapshot

```yaml
- dialog:
  - document:
    - heading "avianca lounges" [level=2]:
      - paragraph: avianca lounges
    - button "Close": 
    - text: 
    - 'heading "Ida : Barranquilla a Bogotá" [level=3]':
      - heading "Ida :" [level=2]
      - text: Barranquilla a Bogotá
    - text: Servicio no disponible 
    - 'heading "Vuelta : Bogotá a Barranquilla" [level=3]':
      - heading "Vuelta :" [level=2]
      - text: Bogotá a Barranquilla
    - text: " Pasajero 1 : Susan Brown Martinez"
    - paragraph: avianca lounges
    - paragraph: Disfruta de acceso wifi, zonas de trabajo y más.
    - text: COP 135.000
    - button " Eliminar"
    - checkbox " Eliminar  Quitar" [checked]
    - text: " Quitar  Pasajero 2 : Jane Smith Brown"
    - paragraph: avianca lounges
    - paragraph: Disfruta de acceso wifi, zonas de trabajo y más.
    - text: COP 135.000
    - button "Añadir"
    - checkbox "Añadir Añadir"
    - text: "Añadir  Pasajero 3 : Carla Jones Brown"
    - paragraph: avianca lounges
    - paragraph: Disfruta de acceso wifi, zonas de trabajo y más.
    - text: COP 135.000
    - button "Añadir"
    - checkbox "Añadir Añadir"
    - text: Añadir Precio total del servicio COP 135.000
    - button "Cancelar"
    - button "Confirmar"
```

# Test source

```ts
  221 |                 const setValuesDefaultAutoForm = async () => {
  222 |                     const elements = document.querySelectorAll('.ui-input');
  223 |                     Array.from(elements).forEach((element) => {
  224 |                         if (element.tagName === "BUTTON") {
  225 |                             const elementButton = element as HTMLButtonElement;
  226 |                             elementButton.click();
  227 |                             const listOptions = document.querySelector(".ui-dropdown_list");
  228 |                             (listOptions?.querySelector(".ui-dropdown_item>button") as HTMLButtonElement).click();
  229 |                         }
  230 |                         else if (element.tagName === "INPUT") {
  231 |                             const elementInput = element as HTMLInputElement;
  232 |                             const containers = document.querySelectorAll(".ui-input-container");
  233 |                             Array.from(containers).forEach(e => { e.classList.add("is-focused") });
  234 |                             let eventBlur: Event = new Event("blur");
  235 |                             let eventFocus: Event = new Event("focus");
  236 |                             elementInput.value = getValueElement(elementInput);
  237 |                             ['change', 'input'].forEach(event => {
  238 |                                 let handleEvent = new Event(event, { bubbles: true, cancelable: false });
  239 |                                 element.dispatchEvent(handleEvent);
  240 |                             });
  241 |                             element.dispatchEvent(eventFocus);
  242 |                             setTimeout(() => {
  243 |                                 element.dispatchEvent(eventBlur);
  244 |                                 Array.from(containers).forEach(e => { e.classList.remove("is-focused") });
  245 |                             }, 100);
  246 |                         }
  247 |                     });
  248 |
  249 |                     const fieldAuthoritation = document.querySelector("#acceptNewCheckbox") as HTMLInputElement;
  250 |                     if (fieldAuthoritation) fieldAuthoritation.checked = true;
  251 |                 }
  252 |                 setValuesDefaultAutoForm();
  253 |             });
  254 |         }
  255 |
  256 |         page.configInitialTest = async (): Promise<void> => {
  257 |             page.setDefaultTimeout(25000);
  258 |             await page.addInitScript(() => {
  259 |                 Object.defineProperty(navigator, 'webdriver', {
  260 |                     get: () => false,
  261 |                 });
  262 |             });
  263 |
  264 |             await page.goto('https://www.avianca.com/');
  265 |             await page.takeScreenshot('página-principal-avianca');
  266 |             await page.verifyCookies();
  267 |         }
  268 |
  269 |         //#endregion
  270 |
  271 |         //#region páginas o flujos de avianca
  272 |         page.homePageAvianca = async (): Promise<void> => {
  273 |             await page.selectOriginFlight();
  274 |             await page.takeScreenshot('seleccion-ciudad-origen');
  275 |             await page.selectDestinationFlight();
  276 |             await page.takeScreenshot('seleccion-ciudad-destino');
  277 |             await page.selectDateInitFlight();
  278 |             await page.takeScreenshot('seleccion-fecha-ida');
  279 |             await page.selectDateEndFlight();
  280 |             await page.takeScreenshot('seleccion-fecha-vuelta');
  281 |             await page.selectPassengers();
  282 |             await page.takeScreenshot('seleccion-pasajeros');
  283 |             await page.selectButtonAndClick("#searchButton");
  284 |             await page.takeScreenshot('busqueda-resultados-vuelos');
  285 |             await page.waitForSelector("#pageWrap");
  286 |         }
  287 |
  288 |         page.flightPageAvianca = async (): Promise<void> => {
  289 |             await page.selectFlightsOneWay();
  290 |             await page.takeScreenshot('seleccion-vuelo-ida');
  291 |             await page.selectFlightReturns();
  292 |             await page.takeScreenshot("seleccion-vuelo-regreso");
  293 |             await page.waitForTimeout(500);
  294 |             await page.takeScreenshot('resumen-de-vuelos-seleccionados');
  295 |             await page.selectButtonAndClick(".button.page_button.btn-action");
  296 |         }
  297 |
  298 |         page.passengerPageAvianca = async (): Promise<void> => {
  299 |             await page.takeScreenshot("inicio-de-llenado-pagina-de-pasajeros");
  300 |             await page.fillFieldsPassenger();
  301 |             await page.waitForTimeout(1500);
  302 |             await page.takeScreenshot("llenado-de-pasajeros-ok");
  303 |             const continueButton = page.locator(".button.page_button.btn-action");
  304 |             await expect(continueButton.last()).toBeVisible();
  305 |             await continueButton.last().click();
  306 |         }
  307 |
  308 |         page.servicesPageAvianca = async (): Promise<void> => {
  309 |
  310 |             await page.waitForSelector(".main-banner--section-offer");
  311 |             await page.waitForTimeout(8000);
  312 |             await page.takeScreenshot("Pagina-de-servicios");
  313 |             await expect(page.locator("#serviceButtonTypeBusinessLounge")).toBeVisible();
  314 |             await page.locator('#serviceButtonTypeBusinessLounge').click();
  315 |             await page.locator('.service_item_button.button').first().click();
  316 |             await page.takeScreenshot("Servicio avianca-lounges");
  317 |             await page.locator('.button.amount-summary_button.amount-summary_button-action.is-action.ng-star-inserted').last().click();
  318 |
  319 |             await page.takeScreenshot("Servicios añadidos");
  320 |             await expect(page.locator(".button_label").last()).toBeVisible();
> 321 |             await page.locator('.button_label').last().click();
      |                                                        ^ Error: locator.click: Test timeout of 60000ms exceeded.
  322 |
  323 |             const upsellService = await page.locator('.terciary-button').last().isVisible()
  324 |
  325 |             if (upsellService) {
  326 |                 await page.locator('.terciary-button').last().click()
  327 |             }
  328 |         }
  329 |
  330 |         page.seatingPageAvianca = async (): Promise<void> => {
  331 |             await page.waitForSelector("#seatmapContainer", {timeout: 12000});
  332 |             await page.takeScreenshot("Pagina-de-seleccion-asientos");
  333 |             const pasajeros = page.locator(".pax-selector_pax-avatar");
  334 |
  335 |             for (const e of await pasajeros.all()) {
  336 |                 await page.takeScreenshot("seleccion-asiento");
  337 |                 await expect(page.locator(".seat-number").first()).toBeVisible();
  338 |                 await page.locator('.seat-number').first().click();
  339 |                 await page.waitForTimeout(8000);
  340 |             }
  341 |
  342 |             await expect(page.locator(".next-flight-code")).toBeVisible();
  343 |             await page.takeScreenshot("seleccion-asiento-vuelta");
  344 |             await page.locator('.next-flight-code').click();
  345 |
  346 |             const pasajerosVuelta = page.locator(".pax-selector_pax-avatar")
  347 |
  348 |             for (const j of await pasajerosVuelta.all()) {
  349 |                 await page.takeScreenshot("seleccion-asiento");
  350 |                 await expect(page.locator(".seat-number").first()).toBeVisible();
  351 |                 await page.locator('.seat-number').first().click();
  352 |                 await page.waitForTimeout(8000);
  353 |             }
  354 |
  355 |             await page.waitForTimeout(8000);
  356 |         }
  357 |
  358 |         //#endregion
  359 |
  360 |         await use(page);
  361 |     }
  362 | });
  363 |
  364 | export { expect } from '@playwright/test';
```