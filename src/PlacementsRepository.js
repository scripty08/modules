import { BaseRepository } from './BaseRepository';
import {
    PLACEMENTS_ERROR_RESPONSE,
    PLACEMENTS_RESPONSE,
    PLACEMENTS_UPDATED_RESPONSE,
    PLACEMENTS_DESTROYED_RESPONSE
} from './Constants';

export class PlacementsRepository extends BaseRepository {

    constructor(requestSchema, db, collection) {
        super(requestSchema, db, collection);
        this.db = db;
    }

    async findPlacements(query) {
        try {
            const response = await this.model.findOne({ assignment: query.assignment });
            return { code: PLACEMENTS_RESPONSE, response };
        } catch (e) {
            return { code: PLACEMENTS_ERROR_RESPONSE, message: e }
        }
    }

    async updatePlacements(query) {
        try {
            let response = await this.model.findOneAndUpdate(
                { assignment: query.assignment },
                { placements: query.placements },
                { new: true }
            );
            return { code: PLACEMENTS_UPDATED_RESPONSE, response }
        } catch (e) {
            return { code: PLACEMENTS_ERROR_RESPONSE, message: e }
        }
    }

    async destroyPlacements(query) {
        let { _id } = query;
        try {
            const response = await this.model.findByIdAndRemove(_id);
            return { code: PLACEMENTS_DESTROYED_RESPONSE, response }
        } catch (e) {
            return { code: PLACEMENTS_ERROR_RESPONSE, message: e }
        }
    }
}
