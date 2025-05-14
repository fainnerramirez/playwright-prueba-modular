import fs from 'fs';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

export default async function globalSetup() {
    const proxyListApiUrl =
        'https://www.proxy-list.download/api/v1/get?type=http&anon=elite&country=US';

    try {
        const response = await fetch(proxyListApiUrl);
        const text = await response.text();
        //test1
        const proxies = text
            .trim()
            .split('\n')
            .map(p => p.trim())
            .filter(Boolean);

        console.log(`🔍 Obtenidos ${proxies.length} proxies. Probando validez...`);

        for (const proxy of proxies) {
            const proxyUrl = `http://${proxy}`;
            const agent = new HttpsProxyAgent(proxyUrl);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos

            try {
                const res = await fetch('https://www.google.com', {
                    agent,
                    signal: controller.signal,
                });

                clearTimeout(timeout);

                if (res.ok) {
                    fs.writeFileSync('.proxy-env', `SELECTED_PROXY=${proxyUrl}`);
                    console.log(`✅ Proxy funcional guardado: ${proxy}`);
                    return;
                }
            } catch (err) {
                console.warn(`❌ Proxy falló: ${proxy}`);
                clearTimeout(timeout);
                continue;
            }
        }

        console.error('❌ No se encontró ningún proxy funcional.');
    } catch (err) {
        console.error('❌ Error al obtener la lista de proxies:', err);
    }
}
