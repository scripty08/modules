import { Logger } from '@scripty/logger/src/Logger';
import {
    MODULES_DESTROYED_RESPONSE,
    MODULES_ERROR_RESPONSE,
    MODULES_RESPONSE,
    MODULES_UPDATED_RESPONSE
} from './Constants';

export class ModulesPresenter {
    constructor(response) {
        this.response = response;
    }

    async present(interactorResponse) {
        const { code, response, message } = interactorResponse;

        switch (code) {
            case MODULES_RESPONSE:
                this.response.send({
                    entries: response
                });
                break;
            case MODULES_UPDATED_RESPONSE:
                this.response.send({
                    entries: response
                });
                break;
            case MODULES_DESTROYED_RESPONSE:
                this.response.send({
                    entries: response
                });
                break;
            case MODULES_ERROR_RESPONSE:
                Logger.error(message);
                this.response.send({
                    message: message
                });
                break;
        }
    };
}
