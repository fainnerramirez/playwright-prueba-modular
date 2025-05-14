// import fs from 'fs';
// import fetch from 'node-fetch';
// import type { GimmeProxyResponse } from './types/aviancaTypes'; // Asegúrate de tener el tipo definido

// export default async function globalSetup() {
//     const gimmeProxyUrl = 'https://gimmeproxy.com/api/getProxy?supportsHttps=true&anonymityLevel=1';
//     const MAX_RETRIES = 5;
//     let retries = 0;
//     let proxyData: GimmeProxyResponse | null = null;

//     while (retries < MAX_RETRIES && !proxyData) {
//         try {
//             const response = await fetch(gimmeProxyUrl);
//             proxyData = await response.json() as GimmeProxyResponse;

//             if (proxyData.error) {
//                 throw new Error(proxyData.error);
//             }

//             const selectedProxy = `${proxyData.protocol}://${proxyData.ip}:${proxyData.port}`;
//             fs.writeFileSync('.proxy-env', `SELECTED_PROXY=${selectedProxy}`);

//             console.log(`✅ Proxy guardado: ${selectedProxy}`);
//         } catch (err) {
//             retries++;
//             console.error(`❌ Intento ${retries} de ${MAX_RETRIES}: No se pudo obtener el proxy:`, err);
//             if (retries < MAX_RETRIES) {
//                 // Espera 5 segundos antes de intentar nuevamente
//                 await new Promise(resolve => setTimeout(resolve, 5000));
//             } else {
//                 throw new Error('No se pudo obtener un proxy después de varios intentos');
//             }
//         }
//     }
// }


import fs from 'fs';
import fetch from 'node-fetch'; // Aunque no es necesario si ya tienes la lista de proxies, se mantiene por si en el futuro necesitas hacer algo similar.

export default async function globalSetup() {
    const proxyList = [
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
            // Selecciona un proxy aleatorio de la lista
            selectedProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
            
            // Aquí puedes agregar lógica para verificar si el proxy funciona o si quieres probar varios antes de elegir uno.
            // Por ejemplo, una petición HTTP para verificar que el proxy es funcional, pero aquí se simplifica solo seleccionando uno.

            // Guarda el proxy seleccionado en el archivo .proxy-env
            fs.writeFileSync('.proxy-env', `SELECTED_PROXY=${selectedProxy}`);

            console.log(`✅ Proxy guardado: ${selectedProxy}`);
        } catch (err) {
            retries++;
            console.error(`❌ Intento ${retries} de ${MAX_RETRIES}: No se pudo guardar el proxy: ${err}`);
            if (retries < MAX_RETRIES) {
                // Espera 5 segundos antes de intentar nuevamente
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                throw new Error('No se pudo guardar un proxy después de varios intentos');
            }
        }
    }
}
