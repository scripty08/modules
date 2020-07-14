import { ModulesRepository } from './ModulesRepository';
import { ModulesPresenter } from './ModulesPresenter';
import { ModulesSchema, ResponseModel } from './ModulesModel';

export class ModulesController {

    static collection = 'site_modules'

    init(server, router) {
        this.repository = new ModulesRepository(ModulesSchema, server.db, ModulesController.collection);

        router.get('/modules/findModules', this.findModulesAction.bind(this));
        router.post('/modules/updateLayout', this.updateLayoutAction.bind(this));
        router.post('/modules/updateModule', this.updateModuleAction.bind(this));
        router.get('/modules/destroyModule', this.destroyModuleAction.bind(this));
        server.use(router);
    }

    findModulesAction(req, res) {
        const presenter = new ModulesPresenter(res, ResponseModel);
        return this.repository.findModules(req.query, presenter)
    }

    updateLayoutAction(req, res) {
        const presenter = new ModulesPresenter(res, ResponseModel);
        return this.repository.updateLayout(req.body, presenter)
    }

    updateModuleAction(req, res) {
        const presenter = new ModulesPresenter(res, ResponseModel);
        return this.repository.updateModule(req.body, presenter)
    }

    destroyModuleAction(req, res) {
        const presenter = new ModulesPresenter(res, ResponseModel);
        return this.repository.destroyModule(req.query, presenter)
    }
}
