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

        //#region página de servicios
        await expect(page.locator(".button.page_button.btn-action").last()).toBeVisible();
        await page.takeScreenshot("página-de-servicios");
        await page.locator(".button.page_button.btn-action").last().click();
        //#endregion

        //#region página de servicios
        await page.waitForSelector(".main-banner--section-offer");
        await page.waitForTimeout(1000);

        const buttonComfirmServices = page.locator(".button.page_button.btn-action.page_button-primary-flow");
        await expect(buttonComfirmServices.last()).toBeVisible();
        await buttonComfirmServices.last().click();
        //#endregion

        //#region Página de selección de asientos
        await page.waitForSelector("#seatmapContainer");
        await page.takeScreenshot("página-selección-asientos");
        await page.waitForTimeout(5000);

        const pasajeros = page.locator(".pax-selector_pax-avatar")

        for (const e of await pasajeros.all()) {
            await page.takeScreenshot("seleccion-asiento");
            await expect(page.locator(".seat-number").first()).toBeVisible();
            await page.locator('.seat-number').first().click();
            await page.waitForTimeout(8000);
        }

        await expect(page.locator(".next-flight-code")).toBeVisible();
        await page.takeScreenshot("seleccion-asiento-vuelta");
        await page.locator('.next-flight-code').click();

        const pasajerosVuelta = page.locator(".pax-selector_pax-avatar")

        for (const j of await pasajerosVuelta.all()) {
            await page.takeScreenshot("seleccion-asiento");
            await expect(page.locator(".seat-number").first()).toBeVisible();
            await page.locator('.seat-number').first().click();
            await page.waitForTimeout(8000);
        }

        const buttonToPayment = page.locator(".button.amount-summary_button.amount-summary_button-primary");
        await expect(buttonToPayment).toBeVisible();
        await buttonToPayment.click();
        //#endregion

        //#region página de pagos
        await page.waitForSelector(".payment-button.payment-button--3DSecure");
        await page.takeScreenshot("página-pagos");
        await page.waitForTimeout(5000);
        //#endregion
    });
});