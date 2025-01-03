/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { CallContext, CallOptions } from "nice-grpc-common";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "amkj";

export interface GetServerStatusRequest {}

export interface GetServerStatusResponse {
	isOnline: boolean;
	isMaintenance: boolean;
	isWhitelist: boolean;
	numClients: number;
	startMaintenanceTime: Date | undefined;
	endMaintenanceTime: Date | undefined;
}

export interface StartMaintenanceRequest {
	utcStartMaintenanceTime: Date | undefined;
	utcEndMaintenanceTime: Date | undefined;
}

export interface StartMaintenanceResponse {}

export interface EndMaintenanceRequest {}

export interface EndMaintenanceResponse {}

export interface ToggleWhitelistRequest {}

export interface ToggleWhitelistResponse {
	isWhitelist: boolean;
}

export interface GetWhitelistRequest {}

export interface GetWhitelistResponse {
	pids: number[];
}

export interface AddWhitelistUserRequest {
	pid: number;
}

export interface AddWhitelistUserResponse {}

export interface DelWhitelistUserRequest {
	pid: number;
}

export interface DelWhitelistUserResponse {}

export interface GetAllUsersRequest {}

export interface GetAllUsersResponse {
	pids: number[];
}

export interface KickUserRequest {
	pid: number;
}

export interface KickUserResponse {
	wasConnected: boolean;
}

export interface KickAllUsersRequest {}

export interface KickAllUsersResponse {
	numKicked: number;
}

export interface GatheringParticipant {
	pid: number;
	miiName: string;
}

export interface Gathering {
	gid: number;
	host: number;
	owner: number;
	attributes: number[];
	gameMode: number;
	appData: Uint8Array;
	players: GatheringParticipant[];
	minParticipants: number;
	maxParticipants: number;
}

export interface GetAllGatheringsRequest {
	offset: number;
	limit: number;
}

export interface GetAllGatheringsResponse {
	gatherings: Gathering[];
}

export interface Tournament {
	id: number;
	owner: number;
	attributes: number[];
	communityCode: string;
	appData: Uint8Array;
	totalParticipants: number;
	seasonId: number;
	name: string;
	description: string;
	redTeam: string;
	blueTeam: string;
	repeatType: number;
	gamesetNum: number;
	iconType: number;
	battleTime: number;
	updateDate: number;
	startDayTime: number;
	endDayTime: number;
	startTime: number;
	endTime: number;
	startDateTime: Date | undefined;
	endDateTime: Date | undefined;
}

export interface GetAllTournamentsRequest {
	offset: number;
	limit: number;
}

export interface GetAllTournamentsResponse {
	tournaments: Tournament[];
}

export interface GetUnlocksRequest {
	pid: number;
}

export interface GetUnlocksResponse {
	hasData: boolean;
	vrRate: number;
	brRate: number;
	lastUpdate: Date | undefined;
	gpUnlocks: number[];
	engineUnlocks: number[];
	driverUnlocks: number[];
	bodyUnlocks: number[];
	tireUnlocks: number[];
	wingUnlocks: number[];
	stampUnlocks: number[];
	dlcUnlocks: number[];
}

export interface TimeTrialRanking {
	rank: number;
	datetime: Date | undefined;
	score: number;
	pid: number;
	commonData: Uint8Array;
}

export interface GetTimeTrialRankingRequest {
	track: number;
	limit: number;
	asc: boolean;
}

export interface GetTimeTrialRankingResponse {
	rankings: TimeTrialRanking[];
}

export interface DeleteTimeTrialRankingRequest {
	track: number;
	pid: number;
}

export interface DeleteTimeTrialRankingResponse {}

export interface DeleteAllTimeTrialRankingsRequest {
	pid: number;
}

export interface DeleteAllTimeTrialRankingsResponse {}

export interface IssueBanRequest {
	pid: number;
	startTime: Date | undefined;
	endTime?: Date | undefined;
	reason: string;
}

export interface IssueBanResponse {}

export interface ClearBanRequest {
	pid: number;
}

export interface ClearBanResponse {}

export interface Ban {
	pid: number;
	startTime: Date | undefined;
	endTime?: Date | undefined;
	reason: string;
}

export interface GetAllBansRequest {
	offset: number;
	limit: number;
}

export interface GetAllBansResponse {
	bans: Ban[];
}

function createBaseGetServerStatusRequest(): GetServerStatusRequest {
	return {};
}

export const GetServerStatusRequest = {
	encode(_: GetServerStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetServerStatusRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetServerStatusRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): GetServerStatusRequest {
		return {};
	},

	toJSON(_: GetServerStatusRequest): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<GetServerStatusRequest>): GetServerStatusRequest {
		const message = createBaseGetServerStatusRequest();
		return message;
	},
};

function createBaseGetServerStatusResponse(): GetServerStatusResponse {
	return {
		isOnline: false,
		isMaintenance: false,
		isWhitelist: false,
		numClients: 0,
		startMaintenanceTime: undefined,
		endMaintenanceTime: undefined,
	};
}

export const GetServerStatusResponse = {
	encode(message: GetServerStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.isOnline === true) {
			writer.uint32(8).bool(message.isOnline);
		}
		if (message.isMaintenance === true) {
			writer.uint32(16).bool(message.isMaintenance);
		}
		if (message.isWhitelist === true) {
			writer.uint32(24).bool(message.isWhitelist);
		}
		if (message.numClients !== 0) {
			writer.uint32(32).int32(message.numClients);
		}
		if (message.startMaintenanceTime !== undefined) {
			Timestamp.encode(toTimestamp(message.startMaintenanceTime), writer.uint32(42).fork()).ldelim();
		}
		if (message.endMaintenanceTime !== undefined) {
			Timestamp.encode(toTimestamp(message.endMaintenanceTime), writer.uint32(50).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetServerStatusResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetServerStatusResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.isOnline = reader.bool();
					break;
				case 2:
					message.isMaintenance = reader.bool();
					break;
				case 3:
					message.isWhitelist = reader.bool();
					break;
				case 4:
					message.numClients = reader.int32();
					break;
				case 5:
					message.startMaintenanceTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 6:
					message.endMaintenanceTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetServerStatusResponse {
		return {
			isOnline: isSet(object.isOnline) ? Boolean(object.isOnline) : false,
			isMaintenance: isSet(object.isMaintenance) ? Boolean(object.isMaintenance) : false,
			isWhitelist: isSet(object.isWhitelist) ? Boolean(object.isWhitelist) : false,
			numClients: isSet(object.numClients) ? Number(object.numClients) : 0,
			startMaintenanceTime: isSet(object.startMaintenanceTime) ? fromJsonTimestamp(object.startMaintenanceTime) : undefined,
			endMaintenanceTime: isSet(object.endMaintenanceTime) ? fromJsonTimestamp(object.endMaintenanceTime) : undefined,
		};
	},

	toJSON(message: GetServerStatusResponse): unknown {
		const obj: any = {};
		message.isOnline !== undefined && (obj.isOnline = message.isOnline);
		message.isMaintenance !== undefined && (obj.isMaintenance = message.isMaintenance);
		message.isWhitelist !== undefined && (obj.isWhitelist = message.isWhitelist);
		message.numClients !== undefined && (obj.numClients = Math.round(message.numClients));
		message.startMaintenanceTime !== undefined && (obj.startMaintenanceTime = message.startMaintenanceTime.toISOString());
		message.endMaintenanceTime !== undefined && (obj.endMaintenanceTime = message.endMaintenanceTime.toISOString());
		return obj;
	},

	fromPartial(object: DeepPartial<GetServerStatusResponse>): GetServerStatusResponse {
		const message = createBaseGetServerStatusResponse();
		message.isOnline = object.isOnline ?? false;
		message.isMaintenance = object.isMaintenance ?? false;
		message.isWhitelist = object.isWhitelist ?? false;
		message.numClients = object.numClients ?? 0;
		message.startMaintenanceTime = object.startMaintenanceTime ?? undefined;
		message.endMaintenanceTime = object.endMaintenanceTime ?? undefined;
		return message;
	},
};

function createBaseStartMaintenanceRequest(): StartMaintenanceRequest {
	return { utcStartMaintenanceTime: undefined, utcEndMaintenanceTime: undefined };
}

export const StartMaintenanceRequest = {
	encode(message: StartMaintenanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.utcStartMaintenanceTime !== undefined) {
			Timestamp.encode(toTimestamp(message.utcStartMaintenanceTime), writer.uint32(10).fork()).ldelim();
		}
		if (message.utcEndMaintenanceTime !== undefined) {
			Timestamp.encode(toTimestamp(message.utcEndMaintenanceTime), writer.uint32(18).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): StartMaintenanceRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseStartMaintenanceRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.utcStartMaintenanceTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 2:
					message.utcEndMaintenanceTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): StartMaintenanceRequest {
		return {
			utcStartMaintenanceTime: isSet(object.utcStartMaintenanceTime) ? fromJsonTimestamp(object.utcStartMaintenanceTime) : undefined,
			utcEndMaintenanceTime: isSet(object.utcEndMaintenanceTime) ? fromJsonTimestamp(object.utcEndMaintenanceTime) : undefined,
		};
	},

	toJSON(message: StartMaintenanceRequest): unknown {
		const obj: any = {};
		message.utcStartMaintenanceTime !== undefined && (obj.utcStartMaintenanceTime = message.utcStartMaintenanceTime.toISOString());
		message.utcEndMaintenanceTime !== undefined && (obj.utcEndMaintenanceTime = message.utcEndMaintenanceTime.toISOString());
		return obj;
	},

	fromPartial(object: DeepPartial<StartMaintenanceRequest>): StartMaintenanceRequest {
		const message = createBaseStartMaintenanceRequest();
		message.utcStartMaintenanceTime = object.utcStartMaintenanceTime ?? undefined;
		message.utcEndMaintenanceTime = object.utcEndMaintenanceTime ?? undefined;
		return message;
	},
};

function createBaseStartMaintenanceResponse(): StartMaintenanceResponse {
	return {};
}

export const StartMaintenanceResponse = {
	encode(_: StartMaintenanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): StartMaintenanceResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseStartMaintenanceResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): StartMaintenanceResponse {
		return {};
	},

	toJSON(_: StartMaintenanceResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<StartMaintenanceResponse>): StartMaintenanceResponse {
		const message = createBaseStartMaintenanceResponse();
		return message;
	},
};

function createBaseEndMaintenanceRequest(): EndMaintenanceRequest {
	return {};
}

export const EndMaintenanceRequest = {
	encode(_: EndMaintenanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): EndMaintenanceRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseEndMaintenanceRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): EndMaintenanceRequest {
		return {};
	},

	toJSON(_: EndMaintenanceRequest): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<EndMaintenanceRequest>): EndMaintenanceRequest {
		const message = createBaseEndMaintenanceRequest();
		return message;
	},
};

