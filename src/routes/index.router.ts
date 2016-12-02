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
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    
  }

}

// Create the IndexRouter, and export its configured Express.Router
const indexRoutes = new IndexRouter();
indexRoutes.init();

export default indexRoutes.router;