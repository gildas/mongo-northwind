import fs           from 'fs'
import path         from 'path'
import { execSync } from 'child_process'
import { logger }   from './logger'
import middleware   from './middleware'

export default function module({ app_info, filters } ) {
  logger.info('='.repeat(80));
  logger.info('Starting %s v. %s (%s)', app_info.name, app_info.version, process.env.NODE_ENV || 'development');
  if (fs.existsSync(path.normalize(path.join(process.cwd(), '.git', 'config')))) {
    try {
      if (execSync('command -v git').toString().trim()) {
        const rev  = execSync('git rev-parse --short HEAD').toString().trim();
        logger.info('git commit: %s', rev);
      }
    } catch(err) {
    }
  }
  logger.info('Maximum Heap Memory: %sMB', Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100);

  logger.info('Adding logger to nuxt middlewares')
  this.options.serverMiddleware.unshift(middleware({ logger, filters }))

  logger.info('Adding logger as a plugin')
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
