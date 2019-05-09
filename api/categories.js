import Category from '../models/category'

export function add_routes({ router }) {
  router.get('/categories', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.categories', scope: 'list' })
    try {
      log.info({ query: req.query }, 'Fetching categories')
      let elements = await Category.find(req.query)
      log.info('Found %d elements', elements.length)
      res.status(200).json(elements)
    } catch(err) {
      log.error({err}, 'Failure to fetch categories')
      next(err)
    }
  })

  router.get('/categories/:id', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.categories', scope: 'read' })
    try {
      log.info({ query: req.query }, 'Fetching category %s', req.params.id)
      let element = await Category.findById(req.params.id)
      log.info('Found element')
      res.status(200).json(element)
    } catch(err) {
      log.error({err}, 'Failure to fetch category')
      next(err)
    }
  })
}