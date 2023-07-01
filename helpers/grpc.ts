import { createChannel, createClient, Metadata } from 'nice-grpc';
import { AmkjServiceClient, AmkjServiceDefinition, GetServerStatusResponse } from '@/helpers/proto/amkj_service';
import app_config from '@/app.config';

const channel = createChannel(`${app_config.grpc_host}:${app_config.grpc_port}`);
const amkj_grpc_client: AmkjServiceClient = createClient(AmkjServiceDefinition, channel);

export { amkj_grpc_client };