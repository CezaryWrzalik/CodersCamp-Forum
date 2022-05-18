import { Request } from 'express'
import { AuthTokenPayload } from './AuthTokenPayload'

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload
}
