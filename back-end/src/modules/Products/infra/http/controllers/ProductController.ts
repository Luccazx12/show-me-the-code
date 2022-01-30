import { Request, Response } from 'express'
import { GetAllProductsService } from '@modules/Products/services/GetAllProductsService'
import { CreateProductService } from '@modules/Products/services/CreateProductService'
import { UpdateProductService } from '@modules/Products/services/UpdateProductService'

export class ProductController {
  async getAllProducts(request: Request, response: Response) {
    const service = new GetAllProductsService()
    const products = await service.execute()
    return response.json(products)
  }

  async createProducts(request: Request, response: Response) {
    const { name, description, price, category_id } = request.body

    const service = new CreateProductService()

    const result = await service.execute({
      id: '',
      activated: true,
      name,
      description,
      price,
      category_id,
      user_id: request.user.id,
    })

    return response.json(result)
  }

  async updateProduct(request: Request, response: Response) {
    let { name, description, price, category_id, activated } = request.body
    let { id } = request.params

    const service = new UpdateProductService()

    if (request.user.role === 'User') {
      id = ''
      name = null
      description = null
      price = null
      category_id = null
    }

    const result = await service.execute({
      id,
      name,
      description,
      price,
      category_id,
      user_id: request.user.id,
      activated,
    })
    return response.json(result)
  }
}
