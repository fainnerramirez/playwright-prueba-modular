import fs from 'fs';
import fetch from 'node-fetch';
import { chromium } from 'playwright-extra';
import stealth from 'playwright-extra-plugin-stealth';

chromium.use(stealth());

export default async function globalSetup() {
    const momoProxyUrl = 'https://api.momoproxy.com/ips?cty=any&cnt=20&ft=txt&split=%0A&rp=2&ts=20&key=5nLiUqOK';

    try {
        const response = await fetch(momoProxyUrl);
        const text = await response.text();
        const proxies = text.trim().split('\n');
        const selectedProxy = proxies[0];
        const envContent = `SELECTED_PROXY=http://${selectedProxy}`;

        fs.writeFileSync('.proxy-env', envContent); // Guardamos una variable temporal

        console.log(`✅ Proxy guardado: ${selectedProxy}`);
    } catch (err) {
        console.error('❌ No se pudo obtener el proxy:', err);
    }
}
