import express from 'express'

export function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
): void {
  console.error(err)
  res.status(500).send(err)
}
