import { ModulesRepository } from './ModulesRepository';
import { ModulesPresenter } from './ModulesPresenter';
import { PlacementsPresenter } from './PlacementsPresenter';
import { ModulesSchema, PlacementsSchema } from './Schema';
import { ModulesInteractor } from './ModulesInteractor';
import { PlacementsInteractor } from './PlacementsInteractor';
import { PlacementsRepository } from './PlacementsRepository';

export class ModulesController {

    static collection = 'site_modules'

    init(server, router) {
        this.modulesRepository = new ModulesRepository(ModulesSchema, server.db, ModulesController.collection);
        this.placementsRepository = new PlacementsRepository(PlacementsSchema, server.db, ModulesController.collection);

        router.get('/modules/findPlacements', this.findPlacementsAction.bind(this));
        router.post('/modules/updatePlacements', this.updatePlacementsAction.bind(this));
        router.get('/modules/destroyPlacements', this.destroyPlacementsAction.bind(this));

        router.get('/modules/findModules', this.findModulesAction.bind(this));
        router.post('/modules/updateModules', this.updateModulesAction.bind(this));
        router.get('/modules/destroyModules', this.destroyModulesAction.bind(this));
        server.use(router);
    }

    findPlacementsAction(req, res) {
        const presenter = new PlacementsPresenter(res);
        const interactor = new PlacementsInteractor(req.query, presenter, this.placementsRepository);
        return interactor.run('findPlacements');
    }

    updatePlacementsAction(req, res) {
        const presenter = new PlacementsPresenter(res);
        const interactor = new PlacementsInteractor(req.body, presenter, this.placementsRepository);
        return interactor.run('updatePlacements');
    }

    destroyPlacementsAction(req, res) {
        const presenter = new ModulesPresenter(res);
        const interactor = new PlacementsInteractor(req.body, presenter, this.placementsRepository);
        return interactor.run('destroyPlacements');
    }

    findModulesAction(req, res) {
        const presenter = new ModulesPresenter(res);
        const interactor = new ModulesInteractor(req.query, presenter, this.modulesRepository);
        return interactor.run('findModules');
    }

    updateModulesAction(req, res) {
        const presenter = new ModulesPresenter(res);
        const interactor = new ModulesInteractor(req.body, presenter, this.modulesRepository);
        return interactor.run('updateModules');
    }

    destroyModulesAction(req, res) {
        const presenter = new ModulesPresenter(res);
        const interactor = new ModulesInteractor(req.body, presenter, this.modulesRepository);
        return interactor.run('destroyModules');
    }
}
