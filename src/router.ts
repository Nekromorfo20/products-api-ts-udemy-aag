import { Router } from "express"
import { body, param } from "express-validator"
import { getProducts, getProductById, createProduct, updatedProduct, updatedAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product Name
 *                  example: Monitor curvo de 49 pulgadas
 *              price:
 *                  type: number
 *                  description: The Product Price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The Product Availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: Return a list of products
 *      responses:
 *          200: 
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Product'
 */
router.get("/",
    getProducts
)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by id
 *      tags:
 *          - Products
 *      description: Return a product base on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad request - Invalid ID
 */
router.get("/:id",
    param("id")
        .isInt().withMessage("Id no válido"),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo  49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid input data
 */
router.post("/",
    body("name")
        .notEmpty().withMessage("El nombre de producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage("El precio de producto no puede ir vacio")
        .custom(value => value > 0).withMessage("Precio no válido"),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo  49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid Id or Invalid input data
 *          404:
 *              description: Product not found
 */
router.put("/:id",
    param("id")
        .isInt().withMessage("Id no válido"),
    body("name")
        .notEmpty().withMessage("El nombre de producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage("El precio de producto no puede ir vacio")
        .custom(value => value > 0).withMessage("Precio no válido"),
    body("availability")
        .isBoolean().withMessage("Valor para disponibilidad no válido"),
    handleInputErrors,
    updatedProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updated product availability
 *      tags:
 *          - Products
 *      description: Return the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid Id
 *          404:
 *              description: Product not found
 */
router.patch("/:id",
    param("id")
        .isInt().withMessage("Id no válido"),
    handleInputErrors,
    updatedAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          400:
 *              description: Bad request - Invalid Id
 *          404:
 *              description: Product not found
 */
router.delete("/:id",
    param("id")
        .isInt().withMessage("Id no válido"),
    handleInputErrors,
    deleteProduct
)

export default router