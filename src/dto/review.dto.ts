import { IsNumber, IsOptional, Max, Min } from 'class-validator'

abstract class BaseReviewDto {
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number
}

export class CreateReviewDto extends BaseReviewDto {}

export class UpdateReviewDto extends BaseReviewDto {
  @IsOptional()
  rating?: number
}
