import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, MaxLength, IsUUID } from 'class-validator';

export class CreateCellRequestDto {
  @IsString()
  @Length(8, 9, { message: 'CEP deve estar no formato 00000-000' })
  cep!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsNumber()
  @Type(() => Number)
  latitude!: number;

  @IsNumber()
  @Type(() => Number)
  longitude!: number;

  @IsUUID('4', { message: 'Bairro inválido' })
  neighborhoodId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  network?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
