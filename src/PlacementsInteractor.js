
export class PlacementsInteractor {
    constructor(request, presenter, repository) {
        this.request = request;
        this.presenter = presenter;
        this.repository = repository;
    }

    async run(command) {

        switch (command) {
            case 'findPlacements':
                const placements = await this.repository.findPlacements(this.request.query);
                return await this.presenter.present(placements);
            case 'updatePlacements':
                const updatedPlacements = await this.repository.updatePlacements(this.request.body);
                return await this.presenter.present(Promise.all(updatedPlacements));
            case 'destroyPlacements':
                const destroyedPlacements = this.request.body.map((rec) => {
                    this.repository.destroyPlacements(rec);
                });
                return await this.presenter.present(Promise.all(destroyedPlacements));
        }

    };
}
