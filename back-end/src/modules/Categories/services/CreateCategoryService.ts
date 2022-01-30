import { getRepository } from 'typeorm'
import { Category } from '@modules/Categories/infra/typeorm/entities/Category'
import { dateGmt } from '@shared/utils/DateGmt-3'
import { UpdateCategoryService } from '@modules/Categories/services/UpdateCategoryService'
import AppError from '@shared/errors/AppError'

type CategoryRequest = {
  id: string
  name: string
  description: string
  defaultPrice: number
  activated: boolean
}

export class CreateCategoryService {
  async execute({
    name,
    description,
    defaultPrice,
  }: CategoryRequest): Promise<Category | AppError> {
    const repo = getRepository(Category)

    if (!name || description === undefined || !defaultPrice) {
      throw new AppError('Missing information')
    }

    // Se ele encontrar uma categoria já existente e que está ativa, então ele retorna que aquela
    // categoria já existe, para não haver duplicações.
    if (await repo.findOne({ where: { name: name, activated: true } })) {
      throw new AppError('Category already exists')
    }
    // Se ele encontrar uma categoria que já existe e está desabilitada, ele atualiza
    // as informações daquela categoria e habilita ela.
    else if (await repo.findOne({ where: { name: name, activated: false } })) {
      const lastCategory = await repo.findOne({ where: { name: name } })
      const service = new UpdateCategoryService()
      const result = await service.execute({
        id: lastCategory.id,
        name,
        description,
        defaultPrice,
        activated: true,
      })
      return result
    }
    // Se não encontrar categorias duplicadas, faz o insert normalmente.
    else {
      const date = await dateGmt(new Date())

      const category = repo.create({
        name,
        description,
        defaultPrice,
        activated: true,
        created_at: date,
        updated_at: date,
      })
      await repo.save(category)
      return category
    }
  }
}
