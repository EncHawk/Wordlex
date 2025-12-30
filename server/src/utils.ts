import express, { Request, Response, NextFunction } from 'express';

export function globalCatch(
  err: unknown, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  res.status(500).json({
    ok: false,
    msg: "Whoopsie smtn went wrong, we're on this!"
  });
}
