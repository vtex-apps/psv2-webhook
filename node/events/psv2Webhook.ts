import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'

export async function psv2Webhook(ctx: EventContext<Clients>) {
  const {
    vtex: { account, workspace },
  } = ctx
  
  const appSettings = await ctx.clients.apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  ctx.vtex.settings = { ...ctx.vtex.settings, ...appSettings }

  const webhookUrl = ctx.vtex.settings.webhookUrl

  if (!webhookUrl) {
    throw new Error(
      `No webhook url was set. Go to https://${workspace}--${account}.myvtex.com/admin/apps/${process.env.VTEX_APP_ID}/setup/ and set your webhook url.`
    )
  }

  await ctx.clients.webhook.sendWebhook(ctx.body)

  ctx.vtex.logger.info({
    message: 'Successfully sent webhook',
    webhookUrl,
    body: ctx.body,
  })
}