function createBaseEndMaintenanceResponse(): EndMaintenanceResponse {
	return {};
}

export const EndMaintenanceResponse = {
	encode(_: EndMaintenanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): EndMaintenanceResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseEndMaintenanceResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): EndMaintenanceResponse {
		return {};
	},

	toJSON(_: EndMaintenanceResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<EndMaintenanceResponse>): EndMaintenanceResponse {
		const message = createBaseEndMaintenanceResponse();
		return message;
	},
};

function createBaseToggleWhitelistRequest(): ToggleWhitelistRequest {
	return {};
}

export const ToggleWhitelistRequest = {
	encode(_: ToggleWhitelistRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ToggleWhitelistRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseToggleWhitelistRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): ToggleWhitelistRequest {
		return {};
	},

	toJSON(_: ToggleWhitelistRequest): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<ToggleWhitelistRequest>): ToggleWhitelistRequest {
		const message = createBaseToggleWhitelistRequest();
		return message;
	},
};

function createBaseToggleWhitelistResponse(): ToggleWhitelistResponse {
	return { isWhitelist: false };
}

export const ToggleWhitelistResponse = {
	encode(message: ToggleWhitelistResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.isWhitelist === true) {
			writer.uint32(8).bool(message.isWhitelist);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ToggleWhitelistResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseToggleWhitelistResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.isWhitelist = reader.bool();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ToggleWhitelistResponse {
		return {
			isWhitelist: isSet(object.isWhitelist) ? Boolean(object.isWhitelist) : false,
		};
	},

	toJSON(message: ToggleWhitelistResponse): unknown {
		const obj: any = {};
		message.isWhitelist !== undefined && (obj.isWhitelist = message.isWhitelist);
		return obj;
	},

	fromPartial(object: DeepPartial<ToggleWhitelistResponse>): ToggleWhitelistResponse {
		const message = createBaseToggleWhitelistResponse();
		message.isWhitelist = object.isWhitelist ?? false;
		return message;
	},
};

function createBaseGetWhitelistRequest(): GetWhitelistRequest {
	return {};
}

export const GetWhitelistRequest = {
	encode(_: GetWhitelistRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetWhitelistRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetWhitelistRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): GetWhitelistRequest {
		return {};
	},

	toJSON(_: GetWhitelistRequest): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<GetWhitelistRequest>): GetWhitelistRequest {
		const message = createBaseGetWhitelistRequest();
		return message;
	},
};

function createBaseGetWhitelistResponse(): GetWhitelistResponse {
	return { pids: [] };
}

export const GetWhitelistResponse = {
	encode(message: GetWhitelistResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		writer.uint32(10).fork();
		for (const v of message.pids) {
			writer.uint32(v);
		}
		writer.ldelim();
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetWhitelistResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetWhitelistResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.pids.push(reader.uint32());
						}
					} else {
						message.pids.push(reader.uint32());
					}
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetWhitelistResponse {
		return {
			pids: Array.isArray(object?.pids) ? object.pids.map((e: any) => Number(e)) : [],
		};
	},

	toJSON(message: GetWhitelistResponse): unknown {
		const obj: any = {};
		if (message.pids) {
			obj.pids = message.pids.map((e) => Math.round(e));
		} else {
			obj.pids = [];
		}
		return obj;
	},

	fromPartial(object: DeepPartial<GetWhitelistResponse>): GetWhitelistResponse {
		const message = createBaseGetWhitelistResponse();
		message.pids = object.pids?.map((e) => e) || [];
		return message;
	},
};

function createBaseAddWhitelistUserRequest(): AddWhitelistUserRequest {
	return { pid: 0 };
}

export const AddWhitelistUserRequest = {
	encode(message: AddWhitelistUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): AddWhitelistUserRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseAddWhitelistUserRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): AddWhitelistUserRequest {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
		};
	},

	toJSON(message: AddWhitelistUserRequest): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		return obj;
	},

	fromPartial(object: DeepPartial<AddWhitelistUserRequest>): AddWhitelistUserRequest {
		const message = createBaseAddWhitelistUserRequest();
		message.pid = object.pid ?? 0;
		return message;
	},
};

function createBaseAddWhitelistUserResponse(): AddWhitelistUserResponse {
	return {};
}

export const AddWhitelistUserResponse = {
	encode(_: AddWhitelistUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): AddWhitelistUserResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseAddWhitelistUserResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): AddWhitelistUserResponse {
		return {};
	},

	toJSON(_: AddWhitelistUserResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<AddWhitelistUserResponse>): AddWhitelistUserResponse {
		const message = createBaseAddWhitelistUserResponse();
		return message;
	},
};

function createBaseDelWhitelistUserRequest(): DelWhitelistUserRequest {
	return { pid: 0 };
}

export const DelWhitelistUserRequest = {
	encode(message: DelWhitelistUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): DelWhitelistUserRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseDelWhitelistUserRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): DelWhitelistUserRequest {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
		};
	},

	toJSON(message: DelWhitelistUserRequest): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		return obj;
	},

	fromPartial(object: DeepPartial<DelWhitelistUserRequest>): DelWhitelistUserRequest {
		const message = createBaseDelWhitelistUserRequest();
		message.pid = object.pid ?? 0;
		return message;
	},
};

function createBaseDelWhitelistUserResponse(): DelWhitelistUserResponse {
	return {};
}

export const DelWhitelistUserResponse = {
	encode(_: DelWhitelistUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): DelWhitelistUserResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseDelWhitelistUserResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): DelWhitelistUserResponse {
		return {};
	},

	toJSON(_: DelWhitelistUserResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<DelWhitelistUserResponse>): DelWhitelistUserResponse {
		const message = createBaseDelWhitelistUserResponse();
		return message;
	},
};

function createBaseGetAllUsersRequest(): GetAllUsersRequest {
	return {};
}

export const GetAllUsersRequest = {
	encode(_: GetAllUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllUsersRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllUsersRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): GetAllUsersRequest {
		return {};
	},

	toJSON(_: GetAllUsersRequest): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<GetAllUsersRequest>): GetAllUsersRequest {
		const message = createBaseGetAllUsersRequest();
		return message;
	},
};

function createBaseGetAllUsersResponse(): GetAllUsersResponse {
	return { pids: [] };
}

export const GetAllUsersResponse = {
	encode(message: GetAllUsersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		writer.uint32(10).fork();
		for (const v of message.pids) {
			writer.uint32(v);
		}
		writer.ldelim();
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllUsersResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllUsersResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.pids.push(reader.uint32());
						}
					} else {
						message.pids.push(reader.uint32());
					}
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetAllUsersResponse {
		return {
			pids: Array.isArray(object?.pids) ? object.pids.map((e: any) => Number(e)) : [],
		};
	},

	toJSON(message: GetAllUsersResponse): unknown {
		const obj: any = {};
		if (message.pids) {
			obj.pids = message.pids.map((e) => Math.round(e));
		} else {
			obj.pids = [];
		}
		return obj;
	},

	fromPartial(object: DeepPartial<GetAllUsersResponse>): GetAllUsersResponse {
		const message = createBaseGetAllUsersResponse();
		message.pids = object.pids?.map((e) => e) || [];
		return message;
	},
};

function createBaseKickUserRequest(): KickUserRequest {
	return { pid: 0 };
}

export const KickUserRequest = {
	encode(message: KickUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): KickUserRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseKickUserRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): KickUserRequest {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
		};
	},

	toJSON(message: KickUserRequest): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		return obj;
	},

	fromPartial(object: DeepPartial<KickUserRequest>): KickUserRequest {
		const message = createBaseKickUserRequest();
		message.pid = object.pid ?? 0;
		return message;
	},
};

function createBaseKickUserResponse(): KickUserResponse {
	return { wasConnected: false };
}

