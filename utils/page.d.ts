import { ElementHandle, Locator, Page } from '@playwright/test';
import { copysType, Lang } from '../types/aviancaTypes';

declare module '@playwright/test' {
    interface Page {
        selectButtonAndClick(selector: string): Promise<void>;
        verifyCookies(): Promise<void>;
        isElementPresent(selector: string): Promise<boolean>;
        selectOriginFlight(origin: string): Promise<void>;
        selectDestinationFlight(destination: string): Promise<void>;
        selectDateInitFlight(copys: copysType): Promise<void>;
        selectDateEndFlight(date?: Date): Promise<void>;
        selectElementDOM(selector: string): Promise<ElementHandle<SVGElement | HTMLElement> | null>;
        setPhoto(photoName: string): Promise<void>;
        getTimestamp(): string;
        takeScreenshot(label: string): Promise<void>;
        getLangPage(): Promise<Lang>;
    }
}