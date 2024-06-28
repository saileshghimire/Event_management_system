export {}

declare global {
  namespace Express {
    export interface Request {
      userId?: Int
      // extra variables you want to use in req object
    }
  }

}