export const KickUserResponse = {
	encode(message: KickUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.wasConnected === true) {
			writer.uint32(8).bool(message.wasConnected);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): KickUserResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseKickUserResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.wasConnected = reader.bool();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): KickUserResponse {
		return {
			wasConnected: isSet(object.wasConnected) ? Boolean(object.wasConnected) : false,
		};
	},

	toJSON(message: KickUserResponse): unknown {
		const obj: any = {};
		message.wasConnected !== undefined && (obj.wasConnected = message.wasConnected);
		return obj;
	},

	fromPartial(object: DeepPartial<KickUserResponse>): KickUserResponse {
		const message = createBaseKickUserResponse();
		message.wasConnected = object.wasConnected ?? false;
		return message;
	},
};

function createBaseKickAllUsersRequest(): KickAllUsersRequest {
	return {};
}

export const KickAllUsersRequest = {
	encode(_: KickAllUsersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): KickAllUsersRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseKickAllUsersRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): KickAllUsersRequest {
		return {};
	},

	toJSON(_: KickAllUsersRequest): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<KickAllUsersRequest>): KickAllUsersRequest {
		const message = createBaseKickAllUsersRequest();
		return message;
	},
};

function createBaseKickAllUsersResponse(): KickAllUsersResponse {
	return { numKicked: 0 };
}

export const KickAllUsersResponse = {
	encode(message: KickAllUsersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.numKicked !== 0) {
			writer.uint32(8).int32(message.numKicked);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): KickAllUsersResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseKickAllUsersResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.numKicked = reader.int32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): KickAllUsersResponse {
		return {
			numKicked: isSet(object.numKicked) ? Number(object.numKicked) : 0,
		};
	},

	toJSON(message: KickAllUsersResponse): unknown {
		const obj: any = {};
		message.numKicked !== undefined && (obj.numKicked = Math.round(message.numKicked));
		return obj;
	},

	fromPartial(object: DeepPartial<KickAllUsersResponse>): KickAllUsersResponse {
		const message = createBaseKickAllUsersResponse();
		message.numKicked = object.numKicked ?? 0;
		return message;
	},
};

function createBaseGatheringParticipant(): GatheringParticipant {
	return { pid: 0, miiName: "" };
}

export const GatheringParticipant = {
	encode(message: GatheringParticipant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).int64(message.pid);
		}
		if (message.miiName !== "") {
			writer.uint32(18).string(message.miiName);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GatheringParticipant {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGatheringParticipant();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = longToNumber(reader.int64() as Long);
					break;
				case 2:
					message.miiName = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GatheringParticipant {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
			miiName: isSet(object.miiName) ? String(object.miiName) : "",
		};
	},

	toJSON(message: GatheringParticipant): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		message.miiName !== undefined && (obj.miiName = message.miiName);
		return obj;
	},

	fromPartial(object: DeepPartial<GatheringParticipant>): GatheringParticipant {
		const message = createBaseGatheringParticipant();
		message.pid = object.pid ?? 0;
		message.miiName = object.miiName ?? "";
		return message;
	},
};

function createBaseGathering(): Gathering {
	return { gid: 0, host: 0, owner: 0, attributes: [], gameMode: 0, appData: new Uint8Array(), players: [], minParticipants: 0, maxParticipants: 0 };
}

export const Gathering = {
	encode(message: Gathering, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.gid !== 0) {
			writer.uint32(8).uint32(message.gid);
		}
		if (message.host !== 0) {
			writer.uint32(16).uint32(message.host);
		}
		if (message.owner !== 0) {
			writer.uint32(24).uint32(message.owner);
		}
		writer.uint32(34).fork();
		for (const v of message.attributes) {
			writer.uint32(v);
		}
		writer.ldelim();
		if (message.gameMode !== 0) {
			writer.uint32(40).uint32(message.gameMode);
		}
		if (message.appData.length !== 0) {
			writer.uint32(50).bytes(message.appData);
		}
		for (const v of message.players) {
			GatheringParticipant.encode(v!, writer.uint32(58).fork()).ldelim();
		}
		if (message.minParticipants !== 0) {
			writer.uint32(64).uint32(message.minParticipants);
		}
		if (message.maxParticipants !== 0) {
			writer.uint32(72).uint32(message.maxParticipants);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Gathering {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGathering();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.gid = reader.uint32();
					break;
				case 2:
					message.host = reader.uint32();
					break;
				case 3:
					message.owner = reader.uint32();
					break;
				case 4:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.attributes.push(reader.uint32());
						}
					} else {
						message.attributes.push(reader.uint32());
					}
					break;
				case 5:
					message.gameMode = reader.uint32();
					break;
				case 6:
					message.appData = reader.bytes();
					break;
				case 7:
					message.players.push(GatheringParticipant.decode(reader, reader.uint32()));
					break;
				case 8:
					message.minParticipants = reader.uint32();
					break;
				case 9:
					message.maxParticipants = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Gathering {
		return {
			gid: isSet(object.gid) ? Number(object.gid) : 0,
			host: isSet(object.host) ? Number(object.host) : 0,
			owner: isSet(object.owner) ? Number(object.owner) : 0,
			attributes: Array.isArray(object?.attributes) ? object.attributes.map((e: any) => Number(e)) : [],
			gameMode: isSet(object.gameMode) ? Number(object.gameMode) : 0,
			appData: isSet(object.appData) ? bytesFromBase64(object.appData) : new Uint8Array(),
			players: Array.isArray(object?.players) ? object.players.map((e: any) => GatheringParticipant.fromJSON(e)) : [],
			minParticipants: isSet(object.minParticipants) ? Number(object.minParticipants) : 0,
			maxParticipants: isSet(object.maxParticipants) ? Number(object.maxParticipants) : 0,
		};
	},

	toJSON(message: Gathering): unknown {
		const obj: any = {};
		message.gid !== undefined && (obj.gid = Math.round(message.gid));
		message.host !== undefined && (obj.host = Math.round(message.host));
		message.owner !== undefined && (obj.owner = Math.round(message.owner));
		if (message.attributes) {
			obj.attributes = message.attributes.map((e) => Math.round(e));
		} else {
			obj.attributes = [];
		}
		message.gameMode !== undefined && (obj.gameMode = Math.round(message.gameMode));
		message.appData !== undefined && (obj.appData = base64FromBytes(message.appData !== undefined ? message.appData : new Uint8Array()));
		if (message.players) {
			obj.players = message.players.map((e) => (e ? GatheringParticipant.toJSON(e) : undefined));
		} else {
			obj.players = [];
		}
		message.minParticipants !== undefined && (obj.minParticipants = Math.round(message.minParticipants));
		message.maxParticipants !== undefined && (obj.maxParticipants = Math.round(message.maxParticipants));
		return obj;
	},

	fromPartial(object: DeepPartial<Gathering>): Gathering {
		const message = createBaseGathering();
		message.gid = object.gid ?? 0;
		message.host = object.host ?? 0;
		message.owner = object.owner ?? 0;
		message.attributes = object.attributes?.map((e) => e) || [];
		message.gameMode = object.gameMode ?? 0;
		message.appData = object.appData ?? new Uint8Array();
		message.players = object.players?.map((e) => GatheringParticipant.fromPartial(e)) || [];
		message.minParticipants = object.minParticipants ?? 0;
		message.maxParticipants = object.maxParticipants ?? 0;
		return message;
	},
};

function createBaseGetAllGatheringsRequest(): GetAllGatheringsRequest {
	return { offset: 0, limit: 0 };
}

