interface AppConfig {
    /** Port that the webserver is running on */
    serverPort: number;

    /** Secret for internal communication */
    internal_secret_key: string;

    /** Secret signing key for JWT cookie */
    jwt_secret: string;

    /** GRPC host of the MK8 GRPC service. Example: `localhost:8080` */
    mk8_grpc_host: string;

    /** API key of the MK8 GRPC service */
    mk8_grpc_api_key: string;

    /** GRPC host of the account service GRPC service. Example: `localhost:8080` */
    account_grpc_host: string;

    /** Base URL of the Mii image CDN, must be the same as the account service. Example: `https://r2-cdn.pretendo.cc` */
    cdn_base_url: string;
}

const app_config: AppConfig = {
    serverPort: Number(process.env.PORT) || 3000,
    internal_secret_key: process.env.MK8_INTERNAL_SECRET_KEY ?? '',
    jwt_secret: process.env.MK8_JWT_SECRET ?? '',
    cdn_base_url: process.env.MK8_CDN_BASE_URL ?? '',

    mk8_grpc_host: process.env.MK8_GRPC_HOST ?? '',
    mk8_grpc_api_key: process.env.MK8_GRPC_API_KEY ?? '',
    account_grpc_host: process.env.MK8_ACCOUNT_GRPC_HOST ?? '',
}

export default app_config;