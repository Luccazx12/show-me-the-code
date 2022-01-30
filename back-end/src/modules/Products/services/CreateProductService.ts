import { getRepository } from 'typeorm'
import { Product } from '@modules/Products/infra/typeorm/entities/Product'
import { Category } from '@modules/Categories/infra/typeorm/entities/Category'
import { dateGmt } from '@shared/utils/DateGmt-3'
import AppError from '@shared/errors/AppError'

type ProductsRequest = {
  id: string
  name: string
  description: string
  price: number
  category_id: string
  user_id: string
  activated: boolean
}

export class CreateProductService {
  async execute({
    name,
    description,
    price,
    category_id,
    user_id,
  }: ProductsRequest): Promise<AppError | Product> {
    const repo = getRepository(Product)
    const repoCategory = getRepository(Category)

    if (!name || description === undefined || !category_id) {
      throw new AppError('Missing information')
    }

    const categoria = await repoCategory.findOne(category_id)

    if (!categoria) {
      throw new AppError('Category does not exists!')
    } else if (await repo.findOne({ where: { name: name } })) {
      throw new AppError('Product already exists!')
    } else {
      const date = await dateGmt(new Date())

      if (!price) {
        price = categoria.defaultPrice
      }

      const product = repo.create({
        name,
        description,
        price,
        category_id,
        user_id,
        activated: true,
        created_at: date,
        updated_at: date,
      })

      await repo.save(product)
      return product
    }
  }
}
