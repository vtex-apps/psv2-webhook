import { IOClients } from '@vtex/api'

import Webhook from './webhook'
import PSV2 from './psv2'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get webhook() {
    return this.getOrSet('webhook', Webhook)
  }

  public get psv2() {
    return this.getOrSet('psv2', PSV2)
  }
}
