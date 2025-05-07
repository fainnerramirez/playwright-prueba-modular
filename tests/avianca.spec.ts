import { test, expect } from '@playwright/test';
import { copys } from '../data/copys';

test.describe('Comenzo prueba avianca', () => {
    test('prueba home avianca', async ({ page }) => {
        test.setTimeout(300_000);

        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.goto('https://www.avianca.com/');
        await page.takeScreenshot('01-goto-avianca');

        await page.verifyCookies();

        //setear solo ida
        // const fechaSoloIda = page.locator("#journeytypeId_1")
        // // expect(page.locator("#journeytypeId_1"));
        // // expect(page.locator("#journeytypeId_1")).toBeVisible(); // espera hasta 10s si es necesario
        // await fechaSoloIda.scrollIntoViewIfNeeded();
        // await page.locator("#journeytypeId_1").click();

        const idioma = copys.getLang();


        await page.takeScreenshot('03-ciudad-origen');

        const destino = page.getByPlaceholder(copys[idioma].destino);
        await destino.click();
        await destino.fill(copys['ciudad_destino']);
        await destino.press('Enter');
        await (page.locator('id=' + copys['ciudad_destino'])).click();
        await page.takeScreenshot('04-ciudad-destino');

        const fechaIda = await page.locator('id=departureInputDatePickerId')
        fechaIda.click();
        await page.locator('span').filter({ hasText: copys['fecha_salida'] }).click();
        await page.takeScreenshot('05-fecha-ida');

        await page.locator('span').filter({ hasText: copys['fecha_llegada'] }).click();
        await page.takeScreenshot('06-fecha-vuelta');

        await page.getByRole('button', { name: '' }).nth(1).click();
        await page.getByRole('button', { name: '' }).nth(2).click();
        await page.getByRole('button', { name: '' }).nth(3).click();
        const confirmar = await page.locator('div#paxControlSearchId > div > div:nth-of-type(2) > div > div > button')
        confirmar.click();

        await page.takeScreenshot('07-seleccion-pasajeros');
        await expect(page.getByRole('button', { name: copys[idioma].buscar, exact: true })).toBeVisible()
        await page.getByRole('button', { name: copys[idioma].buscar, exact: true }).click();
        await page.takeScreenshot('08-buscar');

        await page.waitForSelector('#pageWrap');
        await expect(page.locator(".journey_price_fare-select_label-text").first()).toBeVisible();
        await page.locator('.journey_price_fare-select_label-text').first().click();
        await page.waitForSelector(".journey_fares");
        await page.locator('.journey_fares').first().locator('.light-basic.cro-new-basic-button').click();
        //  await page.locator('.journey_fares').first().locator('.fare-flex').click();
        await page.takeScreenshot('09-seleccion-vuelo-ida');

        await page.waitForTimeout(1500);
        const isVisibleModal = await page.locator("#FB310").first().isVisible();

        if (isVisibleModal) {
            await expect(page.locator(".cro-button.cro-no-accept-upsell-button")).toBeVisible();
            await page.locator(".cro-button.cro-no-accept-upsell-button").first().click();
        }

        await page.waitForSelector("#journeysContainerId_1", { timeout: 15000 });
        const containerVuelta = page.locator("#journeysContainerId_1");
        await expect(containerVuelta).toBeVisible();
        // await expect(page.locator('.journey_price_fare-select_label-text').nth(22)).toBeVisible();
        await containerVuelta.locator(".journey_price_fare-select_label-text").first().click();
        await page.takeScreenshot('13-seleccion-vuelo-regreso');
        await containerVuelta.locator('.journey_fares').first().locator('.light-basic.cro-new-basic-button').click();
        await page.waitForTimeout(1500);

        const isVisibleModal2 = await page.locator("#FB310").first().isVisible();

        if (isVisibleModal2) {
            await expect(page.locator(".cro-button.cro-no-accept-upsell-button")).toBeVisible();
            await page.locator(".cro-button.cro-no-accept-upsell-button").first().click();
        }

        await page.takeScreenshot('13-resumen-de-vuelos-seleccionados');

        await expect(page.locator(".button.page_button.btn-action")).toBeVisible();
        await page.locator('.button.page_button.btn-action').click();

        //página de pasajeros
        await page.takeScreenshot("inicio-de-llenado-pagina-de-pasajeros");
        await page.waitForSelector(".passenger_data_group");

        //seteando los valores
        await page.evaluate(() => {
            const userNamesData: Array<string> = [
                "john doe",
                "jane smith",
                "alexander wilson",
                "maria gomez",
                "roberto perez",
                "lucia martinez",
                "david hernandez",
                "carla jones",
                "luis vega",
                "susan brown"
            ];

            const lastNamesData: Array<string> = [
                "Doe",
                "Smith",
                "Wilson",
                "Gomez",
                "Perez",
                "Martinez",
                "Hernandez",
                "Jones",
                "Vega",
                "Brown"
            ];

            const emailsData: Array<string> = [
                "monitoreo.digital@avianca.com"
            ];

            const phoneNumbersData: Array<string> = [
                "123456",
                "987654",
                "654321",
                "321654",
                "987123",
                "456789",
                "102938",
                "112233",
                "778899",
                "334455"
            ];

            const getDataRandom = (data: Array<string> = []) => {
                return data[Math.floor(Math.random() * data.length)];
            }

            const getValueElement = (element: HTMLInputElement) => {
                let value = null;
                if (element.name === "email") {
                    value = getDataRandom(emailsData);
                }
                else if (element.name === "phone_phoneNumberId") {
                    value = getDataRandom(phoneNumbersData);
                }
                else if (element.id.includes("IdFirstName")) {
                    value = getDataRandom(userNamesData);
                }
                else {
                    value = getDataRandom(lastNamesData);
                }
                return value;
            }

            const setValuesDefaultAutoForm = () => {
                const elements = document.querySelectorAll('.ui-input');
                console.log("elements: ", elements);
                Array.from(elements).forEach((element, index) => {
                    if (element.tagName === "BUTTON") {
                        (element as HTMLButtonElement).click();
                        const listOptions = document.querySelector(".ui-dropdown_list");
                        (listOptions?.querySelector(".ui-dropdown_item>button") as HTMLButtonElement).click();
                    }
                    else if (element.tagName === "INPUT") {
                        const containers = document.querySelectorAll(".ui-input-container");
                        Array.from(containers).forEach(e => { e.classList.add("is-focused") });
                        let eventBlur = new Event("blur");
                        let eventFocus = new Event("focus");
                        (element as HTMLInputElement).value = getValueElement(element as HTMLInputElement);
                        ['change', 'input'].forEach(event => {
                            let handleEvent = new Event(event, { bubbles: true, cancelable: false });
                            element.dispatchEvent(handleEvent);
                        });
                        element.dispatchEvent(eventFocus);
                        setTimeout(() => {
                            element.dispatchEvent(eventBlur);
                            Array.from(containers).forEach(e => { e.classList.remove("is-focused") });
                        }, 100);
                    }
                });

                const fieldAuthoritation = document.querySelector("#acceptNewCheckbox") as HTMLInputElement;
                if (fieldAuthoritation) fieldAuthoritation.checked = true;
            }

            setValuesDefaultAutoForm();
        });

        await page.takeScreenshot("llenado-de-pasajeros-ok");
        await page.waitForTimeout(2000);
        //boton de continuar para los servicios
        await expect(page.locator(".button.page_button.btn-action").last()).toBeVisible();
        await page.locator(".button.page_button.btn-action").last().click();

        await page.waitForSelector(".main-banner--section-offer");
        await page.waitForTimeout(8000);
        await page.takeScreenshot("Pagina-de-servicios");

    });
});