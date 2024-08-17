import 'dotenv/config'
import { App } from './app'

async function bootstrap() {
  const app = new App()

  app.listener()
}

bootstrap()
