import {Router, Request, Response, NextFunction} from 'express';
import {IProspect} from './prospect';
const Prospects : Array<IProspect> = require('../../mocks/prospect.mock');

export class ProspectRouter {
  router: Router

  /**
   * Initialize the ProspectRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Prospects.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Prospects);
  }

  /**
   * GET one Prospect by id
   */
  public getById(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.id);
    let prospect : IProspect = Prospects.find(Prospect => Prospect.id === query);
    if (prospect) {
      res.status(200)
        .send({
          message: 'success',
          status: res.status,
          prospect
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No Prospect found with the given id.',
          status: res.status
        });
    }
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getById);
  }

}

// Create the ProspectRouter, and export its configured Express.Router
const ProspectRoutes = new ProspectRouter();
ProspectRoutes.init();

export default ProspectRoutes.router;