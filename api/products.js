import Product from "../models/product"

export function add_routes({ router }) {
  router.get('/products', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.products', scope: 'list' })

    try {
      log.info({ query: req.query }, 'Fetching products')
      let elements = await Product.find(req.query)
      log.info('Found %d elements', elements.length)
      res.status(200).json(elements)
    } catch(err) {
      log.error({ err }, 'Failure to fetch products')
      next(err)
    }
  })

  router.get('/products/:id', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.products', scope: 'read' })
    try {
      log.info({ query: req.query }, 'Fetching product %s', req.params.id)
      let element = await Product.findById(req.params.id)
      log.info('Found element')
      res.status(200).json(element)
    } catch(err) {
      log.error({err}, 'Failure to fetch product')
      next(err)
    }
  })
}
