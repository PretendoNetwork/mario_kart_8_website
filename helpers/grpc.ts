import { createChannel, createClient } from 'nice-grpc';
import { AmkjServiceClient, AmkjServiceDefinition } from '@/helpers/proto/generated/amkj_service';
import app_config from '@/app.config';

const channel = createChannel(`${app_config.grpc_host}:${app_config.grpc_port}`);
const amkj_grpc_client: AmkjServiceClient = createClient(AmkjServiceDefinition, channel);

export { amkj_grpc_client };