import { AuthPayloadType } from "@/lib/jwt";

export type AuthUserType = Pick<AuthPayloadType, "data">["data"];
