import { Body, Controller, Get, HttpCode, Param, Post, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(201)
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user);
    }

    @Get(':email')
    @HttpCode(200)
    returnAnUserByEmail(@Param('email') email: string) {
        return this.userService.returnAnUserByEmail(email);
    }

    @Patch(':email')
    @HttpCode(200)
    updatePassword(@Param('email') email: string, @Body('password') password: string) {
        return this.userService.updatePassword(email, password);
    }
}