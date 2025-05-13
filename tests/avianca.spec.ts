import { test } from '../utils/test-extends';

test.describe('página de avianca', () => {
    test('test flujos de avianca', async ({ page }) => {
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });
        await page.goto('https://www.avianca.com/');
        await page.takeScreenshot('página-principal-avianca');
        await page.verifyCookies();
        await page.homePageAvianca();
        await page.flightPageAvianca();
        await page.passengerPageAvianca();
        // await page.servicesPageAvianca();
        // await page.seatingPageAvianca();
        // await page.paymentPageAvianca();
    });
});