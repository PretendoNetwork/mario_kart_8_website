interface AppConfig {
    jwt_secret: string;
    grpc_host: string;
    grpc_port: number;
    grpc_api_key: string;
}

const app_config: AppConfig = {
    jwt_secret: process.env.MK8_JWT_SECRET ?? '',
    grpc_host: process.env.MK8_GRPC_HOST ?? '',
    grpc_port: Number(process.env.MK8_GRPC_PORT),
    grpc_api_key: process.env.MK8_GRPC_API_KEY ?? ''
}

export default app_config;