export const GetAllGatheringsRequest = {
	encode(message: GetAllGatheringsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.offset !== 0) {
			writer.uint32(8).uint32(message.offset);
		}
		if (message.limit !== 0) {
			writer.uint32(16).int32(message.limit);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllGatheringsRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllGatheringsRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.offset = reader.uint32();
					break;
				case 2:
					message.limit = reader.int32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetAllGatheringsRequest {
		return {
			offset: isSet(object.offset) ? Number(object.offset) : 0,
			limit: isSet(object.limit) ? Number(object.limit) : 0,
		};
	},

	toJSON(message: GetAllGatheringsRequest): unknown {
		const obj: any = {};
		message.offset !== undefined && (obj.offset = Math.round(message.offset));
		message.limit !== undefined && (obj.limit = Math.round(message.limit));
		return obj;
	},

	fromPartial(object: DeepPartial<GetAllGatheringsRequest>): GetAllGatheringsRequest {
		const message = createBaseGetAllGatheringsRequest();
		message.offset = object.offset ?? 0;
		message.limit = object.limit ?? 0;
		return message;
	},
};

function createBaseGetAllGatheringsResponse(): GetAllGatheringsResponse {
	return { gatherings: [] };
}

export const GetAllGatheringsResponse = {
	encode(message: GetAllGatheringsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		for (const v of message.gatherings) {
			Gathering.encode(v!, writer.uint32(10).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllGatheringsResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllGatheringsResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.gatherings.push(Gathering.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetAllGatheringsResponse {
		return {
			gatherings: Array.isArray(object?.gatherings) ? object.gatherings.map((e: any) => Gathering.fromJSON(e)) : [],
		};
	},

	toJSON(message: GetAllGatheringsResponse): unknown {
		const obj: any = {};
		if (message.gatherings) {
			obj.gatherings = message.gatherings.map((e) => (e ? Gathering.toJSON(e) : undefined));
		} else {
			obj.gatherings = [];
		}
		return obj;
	},

	fromPartial(object: DeepPartial<GetAllGatheringsResponse>): GetAllGatheringsResponse {
		const message = createBaseGetAllGatheringsResponse();
		message.gatherings = object.gatherings?.map((e) => Gathering.fromPartial(e)) || [];
		return message;
	},
};

function createBaseTournament(): Tournament {
	return {
		id: 0,
		owner: 0,
		attributes: [],
		communityCode: "",
		appData: new Uint8Array(),
		totalParticipants: 0,
		seasonId: 0,
		name: "",
		description: "",
		redTeam: "",
		blueTeam: "",
		repeatType: 0,
		gamesetNum: 0,
		iconType: 0,
		battleTime: 0,
		updateDate: 0,
		startDayTime: 0,
		endDayTime: 0,
		startTime: 0,
		endTime: 0,
		startDateTime: undefined,
		endDateTime: undefined,
	};
}

export const Tournament = {
	encode(message: Tournament, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.id !== 0) {
			writer.uint32(8).uint32(message.id);
		}
		if (message.owner !== 0) {
			writer.uint32(16).uint32(message.owner);
		}
		writer.uint32(26).fork();
		for (const v of message.attributes) {
			writer.uint32(v);
		}
		writer.ldelim();
		if (message.communityCode !== "") {
			writer.uint32(34).string(message.communityCode);
		}
		if (message.appData.length !== 0) {
			writer.uint32(42).bytes(message.appData);
		}
		if (message.totalParticipants !== 0) {
			writer.uint32(48).int64(message.totalParticipants);
		}
		if (message.seasonId !== 0) {
			writer.uint32(56).int64(message.seasonId);
		}
		if (message.name !== "") {
			writer.uint32(66).string(message.name);
		}
		if (message.description !== "") {
			writer.uint32(74).string(message.description);
		}
		if (message.redTeam !== "") {
			writer.uint32(82).string(message.redTeam);
		}
		if (message.blueTeam !== "") {
			writer.uint32(90).string(message.blueTeam);
		}
		if (message.repeatType !== 0) {
			writer.uint32(96).uint32(message.repeatType);
		}
		if (message.gamesetNum !== 0) {
			writer.uint32(104).uint32(message.gamesetNum);
		}
		if (message.iconType !== 0) {
			writer.uint32(112).uint32(message.iconType);
		}
		if (message.battleTime !== 0) {
			writer.uint32(120).uint32(message.battleTime);
		}
		if (message.updateDate !== 0) {
			writer.uint32(128).uint32(message.updateDate);
		}
		if (message.startDayTime !== 0) {
			writer.uint32(136).uint32(message.startDayTime);
		}
		if (message.endDayTime !== 0) {
			writer.uint32(144).uint32(message.endDayTime);
		}
		if (message.startTime !== 0) {
			writer.uint32(152).uint32(message.startTime);
		}
		if (message.endTime !== 0) {
			writer.uint32(160).uint32(message.endTime);
		}
		if (message.startDateTime !== undefined) {
			Timestamp.encode(toTimestamp(message.startDateTime), writer.uint32(170).fork()).ldelim();
		}
		if (message.endDateTime !== undefined) {
			Timestamp.encode(toTimestamp(message.endDateTime), writer.uint32(178).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Tournament {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseTournament();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.id = reader.uint32();
					break;
				case 2:
					message.owner = reader.uint32();
					break;
				case 3:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.attributes.push(reader.uint32());
						}
					} else {
						message.attributes.push(reader.uint32());
					}
					break;
				case 4:
					message.communityCode = reader.string();
					break;
				case 5:
					message.appData = reader.bytes();
					break;
				case 6:
					message.totalParticipants = longToNumber(reader.int64() as Long);
					break;
				case 7:
					message.seasonId = longToNumber(reader.int64() as Long);
					break;
				case 8:
					message.name = reader.string();
					break;
				case 9:
					message.description = reader.string();
					break;
				case 10:
					message.redTeam = reader.string();
					break;
				case 11:
					message.blueTeam = reader.string();
					break;
				case 12:
					message.repeatType = reader.uint32();
					break;
				case 13:
					message.gamesetNum = reader.uint32();
					break;
				case 14:
					message.iconType = reader.uint32();
					break;
				case 15:
					message.battleTime = reader.uint32();
					break;
				case 16:
					message.updateDate = reader.uint32();
					break;
				case 17:
					message.startDayTime = reader.uint32();
					break;
				case 18:
					message.endDayTime = reader.uint32();
					break;
				case 19:
					message.startTime = reader.uint32();
					break;
				case 20:
					message.endTime = reader.uint32();
					break;
				case 21:
					message.startDateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 22:
					message.endDateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Tournament {
		return {
			id: isSet(object.id) ? Number(object.id) : 0,
			owner: isSet(object.owner) ? Number(object.owner) : 0,
			attributes: Array.isArray(object?.attributes) ? object.attributes.map((e: any) => Number(e)) : [],
			communityCode: isSet(object.communityCode) ? String(object.communityCode) : "",
			appData: isSet(object.appData) ? bytesFromBase64(object.appData) : new Uint8Array(),
			totalParticipants: isSet(object.totalParticipants) ? Number(object.totalParticipants) : 0,
			seasonId: isSet(object.seasonId) ? Number(object.seasonId) : 0,
			name: isSet(object.name) ? String(object.name) : "",
			description: isSet(object.description) ? String(object.description) : "",
			redTeam: isSet(object.redTeam) ? String(object.redTeam) : "",
			blueTeam: isSet(object.blueTeam) ? String(object.blueTeam) : "",
			repeatType: isSet(object.repeatType) ? Number(object.repeatType) : 0,
			gamesetNum: isSet(object.gamesetNum) ? Number(object.gamesetNum) : 0,
			iconType: isSet(object.iconType) ? Number(object.iconType) : 0,
			battleTime: isSet(object.battleTime) ? Number(object.battleTime) : 0,
			updateDate: isSet(object.updateDate) ? Number(object.updateDate) : 0,
			startDayTime: isSet(object.startDayTime) ? Number(object.startDayTime) : 0,
			endDayTime: isSet(object.endDayTime) ? Number(object.endDayTime) : 0,
			startTime: isSet(object.startTime) ? Number(object.startTime) : 0,
			endTime: isSet(object.endTime) ? Number(object.endTime) : 0,
			startDateTime: isSet(object.startDateTime) ? fromJsonTimestamp(object.startDateTime) : undefined,
			endDateTime: isSet(object.endDateTime) ? fromJsonTimestamp(object.endDateTime) : undefined,
		};
	},

	toJSON(message: Tournament): unknown {
		const obj: any = {};
		message.id !== undefined && (obj.id = Math.round(message.id));
		message.owner !== undefined && (obj.owner = Math.round(message.owner));
		if (message.attributes) {
			obj.attributes = message.attributes.map((e) => Math.round(e));
		} else {
			obj.attributes = [];
		}
		message.communityCode !== undefined && (obj.communityCode = message.communityCode);
		message.appData !== undefined && (obj.appData = base64FromBytes(message.appData !== undefined ? message.appData : new Uint8Array()));
		message.totalParticipants !== undefined && (obj.totalParticipants = Math.round(message.totalParticipants));
		message.seasonId !== undefined && (obj.seasonId = Math.round(message.seasonId));
		message.name !== undefined && (obj.name = message.name);
		message.description !== undefined && (obj.description = message.description);
		message.redTeam !== undefined && (obj.redTeam = message.redTeam);
		message.blueTeam !== undefined && (obj.blueTeam = message.blueTeam);
		message.repeatType !== undefined && (obj.repeatType = Math.round(message.repeatType));
		message.gamesetNum !== undefined && (obj.gamesetNum = Math.round(message.gamesetNum));
		message.iconType !== undefined && (obj.iconType = Math.round(message.iconType));
		message.battleTime !== undefined && (obj.battleTime = Math.round(message.battleTime));
		message.updateDate !== undefined && (obj.updateDate = Math.round(message.updateDate));
		message.startDayTime !== undefined && (obj.startDayTime = Math.round(message.startDayTime));
		message.endDayTime !== undefined && (obj.endDayTime = Math.round(message.endDayTime));
		message.startTime !== undefined && (obj.startTime = Math.round(message.startTime));
		message.endTime !== undefined && (obj.endTime = Math.round(message.endTime));
		message.startDateTime !== undefined && (obj.startDateTime = message.startDateTime.toISOString());
		message.endDateTime !== undefined && (obj.endDateTime = message.endDateTime.toISOString());
		return obj;
	},

	fromPartial(object: DeepPartial<Tournament>): Tournament {
		const message = createBaseTournament();
		message.id = object.id ?? 0;
		message.owner = object.owner ?? 0;
		message.attributes = object.attributes?.map((e) => e) || [];
		message.communityCode = object.communityCode ?? "";
		message.appData = object.appData ?? new Uint8Array();
		message.totalParticipants = object.totalParticipants ?? 0;
		message.seasonId = object.seasonId ?? 0;
		message.name = object.name ?? "";
		message.description = object.description ?? "";
		message.redTeam = object.redTeam ?? "";
		message.blueTeam = object.blueTeam ?? "";
		message.repeatType = object.repeatType ?? 0;
		message.gamesetNum = object.gamesetNum ?? 0;
		message.iconType = object.iconType ?? 0;
		message.battleTime = object.battleTime ?? 0;
		message.updateDate = object.updateDate ?? 0;
		message.startDayTime = object.startDayTime ?? 0;
		message.endDayTime = object.endDayTime ?? 0;
		message.startTime = object.startTime ?? 0;
		message.endTime = object.endTime ?? 0;
		message.startDateTime = object.startDateTime ?? undefined;
		message.endDateTime = object.endDateTime ?? undefined;
		return message;
	},
};

function createBaseGetAllTournamentsRequest(): GetAllTournamentsRequest {
	return { offset: 0, limit: 0 };
}

export const GetAllTournamentsRequest = {
	encode(message: GetAllTournamentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.offset !== 0) {
			writer.uint32(8).uint32(message.offset);
		}
		if (message.limit !== 0) {
			writer.uint32(16).int32(message.limit);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllTournamentsRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllTournamentsRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.offset = reader.uint32();
					break;
				case 2:
					message.limit = reader.int32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetAllTournamentsRequest {
		return {
			offset: isSet(object.offset) ? Number(object.offset) : 0,
			limit: isSet(object.limit) ? Number(object.limit) : 0,
		};
	},

	toJSON(message: GetAllTournamentsRequest): unknown {
		const obj: any = {};
		message.offset !== undefined && (obj.offset = Math.round(message.offset));
		message.limit !== undefined && (obj.limit = Math.round(message.limit));
		return obj;
	},

	fromPartial(object: DeepPartial<GetAllTournamentsRequest>): GetAllTournamentsRequest {
		const message = createBaseGetAllTournamentsRequest();
		message.offset = object.offset ?? 0;
		message.limit = object.limit ?? 0;
		return message;
	},
};

function createBaseGetAllTournamentsResponse(): GetAllTournamentsResponse {
	return { tournaments: [] };
}

export const GetAllTournamentsResponse = {
	encode(message: GetAllTournamentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		for (const v of message.tournaments) {
			Tournament.encode(v!, writer.uint32(10).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllTournamentsResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllTournamentsResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.tournaments.push(Tournament.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetAllTournamentsResponse {
		return {
			tournaments: Array.isArray(object?.tournaments) ? object.tournaments.map((e: any) => Tournament.fromJSON(e)) : [],
		};
	},

	toJSON(message: GetAllTournamentsResponse): unknown {
		const obj: any = {};
		if (message.tournaments) {
			obj.tournaments = message.tournaments.map((e) => (e ? Tournament.toJSON(e) : undefined));
		} else {
			obj.tournaments = [];
		}
		return obj;
	},

	fromPartial(object: DeepPartial<GetAllTournamentsResponse>): GetAllTournamentsResponse {
		const message = createBaseGetAllTournamentsResponse();
		message.tournaments = object.tournaments?.map((e) => Tournament.fromPartial(e)) || [];
		return message;
	},
};

function createBaseGetUnlocksRequest(): GetUnlocksRequest {
	return { pid: 0 };
}

export const GetUnlocksRequest = {
	encode(message: GetUnlocksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetUnlocksRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetUnlocksRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetUnlocksRequest {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
		};
	},

	toJSON(message: GetUnlocksRequest): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		return obj;
	},

	fromPartial(object: DeepPartial<GetUnlocksRequest>): GetUnlocksRequest {
		const message = createBaseGetUnlocksRequest();
		message.pid = object.pid ?? 0;
		return message;
	},
};

function createBaseGetUnlocksResponse(): GetUnlocksResponse {
	return {
		hasData: false,
		vrRate: 0,
		brRate: 0,
		lastUpdate: undefined,
		gpUnlocks: [],
		engineUnlocks: [],
		driverUnlocks: [],
		bodyUnlocks: [],
		tireUnlocks: [],
		wingUnlocks: [],
		stampUnlocks: [],
		dlcUnlocks: [],
	};
}

export const GetUnlocksResponse = {
	encode(message: GetUnlocksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.hasData === true) {
			writer.uint32(8).bool(message.hasData);
		}
		if (message.vrRate !== 0) {
			writer.uint32(17).double(message.vrRate);
		}
		if (message.brRate !== 0) {
			writer.uint32(25).double(message.brRate);
		}
		if (message.lastUpdate !== undefined) {
			Timestamp.encode(toTimestamp(message.lastUpdate), writer.uint32(34).fork()).ldelim();
		}
		writer.uint32(42).fork();
		for (const v of message.gpUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		writer.uint32(50).fork();
		for (const v of message.engineUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		writer.uint32(58).fork();
		for (const v of message.driverUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		writer.uint32(66).fork();
		for (const v of message.bodyUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		writer.uint32(74).fork();
		for (const v of message.tireUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		writer.uint32(82).fork();
		for (const v of message.wingUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		writer.uint32(90).fork();
		for (const v of message.stampUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		writer.uint32(98).fork();
		for (const v of message.dlcUnlocks) {
			writer.uint32(v);
		}
		writer.ldelim();
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetUnlocksResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetUnlocksResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.hasData = reader.bool();
					break;
				case 2:
					message.vrRate = reader.double();
					break;
				case 3:
					message.brRate = reader.double();
					break;
				case 4:
					message.lastUpdate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 5:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.gpUnlocks.push(reader.uint32());
						}
					} else {
						message.gpUnlocks.push(reader.uint32());
					}
					break;
				case 6:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.engineUnlocks.push(reader.uint32());
						}
					} else {
						message.engineUnlocks.push(reader.uint32());
					}
					break;
				case 7:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.driverUnlocks.push(reader.uint32());
						}
					} else {
						message.driverUnlocks.push(reader.uint32());
					}
					break;
				case 8:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.bodyUnlocks.push(reader.uint32());
						}
					} else {
						message.bodyUnlocks.push(reader.uint32());
					}
					break;
				case 9:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.tireUnlocks.push(reader.uint32());
						}
					} else {
						message.tireUnlocks.push(reader.uint32());
					}
					break;
				case 10:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.wingUnlocks.push(reader.uint32());
						}
					} else {
						message.wingUnlocks.push(reader.uint32());
					}
					break;
				case 11:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.stampUnlocks.push(reader.uint32());
						}
					} else {
						message.stampUnlocks.push(reader.uint32());
					}
					break;
				case 12:
					if ((tag & 7) === 2) {
						const end2 = reader.uint32() + reader.pos;
						while (reader.pos < end2) {
							message.dlcUnlocks.push(reader.uint32());
						}
					} else {
						message.dlcUnlocks.push(reader.uint32());
					}
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetUnlocksResponse {
		return {
			hasData: isSet(object.hasData) ? Boolean(object.hasData) : false,
			vrRate: isSet(object.vrRate) ? Number(object.vrRate) : 0,
			brRate: isSet(object.brRate) ? Number(object.brRate) : 0,
			lastUpdate: isSet(object.lastUpdate) ? fromJsonTimestamp(object.lastUpdate) : undefined,
			gpUnlocks: Array.isArray(object?.gpUnlocks) ? object.gpUnlocks.map((e: any) => Number(e)) : [],
			engineUnlocks: Array.isArray(object?.engineUnlocks) ? object.engineUnlocks.map((e: any) => Number(e)) : [],
			driverUnlocks: Array.isArray(object?.driverUnlocks) ? object.driverUnlocks.map((e: any) => Number(e)) : [],
			bodyUnlocks: Array.isArray(object?.bodyUnlocks) ? object.bodyUnlocks.map((e: any) => Number(e)) : [],
			tireUnlocks: Array.isArray(object?.tireUnlocks) ? object.tireUnlocks.map((e: any) => Number(e)) : [],
			wingUnlocks: Array.isArray(object?.wingUnlocks) ? object.wingUnlocks.map((e: any) => Number(e)) : [],
			stampUnlocks: Array.isArray(object?.stampUnlocks) ? object.stampUnlocks.map((e: any) => Number(e)) : [],
			dlcUnlocks: Array.isArray(object?.dlcUnlocks) ? object.dlcUnlocks.map((e: any) => Number(e)) : [],
		};
	},

	toJSON(message: GetUnlocksResponse): unknown {
		const obj: any = {};
		message.hasData !== undefined && (obj.hasData = message.hasData);
		message.vrRate !== undefined && (obj.vrRate = message.vrRate);
		message.brRate !== undefined && (obj.brRate = message.brRate);
		message.lastUpdate !== undefined && (obj.lastUpdate = message.lastUpdate.toISOString());
		if (message.gpUnlocks) {
			obj.gpUnlocks = message.gpUnlocks.map((e) => Math.round(e));
		} else {
			obj.gpUnlocks = [];
		}
		if (message.engineUnlocks) {
			obj.engineUnlocks = message.engineUnlocks.map((e) => Math.round(e));
		} else {
			obj.engineUnlocks = [];
		}
		if (message.driverUnlocks) {
			obj.driverUnlocks = message.driverUnlocks.map((e) => Math.round(e));
		} else {
			obj.driverUnlocks = [];
		}
		if (message.bodyUnlocks) {
			obj.bodyUnlocks = message.bodyUnlocks.map((e) => Math.round(e));
		} else {
			obj.bodyUnlocks = [];
		}
		if (message.tireUnlocks) {
			obj.tireUnlocks = message.tireUnlocks.map((e) => Math.round(e));
		} else {
			obj.tireUnlocks = [];
		}
		if (message.wingUnlocks) {
			obj.wingUnlocks = message.wingUnlocks.map((e) => Math.round(e));
		} else {
			obj.wingUnlocks = [];
		}
		if (message.stampUnlocks) {
			obj.stampUnlocks = message.stampUnlocks.map((e) => Math.round(e));
		} else {
			obj.stampUnlocks = [];
		}
		if (message.dlcUnlocks) {
			obj.dlcUnlocks = message.dlcUnlocks.map((e) => Math.round(e));
		} else {
			obj.dlcUnlocks = [];
		}
		return obj;
	},

	fromPartial(object: DeepPartial<GetUnlocksResponse>): GetUnlocksResponse {
		const message = createBaseGetUnlocksResponse();
		message.hasData = object.hasData ?? false;
		message.vrRate = object.vrRate ?? 0;
		message.brRate = object.brRate ?? 0;
		message.lastUpdate = object.lastUpdate ?? undefined;
		message.gpUnlocks = object.gpUnlocks?.map((e) => e) || [];
		message.engineUnlocks = object.engineUnlocks?.map((e) => e) || [];
		message.driverUnlocks = object.driverUnlocks?.map((e) => e) || [];
		message.bodyUnlocks = object.bodyUnlocks?.map((e) => e) || [];
		message.tireUnlocks = object.tireUnlocks?.map((e) => e) || [];
		message.wingUnlocks = object.wingUnlocks?.map((e) => e) || [];
		message.stampUnlocks = object.stampUnlocks?.map((e) => e) || [];
		message.dlcUnlocks = object.dlcUnlocks?.map((e) => e) || [];
		return message;
	},
};

function createBaseTimeTrialRanking(): TimeTrialRanking {
	return { rank: 0, datetime: undefined, score: 0, pid: 0, commonData: new Uint8Array() };
}

export const TimeTrialRanking = {
	encode(message: TimeTrialRanking, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.rank !== 0) {
			writer.uint32(8).uint32(message.rank);
		}
		if (message.datetime !== undefined) {
			Timestamp.encode(toTimestamp(message.datetime), writer.uint32(18).fork()).ldelim();
		}
		if (message.score !== 0) {
			writer.uint32(24).uint32(message.score);
		}
		if (message.pid !== 0) {
			writer.uint32(32).uint32(message.pid);
		}
		if (message.commonData.length !== 0) {
			writer.uint32(42).bytes(message.commonData);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): TimeTrialRanking {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseTimeTrialRanking();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.rank = reader.uint32();
					break;
				case 2:
					message.datetime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 3:
					message.score = reader.uint32();
					break;
				case 4:
					message.pid = reader.uint32();
					break;
				case 5:
					message.commonData = reader.bytes();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): TimeTrialRanking {
		return {
			rank: isSet(object.rank) ? Number(object.rank) : 0,
			datetime: isSet(object.datetime) ? fromJsonTimestamp(object.datetime) : undefined,
			score: isSet(object.score) ? Number(object.score) : 0,
			pid: isSet(object.pid) ? Number(object.pid) : 0,
			commonData: isSet(object.commonData) ? bytesFromBase64(object.commonData) : new Uint8Array(),
		};
	},

	toJSON(message: TimeTrialRanking): unknown {
		const obj: any = {};
		message.rank !== undefined && (obj.rank = Math.round(message.rank));
		message.datetime !== undefined && (obj.datetime = message.datetime.toISOString());
		message.score !== undefined && (obj.score = Math.round(message.score));
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		message.commonData !== undefined &&
			(obj.commonData = base64FromBytes(message.commonData !== undefined ? message.commonData : new Uint8Array()));
		return obj;
	},

	fromPartial(object: DeepPartial<TimeTrialRanking>): TimeTrialRanking {
		const message = createBaseTimeTrialRanking();
		message.rank = object.rank ?? 0;
		message.datetime = object.datetime ?? undefined;
		message.score = object.score ?? 0;
		message.pid = object.pid ?? 0;
		message.commonData = object.commonData ?? new Uint8Array();
		return message;
	},
};

function createBaseGetTimeTrialRankingRequest(): GetTimeTrialRankingRequest {
	return { track: 0, limit: 0, asc: false };
}

export const GetTimeTrialRankingRequest = {
	encode(message: GetTimeTrialRankingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.track !== 0) {
			writer.uint32(8).uint32(message.track);
		}
		if (message.limit !== 0) {
			writer.uint32(16).int32(message.limit);
		}
		if (message.asc === true) {
			writer.uint32(24).bool(message.asc);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetTimeTrialRankingRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetTimeTrialRankingRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.track = reader.uint32();
					break;
				case 2:
					message.limit = reader.int32();
					break;
				case 3:
					message.asc = reader.bool();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetTimeTrialRankingRequest {
		return {
			track: isSet(object.track) ? Number(object.track) : 0,
			limit: isSet(object.limit) ? Number(object.limit) : 0,
			asc: isSet(object.asc) ? Boolean(object.asc) : false,
		};
	},

	toJSON(message: GetTimeTrialRankingRequest): unknown {
		const obj: any = {};
		message.track !== undefined && (obj.track = Math.round(message.track));
		message.limit !== undefined && (obj.limit = Math.round(message.limit));
		message.asc !== undefined && (obj.asc = message.asc);
		return obj;
	},

	fromPartial(object: DeepPartial<GetTimeTrialRankingRequest>): GetTimeTrialRankingRequest {
		const message = createBaseGetTimeTrialRankingRequest();
		message.track = object.track ?? 0;
		message.limit = object.limit ?? 0;
		message.asc = object.asc ?? false;
		return message;
	},
};

function createBaseGetTimeTrialRankingResponse(): GetTimeTrialRankingResponse {
	return { rankings: [] };
}

export const GetTimeTrialRankingResponse = {
	encode(message: GetTimeTrialRankingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		for (const v of message.rankings) {
			TimeTrialRanking.encode(v!, writer.uint32(10).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetTimeTrialRankingResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetTimeTrialRankingResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.rankings.push(TimeTrialRanking.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetTimeTrialRankingResponse {
		return {
			rankings: Array.isArray(object?.rankings) ? object.rankings.map((e: any) => TimeTrialRanking.fromJSON(e)) : [],
		};
	},

	toJSON(message: GetTimeTrialRankingResponse): unknown {
		const obj: any = {};
		if (message.rankings) {
			obj.rankings = message.rankings.map((e) => (e ? TimeTrialRanking.toJSON(e) : undefined));
		} else {
			obj.rankings = [];
		}
		return obj;
	},

	fromPartial(object: DeepPartial<GetTimeTrialRankingResponse>): GetTimeTrialRankingResponse {
		const message = createBaseGetTimeTrialRankingResponse();
		message.rankings = object.rankings?.map((e) => TimeTrialRanking.fromPartial(e)) || [];
		return message;
	},
};

function createBaseDeleteTimeTrialRankingRequest(): DeleteTimeTrialRankingRequest {
	return { track: 0, pid: 0 };
}

export const DeleteTimeTrialRankingRequest = {
	encode(message: DeleteTimeTrialRankingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.track !== 0) {
			writer.uint32(8).uint32(message.track);
		}
		if (message.pid !== 0) {
			writer.uint32(16).uint32(message.pid);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTimeTrialRankingRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseDeleteTimeTrialRankingRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.track = reader.uint32();
					break;
				case 2:
					message.pid = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): DeleteTimeTrialRankingRequest {
		return {
			track: isSet(object.track) ? Number(object.track) : 0,
			pid: isSet(object.pid) ? Number(object.pid) : 0,
		};
	},

	toJSON(message: DeleteTimeTrialRankingRequest): unknown {
		const obj: any = {};
		message.track !== undefined && (obj.track = Math.round(message.track));
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		return obj;
	},

	fromPartial(object: DeepPartial<DeleteTimeTrialRankingRequest>): DeleteTimeTrialRankingRequest {
		const message = createBaseDeleteTimeTrialRankingRequest();
		message.track = object.track ?? 0;
		message.pid = object.pid ?? 0;
		return message;
	},
};

function createBaseDeleteTimeTrialRankingResponse(): DeleteTimeTrialRankingResponse {
	return {};
}

export const DeleteTimeTrialRankingResponse = {
	encode(_: DeleteTimeTrialRankingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTimeTrialRankingResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseDeleteTimeTrialRankingResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): DeleteTimeTrialRankingResponse {
		return {};
	},

	toJSON(_: DeleteTimeTrialRankingResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<DeleteTimeTrialRankingResponse>): DeleteTimeTrialRankingResponse {
		const message = createBaseDeleteTimeTrialRankingResponse();
		return message;
	},
};

function createBaseDeleteAllTimeTrialRankingsRequest(): DeleteAllTimeTrialRankingsRequest {
	return { pid: 0 };
}

export const DeleteAllTimeTrialRankingsRequest = {
	encode(message: DeleteAllTimeTrialRankingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAllTimeTrialRankingsRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseDeleteAllTimeTrialRankingsRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): DeleteAllTimeTrialRankingsRequest {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
		};
	},

	toJSON(message: DeleteAllTimeTrialRankingsRequest): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		return obj;
	},

	fromPartial(object: DeepPartial<DeleteAllTimeTrialRankingsRequest>): DeleteAllTimeTrialRankingsRequest {
		const message = createBaseDeleteAllTimeTrialRankingsRequest();
		message.pid = object.pid ?? 0;
		return message;
	},
};

function createBaseDeleteAllTimeTrialRankingsResponse(): DeleteAllTimeTrialRankingsResponse {
	return {};
}

export const DeleteAllTimeTrialRankingsResponse = {
	encode(_: DeleteAllTimeTrialRankingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAllTimeTrialRankingsResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseDeleteAllTimeTrialRankingsResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): DeleteAllTimeTrialRankingsResponse {
		return {};
	},

	toJSON(_: DeleteAllTimeTrialRankingsResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<DeleteAllTimeTrialRankingsResponse>): DeleteAllTimeTrialRankingsResponse {
		const message = createBaseDeleteAllTimeTrialRankingsResponse();
		return message;
	},
};

function createBaseIssueBanRequest(): IssueBanRequest {
	return { pid: 0, startTime: undefined, endTime: undefined, reason: "" };
}

export const IssueBanRequest = {
	encode(message: IssueBanRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		if (message.startTime !== undefined) {
			Timestamp.encode(toTimestamp(message.startTime), writer.uint32(18).fork()).ldelim();
		}
		if (message.endTime !== undefined) {
			Timestamp.encode(toTimestamp(message.endTime), writer.uint32(26).fork()).ldelim();
		}
		if (message.reason !== "") {
			writer.uint32(34).string(message.reason);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): IssueBanRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseIssueBanRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				case 2:
					message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 3:
					message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 4:
					message.reason = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): IssueBanRequest {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
			startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
			endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
			reason: isSet(object.reason) ? String(object.reason) : "",
		};
	},

	toJSON(message: IssueBanRequest): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
		message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
		message.reason !== undefined && (obj.reason = message.reason);
		return obj;
	},

	fromPartial(object: DeepPartial<IssueBanRequest>): IssueBanRequest {
		const message = createBaseIssueBanRequest();
		message.pid = object.pid ?? 0;
		message.startTime = object.startTime ?? undefined;
		message.endTime = object.endTime ?? undefined;
		message.reason = object.reason ?? "";
		return message;
	},
};

function createBaseIssueBanResponse(): IssueBanResponse {
	return {};
}

export const IssueBanResponse = {
	encode(_: IssueBanResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): IssueBanResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseIssueBanResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): IssueBanResponse {
		return {};
	},

	toJSON(_: IssueBanResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<IssueBanResponse>): IssueBanResponse {
		const message = createBaseIssueBanResponse();
		return message;
	},
};

function createBaseClearBanRequest(): ClearBanRequest {
	return { pid: 0 };
}

export const ClearBanRequest = {
	encode(message: ClearBanRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ClearBanRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseClearBanRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ClearBanRequest {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
		};
	},

	toJSON(message: ClearBanRequest): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		return obj;
	},

	fromPartial(object: DeepPartial<ClearBanRequest>): ClearBanRequest {
		const message = createBaseClearBanRequest();
		message.pid = object.pid ?? 0;
		return message;
	},
};

function createBaseClearBanResponse(): ClearBanResponse {
	return {};
}

export const ClearBanResponse = {
	encode(_: ClearBanResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ClearBanResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseClearBanResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): ClearBanResponse {
		return {};
	},

	toJSON(_: ClearBanResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial(_: DeepPartial<ClearBanResponse>): ClearBanResponse {
		const message = createBaseClearBanResponse();
		return message;
	},
};

function createBaseBan(): Ban {
	return { pid: 0, startTime: undefined, endTime: undefined, reason: "" };
}

export const Ban = {
	encode(message: Ban, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.pid !== 0) {
			writer.uint32(8).uint32(message.pid);
		}
		if (message.startTime !== undefined) {
			Timestamp.encode(toTimestamp(message.startTime), writer.uint32(18).fork()).ldelim();
		}
		if (message.endTime !== undefined) {
			Timestamp.encode(toTimestamp(message.endTime), writer.uint32(26).fork()).ldelim();
		}
		if (message.reason !== "") {
			writer.uint32(34).string(message.reason);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Ban {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseBan();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.pid = reader.uint32();
					break;
				case 2:
					message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 3:
					message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
					break;
				case 4:
					message.reason = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Ban {
		return {
			pid: isSet(object.pid) ? Number(object.pid) : 0,
			startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
			endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
			reason: isSet(object.reason) ? String(object.reason) : "",
		};
	},

	toJSON(message: Ban): unknown {
		const obj: any = {};
		message.pid !== undefined && (obj.pid = Math.round(message.pid));
		message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
		message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
		message.reason !== undefined && (obj.reason = message.reason);
		return obj;
	},

	fromPartial(object: DeepPartial<Ban>): Ban {
		const message = createBaseBan();
		message.pid = object.pid ?? 0;
		message.startTime = object.startTime ?? undefined;
		message.endTime = object.endTime ?? undefined;
		message.reason = object.reason ?? "";
		return message;
	},
};

function createBaseGetAllBansRequest(): GetAllBansRequest {
	return { offset: 0, limit: 0 };
}

export const GetAllBansRequest = {
	encode(message: GetAllBansRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.offset !== 0) {
			writer.uint32(8).uint32(message.offset);
		}
		if (message.limit !== 0) {
			writer.uint32(16).int32(message.limit);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllBansRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllBansRequest();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.offset = reader.uint32();
					break;
				case 2:
					message.limit = reader.int32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetAllBansRequest {
		return {
			offset: isSet(object.offset) ? Number(object.offset) : 0,
			limit: isSet(object.limit) ? Number(object.limit) : 0,
		};
	},

	toJSON(message: GetAllBansRequest): unknown {
		const obj: any = {};
		message.offset !== undefined && (obj.offset = Math.round(message.offset));
		message.limit !== undefined && (obj.limit = Math.round(message.limit));
		return obj;
	},

	fromPartial(object: DeepPartial<GetAllBansRequest>): GetAllBansRequest {
		const message = createBaseGetAllBansRequest();
		message.offset = object.offset ?? 0;
		message.limit = object.limit ?? 0;
		return message;
	},
};

function createBaseGetAllBansResponse(): GetAllBansResponse {
	return { bans: [] };
}

export const GetAllBansResponse = {
	encode(message: GetAllBansResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		for (const v of message.bans) {
			Ban.encode(v!, writer.uint32(10).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GetAllBansResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGetAllBansResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.bans.push(Ban.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): GetAllBansResponse {
		return {
			bans: Array.isArray(object?.bans) ? object.bans.map((e: any) => Ban.fromJSON(e)) : [],
		};
	},

	toJSON(message: GetAllBansResponse): unknown {
		const obj: any = {};
		if (message.bans) {
			obj.bans = message.bans.map((e) => (e ? Ban.toJSON(e) : undefined));
		} else {
			obj.bans = [];
		}
		return obj;
	},

	fromPartial(object: DeepPartial<GetAllBansResponse>): GetAllBansResponse {
		const message = createBaseGetAllBansResponse();
		message.bans = object.bans?.map((e) => Ban.fromPartial(e)) || [];
		return message;
	},
};

export type AmkjServiceDefinition = typeof AmkjServiceDefinition;
export const AmkjServiceDefinition = {
	name: "AmkjService",
	fullName: "amkj.AmkjService",
	methods: {
		getServerStatus: {
			name: "GetServerStatus",
			requestType: GetServerStatusRequest,
			requestStream: false,
			responseType: GetServerStatusResponse,
			responseStream: false,
			options: {},
		},
		startMaintenance: {
			name: "StartMaintenance",
			requestType: StartMaintenanceRequest,
			requestStream: false,
			responseType: StartMaintenanceResponse,
			responseStream: false,
			options: {},
		},
		endMaintenance: {
			name: "EndMaintenance",
			requestType: EndMaintenanceRequest,
			requestStream: false,
			responseType: EndMaintenanceResponse,
			responseStream: false,
			options: {},
		},
		toggleWhitelist: {
			name: "ToggleWhitelist",
			requestType: ToggleWhitelistRequest,
			requestStream: false,
			responseType: ToggleWhitelistResponse,
			responseStream: false,
			options: {},
		},
		getWhitelist: {
			name: "GetWhitelist",
			requestType: GetWhitelistRequest,
			requestStream: false,
			responseType: GetWhitelistResponse,
			responseStream: false,
			options: {},
		},
		addWhitelistUser: {
			name: "AddWhitelistUser",
			requestType: AddWhitelistUserRequest,
			requestStream: false,
			responseType: AddWhitelistUserResponse,
			responseStream: false,
			options: {},
		},
		delWhitelistUser: {
			name: "DelWhitelistUser",
			requestType: DelWhitelistUserRequest,
			requestStream: false,
			responseType: DelWhitelistUserResponse,
			responseStream: false,
			options: {},
		},
		getAllUsers: {
			name: "GetAllUsers",
			requestType: GetAllUsersRequest,
			requestStream: false,
			responseType: GetAllUsersResponse,
			responseStream: false,
			options: {},
		},
		kickUser: {
			name: "KickUser",
			requestType: KickUserRequest,
			requestStream: false,
			responseType: KickUserResponse,
			responseStream: false,
			options: {},
		},
		kickAllUsers: {
			name: "KickAllUsers",
			requestType: KickAllUsersRequest,
			requestStream: false,
			responseType: KickAllUsersResponse,
			responseStream: false,
			options: {},
		},
		getAllGatherings: {
			name: "GetAllGatherings",
			requestType: GetAllGatheringsRequest,
			requestStream: false,
			responseType: GetAllGatheringsResponse,
			responseStream: false,
			options: {},
		},
		getAllTournaments: {
			name: "GetAllTournaments",
			requestType: GetAllTournamentsRequest,
			requestStream: false,
			responseType: GetAllTournamentsResponse,
			responseStream: false,
			options: {},
		},
		getUnlocks: {
			name: "GetUnlocks",
			requestType: GetUnlocksRequest,
			requestStream: false,
			responseType: GetUnlocksResponse,
			responseStream: false,
			options: {},
		},
		getTimeTrialRanking: {
			name: "GetTimeTrialRanking",
			requestType: GetTimeTrialRankingRequest,
			requestStream: false,
			responseType: GetTimeTrialRankingResponse,
			responseStream: false,
			options: {},
		},
		deleteTimeTrialRanking: {
			name: "DeleteTimeTrialRanking",
			requestType: DeleteTimeTrialRankingRequest,
			requestStream: false,
			responseType: DeleteTimeTrialRankingResponse,
			responseStream: false,
			options: {},
		},
		deleteAllTimeTrialRankings: {
			name: "DeleteAllTimeTrialRankings",
			requestType: DeleteAllTimeTrialRankingsRequest,
			requestStream: false,
			responseType: DeleteAllTimeTrialRankingsResponse,
			responseStream: false,
			options: {},
		},
		issueBan: {
			name: "IssueBan",
			requestType: IssueBanRequest,
			requestStream: false,
			responseType: IssueBanResponse,
			responseStream: false,
			options: {},
		},
		clearBan: {
			name: "ClearBan",
			requestType: ClearBanRequest,
			requestStream: false,
			responseType: ClearBanResponse,
			responseStream: false,
			options: {},
		},
		getAllBans: {
			name: "GetAllBans",
			requestType: GetAllBansRequest,
			requestStream: false,
			responseType: GetAllBansResponse,
			responseStream: false,
			options: {},
		},
	},
} as const;

export interface AmkjServiceServiceImplementation<CallContextExt = {}> {
	getServerStatus(request: GetServerStatusRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetServerStatusResponse>>;
	startMaintenance(request: StartMaintenanceRequest, context: CallContext & CallContextExt): Promise<DeepPartial<StartMaintenanceResponse>>;
	endMaintenance(request: EndMaintenanceRequest, context: CallContext & CallContextExt): Promise<DeepPartial<EndMaintenanceResponse>>;
	toggleWhitelist(request: ToggleWhitelistRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ToggleWhitelistResponse>>;
	getWhitelist(request: GetWhitelistRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetWhitelistResponse>>;
	addWhitelistUser(request: AddWhitelistUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<AddWhitelistUserResponse>>;
	delWhitelistUser(request: DelWhitelistUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<DelWhitelistUserResponse>>;
	getAllUsers(request: GetAllUsersRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetAllUsersResponse>>;
	kickUser(request: KickUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<KickUserResponse>>;
	kickAllUsers(request: KickAllUsersRequest, context: CallContext & CallContextExt): Promise<DeepPartial<KickAllUsersResponse>>;
	getAllGatherings(request: GetAllGatheringsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetAllGatheringsResponse>>;
	getAllTournaments(request: GetAllTournamentsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetAllTournamentsResponse>>;
	getUnlocks(request: GetUnlocksRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetUnlocksResponse>>;
	getTimeTrialRanking(
		request: GetTimeTrialRankingRequest,
		context: CallContext & CallContextExt,
	): Promise<DeepPartial<GetTimeTrialRankingResponse>>;
	deleteTimeTrialRanking(
		request: DeleteTimeTrialRankingRequest,
		context: CallContext & CallContextExt,
	): Promise<DeepPartial<DeleteTimeTrialRankingResponse>>;
	deleteAllTimeTrialRankings(
		request: DeleteAllTimeTrialRankingsRequest,
		context: CallContext & CallContextExt,
	): Promise<DeepPartial<DeleteAllTimeTrialRankingsResponse>>;
	issueBan(request: IssueBanRequest, context: CallContext & CallContextExt): Promise<DeepPartial<IssueBanResponse>>;
	clearBan(request: ClearBanRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ClearBanResponse>>;
	getAllBans(request: GetAllBansRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetAllBansResponse>>;
}

export interface AmkjServiceClient<CallOptionsExt = {}> {
	getServerStatus(request: DeepPartial<GetServerStatusRequest>, options?: CallOptions & CallOptionsExt): Promise<GetServerStatusResponse>;
	startMaintenance(request: DeepPartial<StartMaintenanceRequest>, options?: CallOptions & CallOptionsExt): Promise<StartMaintenanceResponse>;
	endMaintenance(request: DeepPartial<EndMaintenanceRequest>, options?: CallOptions & CallOptionsExt): Promise<EndMaintenanceResponse>;
	toggleWhitelist(request: DeepPartial<ToggleWhitelistRequest>, options?: CallOptions & CallOptionsExt): Promise<ToggleWhitelistResponse>;
	getWhitelist(request: DeepPartial<GetWhitelistRequest>, options?: CallOptions & CallOptionsExt): Promise<GetWhitelistResponse>;
	addWhitelistUser(request: DeepPartial<AddWhitelistUserRequest>, options?: CallOptions & CallOptionsExt): Promise<AddWhitelistUserResponse>;
	delWhitelistUser(request: DeepPartial<DelWhitelistUserRequest>, options?: CallOptions & CallOptionsExt): Promise<DelWhitelistUserResponse>;
	getAllUsers(request: DeepPartial<GetAllUsersRequest>, options?: CallOptions & CallOptionsExt): Promise<GetAllUsersResponse>;
	kickUser(request: DeepPartial<KickUserRequest>, options?: CallOptions & CallOptionsExt): Promise<KickUserResponse>;
	kickAllUsers(request: DeepPartial<KickAllUsersRequest>, options?: CallOptions & CallOptionsExt): Promise<KickAllUsersResponse>;
	getAllGatherings(request: DeepPartial<GetAllGatheringsRequest>, options?: CallOptions & CallOptionsExt): Promise<GetAllGatheringsResponse>;
	getAllTournaments(request: DeepPartial<GetAllTournamentsRequest>, options?: CallOptions & CallOptionsExt): Promise<GetAllTournamentsResponse>;
	getUnlocks(request: DeepPartial<GetUnlocksRequest>, options?: CallOptions & CallOptionsExt): Promise<GetUnlocksResponse>;
	getTimeTrialRanking(
		request: DeepPartial<GetTimeTrialRankingRequest>,
		options?: CallOptions & CallOptionsExt,
	): Promise<GetTimeTrialRankingResponse>;
	deleteTimeTrialRanking(
		request: DeepPartial<DeleteTimeTrialRankingRequest>,
		options?: CallOptions & CallOptionsExt,
	): Promise<DeleteTimeTrialRankingResponse>;
	deleteAllTimeTrialRankings(
		request: DeepPartial<DeleteAllTimeTrialRankingsRequest>,
		options?: CallOptions & CallOptionsExt,
	): Promise<DeleteAllTimeTrialRankingsResponse>;
	issueBan(request: DeepPartial<IssueBanRequest>, options?: CallOptions & CallOptionsExt): Promise<IssueBanResponse>;
	clearBan(request: DeepPartial<ClearBanRequest>, options?: CallOptions & CallOptionsExt): Promise<ClearBanResponse>;
	getAllBans(request: DeepPartial<GetAllBansRequest>, options?: CallOptions & CallOptionsExt): Promise<GetAllBansResponse>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
	if (typeof globalThis !== "undefined") return globalThis;
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	throw "Unable to locate global object";
})();

const atob: (b64: string) => string = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
	const bin = atob(b64);
	const arr = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; ++i) {
		arr[i] = bin.charCodeAt(i);
	}
	return arr;
}

const btoa: (bin: string) => string = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
	const bin: string[] = [];
	arr.forEach((byte) => {
		bin.push(String.fromCharCode(byte));
	});
	return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
	? T
	: T extends Array<infer U>
	? Array<DeepPartial<U>>
	: T extends ReadonlyArray<infer U>
	? ReadonlyArray<DeepPartial<U>>
	: T extends {}
	? { [K in keyof T]?: DeepPartial<T[K]> }
	: Partial<T>;

function toTimestamp(date: Date): Timestamp {
	const seconds = date.getTime() / 1_000;
	const nanos = (date.getTime() % 1_000) * 1_000_000;
	return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
	let millis = t.seconds * 1_000;
	millis += t.nanos / 1_000_000;
	return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
	if (o instanceof Date) {
		return o;
	} else if (typeof o === "string") {
		return new Date(o);
	} else {
		return fromTimestamp(Timestamp.fromJSON(o));
	}
}

function longToNumber(long: Long): number {
	if (long.gt(Number.MAX_SAFE_INTEGER)) {
		throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
	}
	return long.toNumber();
}

if (_m0.util.Long !== Long) {
	_m0.util.Long = Long as any;
	_m0.configure();
}

function isSet(value: any): boolean {
	return value !== null && value !== undefined;
}
