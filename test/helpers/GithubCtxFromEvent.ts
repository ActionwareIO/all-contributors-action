import { WebhookPayload } from '@actions/github/lib/interfaces'

export class Context {
  /**
   * Webhook payload object that triggered the workflow
   */
  payload: WebhookPayload

  eventName: string
  sha: string
  ref: string
  workflow: string
  action: string
  actor: string
  job: string
  runNumber: number
  runId: number

  /**
   * Hydrate the context from the environment
   */
  constructor(event: any) {
    this.payload = event.payload
    this.eventName = event.eventName
    this.sha = event.sha
    this.ref = event.ref
    this.workflow = event.workflow
    this.action = event.action
    this.actor = event.actor
    this.job = event.job
    this.runNumber = event.runNumber
    this.runId = event.runId
  }

  get issue(): { owner: string; repo: string; number: number } {
    const payload = this.payload

    return {
      ...this.repo,
      number: (payload.issue || payload.pull_request || payload).number,
    }
  }

  get repo(): { owner: string; repo: string } {
    if (this.payload.repository) {
      return {
        owner: this.payload.repository.owner.login,
        repo: this.payload.repository.name,
      }
    }

    throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'")
  }
}
