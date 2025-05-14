import fs from 'fs';
import fetch from 'node-fetch';
import type { GimmeProxyResponse } from './types/aviancaTypes'; // Asegúrate de tener el tipo definido

export default async function globalSetup() {
    const gimmeProxyUrl = 'https://gimmeproxy.com/api/getProxy?supportsHttps=true&anonymityLevel=1';
    const MAX_RETRIES = 5;
    let retries = 0;
    let proxyData: GimmeProxyResponse | null = null;

    while (retries < MAX_RETRIES && !proxyData) {
        try {
            const response = await fetch(gimmeProxyUrl);
            proxyData = await response.json() as GimmeProxyResponse;

            if (proxyData.error) {
                throw new Error(proxyData.error);
            }

            const selectedProxy = `${proxyData.protocol}://${proxyData.ip}:${proxyData.port}`;
            fs.writeFileSync('.proxy-env', `SELECTED_PROXY=${selectedProxy}`);

            console.log(`✅ Proxy guardado: ${selectedProxy}`);
        } catch (err) {
            retries++;
            console.error(`❌ Intento ${retries} de ${MAX_RETRIES}: No se pudo obtener el proxy:`, err);
            if (retries < MAX_RETRIES) {
                // Espera 5 segundos antes de intentar nuevamente
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                throw new Error('No se pudo obtener un proxy después de varios intentos');
            }
        }
    }
}
