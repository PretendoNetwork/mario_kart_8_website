interface AppConfig {
    jwt_secret: string;

    /** GRPC host of the MK8 GRPC service. Example: `localhost:8080` */
    mk8_grpc_host: string;

    /** API key of the MK8 GRPC service */
    mk8_grpc_api_key: string;

    /** GRPC host of the account service GRPC service. Example: `localhost:8080` */
    account_grpc_host: string;
}

const app_config: AppConfig = {
    jwt_secret: process.env.MK8_JWT_SECRET ?? '',

    mk8_grpc_host: process.env.MK8_GRPC_HOST ?? '',
    mk8_grpc_api_key: process.env.MK8_GRPC_API_KEY ?? '',
    account_grpc_host: process.env.MK8_ACCOUNT_GRPC_HOST ?? '',
}

export default app_config;