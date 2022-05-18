import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../types/AuthenticatedRequest'

export function isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    // isAdmin should be provided after auth middleware otherwise return error
    res.status(500).send('Something goes wrong.')
    return
  }
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(403).send('Access denied.')
  }
}
