import { IsInt, IsString } from "class-validator";

export class StockHistoryDto {
    
    @IsString()
    productId: string;

    @IsInt()
    oldQuantity: number;

    @IsInt()
    newQuantity: number;
}