import {Router, Request, Response, NextFunction} from 'express';

export class IndexRouter {
  router: Router

  /**
   * Initialize the IndexRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET the Welcome
   */
  public welcome(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: 'Hello World!'
    });
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.welcome);
  }

}

// Create the IndexRouter, and export its configured Express.Router
const indexRoutes = new IndexRouter();
indexRoutes.init();

export default indexRoutes.router;