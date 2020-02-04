import Shipper from "../models/shipper"

export function add_routes({ router }) {
  router.get('/shippers', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.shippers', scope: 'list' })

    try {
      log.info({ query: req.query }, 'Fetching shippers')
      let elements = await Shipper.find(req.query)
      log.info('Found %d elements', elements.length)
      res.status(200).json(elements)
    } catch(err) {
      log.error({ err }, 'Failure to fetch shippers')
      next(err)
    }
  })

  router.get('/shippers/:id', async (req, res, next) => {
    let log = req.log.child({ topic: 'routes', controller: 'api.shippers', scope: 'read' })
    try {
      log.info({ query: req.query }, 'Fetching shipper %s', req.params.id)
      let element = await Shipper.findById(req.params.id)
      log.info('Found element')
      res.status(200).json(element)
    } catch(err) {
      log.error({err}, 'Failure to fetch shipper')
      next(err)
    }
  })
}