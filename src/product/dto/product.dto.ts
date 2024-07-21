import { IsInt, IsNumber, IsNumberString, IsString, IsUUID } from "class-validator";

export class ProductDto {

    // @IsUUID()
    // id: string;
    
    @IsString()
    name: string;

    @IsInt()
    quantity: number;
    
    @IsNumberString()
    price: number;

    history: string[];
}