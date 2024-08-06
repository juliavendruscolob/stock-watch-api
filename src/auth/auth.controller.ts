import { Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    //@IsPublic()
    //@UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login() {}
}