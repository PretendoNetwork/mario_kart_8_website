interface AppConfig {
    jwt_secret: string;
    grpc_host: string;
    grpc_port: number;
    grpc_api_key: string;
}

const app_config: AppConfig = {
    jwt_secret: "qsdqsdqsdqsdqsdqsdqsd",
    grpc_host: "localhost",
    grpc_port: 50051,
    grpc_api_key: "azeazeaz"
}

export default app_config;