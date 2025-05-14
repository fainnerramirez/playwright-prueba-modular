import fs from 'fs';
import fetch from 'node-fetch';
import type { GimmeProxyResponse } from "./types/aviancaTypes";

export default async function globalSetup() {
    const gimmeProxyUrl = 'https://gimmeproxy.com/api/getProxy?supportsHttps=true&anonymityLevel=1';

    try {
        const response = await fetch(gimmeProxyUrl);
        const proxyData = await response.json() as GimmeProxyResponse;

        if (proxyData.error) {
            throw new Error(proxyData.error);
        }

        const selectedProxy = `${proxyData.protocol}://${proxyData.ip}:${proxyData.port}`;
        const envContent = `SELECTED_PROXY=${selectedProxy}`;

        fs.writeFileSync('.proxy-env', envContent); // Guardamos la variable temporal

        console.log(`✅ Proxy guardado: ${selectedProxy}`);
    } catch (err) {
        console.error('❌ No se pudo obtener el proxy:', err);
    }
}
