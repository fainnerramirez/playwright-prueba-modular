import fs from 'fs';
import fetch from 'node-fetch'; 

export default async function globalSetup() {
    const proxyList: Array<string> = [
        '185.226.204.160:5713',
        '103.210.206.26:8080',
        '156.228.116.140:3128',
        '122.52.141.182:8080',
        '162.220.246.225:6509',
        '91.185.236.24:4145'
    ];

    const MAX_RETRIES = 5;
    let retries = 0;
    let selectedProxy: string | null = null;

    while (retries < MAX_RETRIES && !selectedProxy) {
        try {
            selectedProxy = proxyList[Math.floor(Math.random() * proxyList.length)];

            const proxyUrl = `http://${selectedProxy}`;
            const testUrl = 'https://httpbin.org/ip'; 

            const res = await fetch(testUrl, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                agent: new (require('https').Agent)({ proxy: proxyUrl })
            });

            if (!res.ok) {
                throw new Error(`Proxy no funcional: ${selectedProxy}`);
            }

            fs.writeFileSync('.proxy-env', `SELECTED_PROXY=http://${selectedProxy}`);
            console.log(`✅ Proxy guardado: ${selectedProxy}`);
            
        } catch (err) {
            retries++;
            console.error(`❌ Intento ${retries} de ${MAX_RETRIES}: No se pudo obtener un proxy funcional: ${err}`);
            if (retries < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                throw new Error('No se pudo obtener un proxy funcional después de varios intentos');
            }
        }
    }
}