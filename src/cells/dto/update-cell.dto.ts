import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class UpdateCellDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  neighborhood_id?: string;

  @IsOptional()
  @IsString()
  @Length(8, 9)
  cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  leader?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  generation?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  network?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
