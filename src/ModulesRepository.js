import { BaseRepository } from './BaseRepository';
import {
    MODULES_RESPONSE,
    MODULES_ERROR_RESPONSE,
    MODULES_DESTROYED_RESPONSE, MODULES_UPDATED_RESPONSE
} from './Constants';

export class ModulesRepository extends BaseRepository {

    constructor(requestSchema, db, collection) {
        super(requestSchema, db, collection);
        this.db = db;
    }

    async findModules(query) {
        const response = await this.model.find({
            $or: [
                { 'assignment.value': query.assignment },
                { 'assignment.type': 'all' }
            ],
            $and: [
                { 'assignment.type': { '$ne': 'no' } }
            ]
        });

        try {
            return { code: MODULES_RESPONSE, response };
        } catch (e) {
            return { code: MODULES_ERROR_RESPONSE, message: e }
        }

    };

    async updateModules(query) {
        let { _id, type, assignment, plugin, module_id, title, item_id } = query;

        if (!_id) {
            _id = new this.db.mongo.ObjectID()
        }

        try {
            const response = await this.model.findOneAndUpdate(
                { _id },
                {
                    $set: {
                        plugin,
                        type,
                        module_id: module_id,
                        item_id,
                        title,
                        assignment: assignment
                    }
                },
                { new: true, upsert: true }
            );

            return { code: MODULES_UPDATED_RESPONSE, response: response }

        } catch (e) {
            return { code: MODULES_ERROR_RESPONSE, message: e }
        }
    }

    async destroyModules(query) {
        let { _id } = query;
        try {
            const response = await this.model.findByIdAndRemove(_id);
            return { code: MODULES_DESTROYED_RESPONSE, response }
        } catch (e) {
            return { code: MODULES_ERROR_RESPONSE, message: e }
        }
    }
}
