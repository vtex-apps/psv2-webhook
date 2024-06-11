import { IOClients } from '@vtex/api'

import Webhook from './webhook'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get webhook() {
    return this.getOrSet('webhook', Webhook)
  }
}
