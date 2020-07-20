import { Logger } from '@scripty/logger/src/Logger';
import {
    PLACEMENTS_DESTROYED_RESPONSE,
    PLACEMENTS_ERROR_RESPONSE,
    PLACEMENTS_RESPONSE,
    PLACEMENTS_UPDATED_RESPONSE
} from './Constants';

export class PlacementsPresenter {
    constructor(response) {
        this.response = response;
    }

    async present(interactorResponse) {
        const { code, response, message } = interactorResponse;

        switch (code) {
            case PLACEMENTS_RESPONSE:
                this.response.send({
                    entries: [{ placements: response.placements }]
                });
                break;
            case PLACEMENTS_UPDATED_RESPONSE:
                this.response.send({
                    entries: [{ placements: response.placements }]
                });
                break;
            case PLACEMENTS_DESTROYED_RESPONSE:
                this.response.send({
                    entries: [{ placements: response.placements }]
                });
                break;
            case PLACEMENTS_ERROR_RESPONSE:
                Logger.error(message);
                this.response.send({ message: message});
                break;
        }
    };
}
