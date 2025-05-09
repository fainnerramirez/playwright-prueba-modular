import { expect } from '@playwright/test';
import { test } from '../utils/test-extends';

test.describe('Comenzo prueba avianca', () => {
    test('prueba home avianca', async ({ page }) => {
        //#region  configuración Inicial
        test.setTimeout(300_000);

        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.goto('https://www.avianca.com/');
        await page.takeScreenshot('página-principal-avianca');
        await page.verifyCookies();

        //#endregion

        //#region Home

        await page.selectOriginFlight();
        await page.takeScreenshot('seleccion-ciudad-origen');

        await page.selectDestinationFlight();
        await page.takeScreenshot('seleccion-ciudad-destino');

        await page.selectDateInitFlight();
        await page.takeScreenshot('seleccion-fecha-ida');

        await page.selectDateEndFlight();
        await page.takeScreenshot('seleccion-fecha-vuelta');

        await page.selectPassengers();
        await page.takeScreenshot('seleccion-pasajeros');

        await page.selectButtonAndClick("#searchButton");
        await page.takeScreenshot('busqueda-resultados-vuelos');

        //#endregion

        //#region Selección de vuelos solo Ida ó Ida y Vuelta

        await page.waitForSelector("#pageWrap");
        await page.selectFlightsOneWay();
        await page.takeScreenshot('seleccion-vuelo-ida');

        await page.selectFlightReturns();
        await page.takeScreenshot("seleccion-vuelo-regreso");

        await page.waitForTimeout(500);
        await page.takeScreenshot('resumen-de-vuelos-seleccionados');

        await page.selectButtonAndClick(".button.page_button.btn-action");

        //#endregion

        //#region página de pasajeros

        await page.takeScreenshot("inicio-de-llenado-pagina-de-pasajeros");
        await page.fillFieldsPassenger();

        await page.takeScreenshot("llenado-de-pasajeros-ok");
        await page.waitForTimeout(2000);
        //#endregion
    });
});