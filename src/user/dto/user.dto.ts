import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(15)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password is too weak.',
      })
    password: string;
}