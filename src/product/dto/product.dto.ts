import { IsInt, IsString, IsUUID } from "class-validator";

export class ProductDto {

    @IsUUID()
    id: string;
    
    @IsString()
    name: string;

    @IsInt()
    quantity: number;
    
    @IsInt()
    price: number;

    history: string[];
}