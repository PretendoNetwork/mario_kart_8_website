import type { NextRequest } from 'next/server'
import app_config from '@/app.config';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';

export type JWTTokenPayload = {
    access_level: number;
    server_access_level: string;
    pnid: string;
    pid: number;
    mii_image_url: string;
}

export async function getMK8Token(request: NextRequest): Promise<JWTTokenPayload | null> {
    const mk8_token = request.cookies.get("mk8_token")?.value;
    if (!mk8_token) {
        return null;
    }

    try {
        const verifyResult = await jwtVerify(mk8_token, new TextEncoder().encode(app_config.jwt_secret));
        return verifyResult.payload as JWTTokenPayload;
    } catch (error) { }

    return null;
}

export async function getMK8TokenEx(mk8_token: string): Promise<JWTTokenPayload | null> {
    try {
        const verifyResult = await jwtVerify(mk8_token, new TextEncoder().encode(app_config.jwt_secret));
        return verifyResult.payload as JWTTokenPayload;
    } catch (error) { }

    return null;
}

export async function getMK8TokenFromAccountAPI(request: NextRequest): Promise<{ token: JWTTokenPayload, jwt_token: string } | null> {

    const token_type = request.cookies.get("token_type")?.value;
    const access_token = request.cookies.get("access_token")?.value;

    if (!token_type || !access_token) {
        return null;
    }

    try {
        var res = await fetch("https://api.pretendo.cc/v1/user", {
            headers: {
                "Authorization": `${token_type} ${access_token}`
            }
        })

        if (res.status == 200) {
            const userData = await res.json();
            const token_data: JWTTokenPayload = {
                access_level: userData["access_level"],
                server_access_level: userData["server_access_level"],
                pnid: userData["username"],
                pid: userData["pid"],
                mii_image_url: userData["mii"]["image_url"],
            }

            const token = await new SignJWT(token_data)
                .setProtectedHeader({ alg: 'HS256' })
                .setJti(nanoid())
                .setIssuedAt()
                .setExpirationTime('2h')
                .sign(new TextEncoder().encode(app_config.jwt_secret));

            return { token: token_data, jwt_token: token };
        }
    } catch (error) { }

    return null;
}