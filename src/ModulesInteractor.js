export class ModulesInteractor {
    constructor(request, presenter, repository) {
        this.request = request;
        this.presenter = presenter;
        this.repository = repository;
    }

    async run(command) {

        switch (command) {
            case 'findModules':
                const modules = await this.repository.findModules(this.request.query);
                return await this.presenter.present(modules);
            case 'updateModules':
                const updatedModules = this.request.body.map((rec) => {
                    this.repository.updateModules(rec);
                });
                return await this.presenter.present(Promise.all(updatedModules));
            case 'destroyModules':
                const destroyedModules = this.request.body.map((rec) => {
                    this.repository.updateModules(rec);
                });
                return await this.presenter.present(Promise.all(destroyedModules));
        }
    };
}
