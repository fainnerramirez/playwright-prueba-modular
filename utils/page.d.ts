import { ElementHandle, Locator, Page } from '@playwright/test';
import { copysType, Lang } from '../types/aviancaTypes';

declare module '@playwright/test' {
    interface Page {
        //#region métodos genéricos  
        isElementPresent(selector: string): Promise<boolean>;
        verifyCookies(): Promise<void>;
        selectButtonAndClick(selector: string): Promise<void>;
        selectElementDOM(selector: string): Promise<ElementHandle<SVGElement | HTMLElement> | null>;
        getTimestamp(): string;
        takeScreenshot(label: string): Promise<void>;
        getLangPage(): Promise<Lang>;
        //#endregion

        //#region métodos Home
        selectCheckOneWay(): Promise<void>;
        selectCheckWayReturn(): Promise<void>;
        selectOriginFlight(): Promise<void>;
        selectDestinationFlight(): Promise<void>;
        selectDateInitFlight(): Promise<void>;
        selectDateEndFlight(): Promise<void>;
        selectPassengers(): Promise<void>;
        //#endregion

        //#region métodos

        selectFlightsOneWay(): Promise<void>;
        selectFlightReturns(): Promise<void>;
        validateModalSelectionFlight(): Promise<void>;

        //#endregion
    }
}