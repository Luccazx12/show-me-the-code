import { getRepository } from 'typeorm';
import { Category } from '@modules/Categories/infra/typeorm/entities/Category';
import { dateGmt } from '@shared/utils/DateGmt-3';
import AppError from '@shared/errors/AppError';

type CategoryRequest = {
  id: string;
  name: string;
  description: string;
  defaultPrice: number;
  activated: boolean;
};

export class UpdateCategoryService {
  async execute({
    id,
    name,
    description,
    defaultPrice,
    activated,
  }: CategoryRequest) {
    const repo = getRepository(Category);

    const category = await repo.findOne(id);

    if (!category) {
      throw new AppError('Category does not exists!');
    }

    if (category.activated === activated && activated !== null) {
      if (activated === true) {
        throw new AppError('Product already activated');
      } else {
        throw new AppError('Product already desactivated');
      }
    } else {
      const date = await dateGmt(new Date());

      category.name = name ? name : category.name;
      category.description = description ? description : category.description;
      category.defaultPrice = defaultPrice
        ? defaultPrice
        : category.defaultPrice;
      category.updated_at = date;

      if (activated === null) {
        category.activated = category.activated;
      } else {
        category.activated = activated;
      }

      await repo.save(category);

      return category;
    }
  }
}
