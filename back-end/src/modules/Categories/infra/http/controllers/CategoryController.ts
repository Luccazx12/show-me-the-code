import { Request, Response } from 'express'
import { GetAllCategoriesService } from '@modules/Categories/services/GetAllCategoriesService'
import { CreateCategoryService } from '@modules/Categories/services/CreateCategoryService'
import { UpdateCategoryService } from '@modules/Categories/services/UpdateCategoryService'
import { DeleteCategoryService } from '@modules/Categories/services/DeleteCategoryService'

export class CategoryController {
  async getAlLCategories(request: Request, response: Response) {
    const service = new GetAllCategoriesService()
    const categories = await service.execute()
    return response.json(categories)
  }

  async createCategory(request: Request, response: Response) {
    const { name, description, defaultPrice } = request.body
    const service = new CreateCategoryService()

    const result = await service.execute({
      id: '',
      activated: true,
      name,
      description,
      defaultPrice,
    })
    return response.json(result)
  }

  async updateCategory(request: Request, response: Response) {
    const { id } = request.params
    const { name, description, defaultPrice, activated } = request.body

    const service = new UpdateCategoryService()

    const result = await service.execute({
      id,
      name,
      description,
      defaultPrice,
      activated,
    })
    return response.json(result)
  }

  async deleteCategory(request: Request, response: Response) {
    const { id } = request.params
    const service = new DeleteCategoryService()
    await service.execute(id)
    return response.status(204).end()
  }
}
