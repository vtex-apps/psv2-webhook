import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'
import type { ProfileSystemEvent } from '../models/profileSystemEvent'
import { DELETE_OPERATION } from '../utils/constants'
import { excludedAuthors } from '../utils/excludedAuthors'

export async function psv2Webhook(ctx: EventContext<Clients>) {
  const {
    vtex: { account, workspace },
  } = ctx

  const appSettings = await ctx.clients.apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  ctx.vtex.settings = { ...ctx.vtex.settings, ...appSettings }

  const { webhookUrl } = ctx.vtex.settings

  if (!webhookUrl) {
    throw new Error(
      `No webhook url was set. Go to https://${workspace}--${account}.myvtex.com/admin/apps/${process.env.VTEX_APP_ID}/setup/ and set your webhook url.`
    )
  }

  const event = ctx.body as ProfileSystemEvent

  // Verifique se o autor está na lista de exclusão
  if (excludedAuthors.includes(event.author)) {
    ctx.vtex.logger.info({
      message: `Event ignored due to excluded author: ${event.author}`,
      author: event.author,
    })

    return // Não dispara o evento
  }

  const reqBody = {
    payload: {},
    profileId: event.profileId,
    operation: event.operation,
    subject: event.entity,
    author: event.author,
  }

  let docResponse: Record<string, unknown> = {}

  if (event.operation === DELETE_OPERATION) {
    reqBody.payload = {
      id: event.documentId,
    }
  } else {
    docResponse = await ctx.clients.psv2.getDocument(
      event.entity,
      event.profileId,
      event.documentId,
      event.documentVersion
    )

    reqBody.payload = docResponse
  }

  await ctx.clients.webhook.sendWebhook(reqBody)

  ctx.vtex.logger.info({
    message: 'Successfully sent webhook',
    webhookUrl,
    body: ctx.body,
  })
}
