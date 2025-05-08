import { test, expect } from '@playwright/test';

test.describe('Comenzo prueba avianca', () => {
    test('prueba home avianca', async ({ page }) => {
        test.setTimeout(300_000);

        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.goto('https://www.avianca.com/');
        await page.takeScreenshot('página-principal-avianca');
        await page.verifyCookies();

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

        await page.selectFlightsOneWay();
        await page.takeScreenshot('seleccion-vuelo-ida');

        await page.selectFlightReturns();
        await page.takeScreenshot("seleccion-vuelo-regreso");

        await page.waitForTimeout(500);
        await page.takeScreenshot('resumen-de-vuelos-seleccionados');

        //boton de continuar
        await page.selectButtonAndClick(".button.page_button.btn-action");

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

            const getDataRandom = (data: Array<string> = []): string => {
                return data[Math.floor(Math.random() * data.length)];
            }

            const getValueElement = (element: HTMLInputElement): string => {
                let value: string | null = null;
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
                Array.from(elements).forEach((element, index) => {
                    if (element.tagName === "BUTTON") {
                        (element as HTMLButtonElement).click();
                        const listOptions = document.querySelector(".ui-dropdown_list");
                        (listOptions?.querySelector(".ui-dropdown_item>button") as HTMLButtonElement).click();
                    }
                    else if (element.tagName === "INPUT") {
                        const containers = document.querySelectorAll(".ui-input-container");
                        Array.from(containers).forEach(e => { e.classList.add("is-focused") });
                        let eventBlur: Event = new Event("blur");
                        let eventFocus: Event = new Event("focus");
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