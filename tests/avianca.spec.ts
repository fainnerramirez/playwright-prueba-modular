import { test } from '../utils/test-extends';

test.describe('Comenzo prueba avianca', () => {
    test('prueba home avianca', async ({ page }) => {
        await page.configInitialTest();
        await page.homePageAvianca();
        await page.flightPageAvianca();
        await page.passengerPageAvianca();
        await page.waitForTimeout(5000);
    });
});
