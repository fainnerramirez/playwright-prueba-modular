import { test as base, expect } from '@playwright/test';
import type { copysType, Lang } from '../types/aviancaTypes';

export const test = base.extend({
    page: async ({ page }, use, testInfo) => {

        let step = 0;

        page.getTimestamp = (): string => {
            const now = new Date();
            const pad = (n: number) => n.toString().padStart(2, '0');
            const dd = pad(now.getDate());
            const mm = pad(now.getMonth() + 1);
            const yyyy = now.getFullYear();
            const hh = pad(now.getHours());
            const mi = pad(now.getMinutes());
            const ss = pad(now.getSeconds());
            return `fecha-${dd}-${mm}-${yyyy}_hora-${hh}-${mi}-${ss}`;
        }

        page.takeScreenshot = async (label: string): Promise<void> => {
            step++;
            const timestamp = page.getTimestamp();
            const name = `step${step}-${label}-${timestamp}.png`;
            const buffer = await page.screenshot({ path: name });
            await testInfo.attach(`${label} (${timestamp})`, {
                body: buffer,
                contentType: 'image/png',
            });
        };

        page.verifyCookies = async (): Promise<void> => {
            const consentBtn = page.locator('#onetrust-pc-btn-handler');
            if (await consentBtn.isVisible()) {
                await consentBtn.click();
                await page.locator('.save-preference-btn-handler.onetrust-close-btn-handler').click();
            }
        }

        page.getLangPage = async (): Promise<Lang> => {
            const responseLang = await page.evaluate(() => {
                const lang = document.querySelector("html")?.getAttribute("lang")?.toLowerCase();
                if (lang?.includes("-")) {
                    return lang.split("-")[1].toLowerCase();
                }
                return lang;
            }) as Lang;

            return responseLang;
        }

        page.selectDateInitFlight = async (copys: copysType): Promise<void> => {
            const currentLang = await page.getLangPage();
            await expect(page.locator('.content-wrap')).toBeVisible();
            await expect(page.locator('#originBtn')).toBeVisible();
            const origen = page.getByPlaceholder((copys[currentLang]).origen);
            await page.locator('button#originBtn').click();
            await origen.fill(copys['ciudad_origen']);
            await origen.press('Enter');
            await (page.locator('id=' + copys['ciudad_origen'])).click();
        }

        await use(page);
    }
});

export { expect } from '@playwright/test';