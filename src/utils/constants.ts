import { NextRequest } from "next/server";


/**
 * Returns the real IP address of the client.
 * @param request - The incoming request.
 * @param cfProxy - Whether the client is behind a Cloudflare proxy.
 * @returns The real IP address of the client.
*/
export function realIP(request: NextRequest, cfProxy = false): string {
    const FALLBACK_IP_ADDRESS = '0.0.0.0';
    const headers = request.headers;

    /**
     * Cloudflare only headers.
     */
    if (cfProxy && headers.has('cf-connecting-ip')) {
        return headers.get('cf-connecting-ip') ?? FALLBACK_IP_ADDRESS;
    }

    if (headers.has('x-real-ip')) {
        return headers.get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
    }

    if (headers.has('x-forwarded-for')) {
        return headers.get('x-forwarded-for') ?? FALLBACK_IP_ADDRESS;
    }

    if (headers.has('x-vercel-forwarded-for')) {
        return headers.get('x-vercel-forwarded-for') ?? FALLBACK_IP_ADDRESS;
    }

    if (headers.has('x-vercel-proxied-for')) {
        return headers.get('x-vercel-proxied-for') ?? FALLBACK_IP_ADDRESS;
    }

    /**
     * The fallback IP address.
     */

    // ts-ignore
    return FALLBACK_IP_ADDRESS;
}