import fs from 'fs';
import fetch from 'node-fetch';

export default async function globalSetup() {
    const proxyListApiUrl =
        'https://www.proxy-list.download/api/v1/get?type=http&anon=elite&country=US';

    try {
        const response = await fetch(proxyListApiUrl);
        const text = await response.text();

        const proxies = text
            .trim()
            .split('\n')
            .map(p => p.trim())
            .filter(Boolean);

        const selectedProxy = proxies[0]; // puedes implementar lógica para testear cuál funciona mejor

        if (!selectedProxy) throw new Error('❌ No se encontraron proxies válidos.');

        const envContent = `SELECTED_PROXY=http://${selectedProxy}`;
        fs.writeFileSync('.proxy-env', envContent);

        console.log(`✅ Proxy guardado: ${selectedProxy}`);
    } catch (err) {
        console.error('❌ Error al obtener el proxy:', err);
    }
}
