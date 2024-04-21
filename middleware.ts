import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { type JWTTokenPayload, getMK8Token, getMK8TokenFromAccountAPI } from "./helpers/types/JWTTokenPayload";

export async function middleware(request: NextRequest) {
	const nextPathname = request.nextUrl.pathname;
	const allowedPIDs: number[] = [1606041002]; // PretendoRambo3

	if (nextPathname.startsWith("/logout")) {
		const url = new URL("/", request.url);
		const response = NextResponse.redirect(url);

		response.cookies.set("mk8_token", "", { maxAge: 0, domain: ".pretendo.network" });
		response.cookies.set("access_token", "", { maxAge: 0, domain: ".pretendo.network" });
		response.cookies.set("refresh_token", "", { maxAge: 0, domain: ".pretendo.network" });
		response.cookies.set("token_type", "", { maxAge: 0, domain: ".pretendo.network" });
		return response;
	}

	const hostname = request.nextUrl.hostname;
	const redirect_login_url = `https://${hostname.substring(hostname.indexOf(".") + 1)}/account/login?redirect=http://${hostname}`;

	var mk8_token: JWTTokenPayload | null = await getMK8Token(request);
	let res;
	if (!mk8_token) {
		res = await getMK8TokenFromAccountAPI(request);
		if (!res && nextPathname.startsWith("/admin")) {
			const response = NextResponse.redirect(redirect_login_url);
			if (request.cookies.has("mk8_token")) {
				response.cookies.delete("mk8_token");
			}
			return response;
		}
		if (res) {
			mk8_token = res.token;
		}
	}

	if (nextPathname.startsWith("/dashboard") && !mk8_token) {
		const url = new URL("/", request.url);
		return NextResponse.redirect(url);
	}

	if (nextPathname.startsWith("/api/admin")) {
		if (mk8_token) {
			if (nextPathname.startsWith("/api/admin/userdata")) {
				return NextResponse.next();
			} else if (mk8_token.access_level >= 3) {
				return NextResponse.next();
			} else {
				return new NextResponse("{}", { status: 401 });
			}
		} else {
			return new NextResponse("{}", { status: 401 });
		}
	}

	if (nextPathname.startsWith("/admin")) {
		if (mk8_token) {
			const isAdmin = mk8_token.access_level >= 3 || allowedPIDs.includes(mk8_token.pid);
			if (!isAdmin) {
				var response = NextResponse.redirect(new URL("/", request.url));
			} else {
				var response = NextResponse.next();
			}

			response.headers.set("X-MK8-Pretendo-ACL", mk8_token.access_level.toString());
			response.headers.set("X-MK8-Pretendo-Username", mk8_token.pnid);
			response.headers.set("X-MK8-Pretendo-ImageURL", mk8_token.mii_image_url);
			response.headers.set("X-MK8-Pretendo-PID", mk8_token.pid.toString());
			if (res) {
				response.cookies.set("mk8_token", res.jwt_token, { domain: ".pretendo.network" });
			}
			return response;
		} else {
			const response = NextResponse.redirect(redirect_login_url);
			if (request.cookies.has("mk8_token")) {
				response.cookies.delete("mk8_token");
			}
			return response;
		}
	} else {
		const response = NextResponse.next();
		if (mk8_token) {
			response.headers.set("X-MK8-Pretendo-ACL", mk8_token.access_level.toString());
			response.headers.set("X-MK8-Pretendo-Username", mk8_token.pnid);
			response.headers.set("X-MK8-Pretendo-ImageURL", mk8_token.mii_image_url);
			response.headers.set("X-MK8-Pretendo-PID", mk8_token.pid.toString());
		}
		if (res) {
			response.cookies.set("mk8_token", res.jwt_token, { domain: ".pretendo.network" });
		}
		return response;
	}
}
export const config = {
	matcher: ["/", "/logout", "/api/:path*", "/admin/:path*", "/dashboard/:path*", "/tournaments/:path*", "/gatherings/:path*", "/rankings/:path*"],
};
