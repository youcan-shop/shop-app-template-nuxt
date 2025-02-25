import * as qantra from '@youcan/qantra'

export default defineNuxtPlugin(() => {
    const originalFetch = window.fetch;

    const patchedFetch: typeof originalFetch = async function(input: RequestInfo | URL, init?: RequestInit) {
        const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : null;
        const newInit = init || { headers: {} };

        // An internal request to the server
        if (urlString && urlString.startsWith('/'))
        {
            const sessionToken = await qantra.sessionToken();
            const authorizationValue = `Bearer ${sessionToken}`;

            if (newInit.headers instanceof Headers) {
                newInit.headers.append('Authorization', authorizationValue);
            }

            if (Array.isArray(newInit.headers)) {
                newInit.headers = [ ...newInit.headers, ['Authorization', authorizationValue]];
            }

            newInit.headers = { ...newInit.headers, 'Authorization': authorizationValue };
        }
        
        return originalFetch(input, newInit);
    }

    window.fetch = patchedFetch;
});
