import type { NextRequest } from 'next/server'
import app_config from '@/app.config';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';
import { legacyApiGrpcClient } from '../grpc';
import { Metadata } from 'nice-grpc';

export type JWTTokenPayload = {
    access_level: number;
    server_access_level: string;
    pnid: string;
    pid: number;
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
    const access_token = request.cookies.get("access_token")?.value;

    if (!access_token) {
        return null;
    }

    try {
        const userData = await legacyApiGrpcClient.getUserData({}, {
            metadata: Metadata({
                "X-Token": access_token
            })
        })
        const token_data: JWTTokenPayload = {
            access_level: userData.accessLevel,
            server_access_level: userData.serverAccessLevel,
            pnid: userData.username,
            pid: userData.pid
        }

        const token = await new SignJWT(token_data)
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(new TextEncoder().encode(app_config.jwt_secret));

        return { token: token_data, jwt_token: token };
    } catch (error) { }

    return null;
}

export function getMiiImageFromPid(pid: number) {
    return `${app_config.cdn_base_url}/mii/${pid}/normal_face.png`
}