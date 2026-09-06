import { createChannel, createClient, Metadata } from 'nice-grpc';
import { AmkjServiceClient, AmkjServiceDefinition } from '@/helpers/proto/generated/amkj_service';
import { APIDefinition } from '@pretendonetwork/grpc/api/api_service';
import app_config from '@/app.config';

const amkjChannel = createChannel(app_config.mk8_grpc_host);
export const amkjGrpcClientWithToken: AmkjServiceClient = createClient(AmkjServiceDefinition, amkjChannel, {
    "*": {
        metadata: Metadata({
            "X-API-Key": app_config.mk8_grpc_api_key
        })
    }
});

const accountApiChannel = createChannel(app_config.account_grpc_host);
export const legacyApiGrpcClient = createClient(APIDefinition, accountApiChannel);
