import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserPayload } from "../models/user-payload";
import { UserJwt } from "../models/user-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreException: false, 
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    // async validate(userPayload: UserPayload): Promise<UserJwt> {
    //     return {
            
    //     }
    // };
}