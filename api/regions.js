import Region from "../models/region"

export function add_routes({ router }) {
  router.get('/regions', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.regions', scope: 'list' })

    try {
      log.info({ query: req.query }, 'Fetching regions')
      let elements = await Region.find(req.query)
      log.info('Found %d elements', elements.length)
      res.status(200).json(elements)
    } catch(err) {
      log.error({ err }, 'Failure to fetch regions')
      next(err)
    }
  })

  router.get('/regions/:id', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.regions', scope: 'read' })
    try {
      log.info({ query: req.query }, 'Fetching region %s', req.params.id)
      let element = await Region.findById(req.params.id)
      log.info('Found element')
      res.status(200).json(element)
    } catch(err) {
      log.error({err}, 'Failure to fetch region')
      next(err)
    }
  })
}
