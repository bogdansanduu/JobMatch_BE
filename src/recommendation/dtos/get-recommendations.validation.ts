import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetRecommendationsValidation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsNumber()
  latitude: number;

  @IsDefined()
  @IsNumber()
  longitude: number;
}
