import { MODULES_RESPONSE } from './Constants';
import { BaseRepository } from './BaseRepository';
import { Logger } from '@scripty/logger/src/Logger';

export class ModulesRepository extends BaseRepository {

    constructor(requestSchema, db, collection) {
        super(requestSchema, db, collection);
        this.db = db;
    }

    async findModules(query, presenter) {
        const data = await this.model.find({
            $or: [
                { 'assignment.value': query.assignment },
                { 'assignment.type': 'all' }
            ],
            $and: [
                { 'assignment.type': { '$ne': 'no' } }
            ]
        });

        let response = await data.map(async (rec) => {
            rec.plugin = await this.findTable(rec);
            return rec;
        });

        let layout = await this.findLayout(query.assignment);

        return await presenter.present({
            code: MODULES_RESPONSE,
            response: {
                modules: await Promise.all(response),
                layout: layout.layout,
            }
        });
    };

    async findLayout(assignment) {
        const schema = { route: String, layout: Object };
        const model = this.getModel(schema, this.db, 'site_layouts');
        return await model.findOne({ assignment: assignment });
    }

    async findTable(module) {
        const schema = { type: String, table: String };
        const model = this.getModel(schema, this.db, 'site_components');
        let response = await model.findOne({ type: module.type }, { table: 1, _id: 0 });
        return await this.findComponent(response.table, module);
    }

    async findComponent(table, module) {
        let schema = { any: this.db.Schema.Types.Mixed }
        const model = this.getModel(schema, this.db, table);
        return await model.find({ _id: module.module_id });
    }

    async updateLayout(query, presenter) {
        const schema = { assignment: String, layout: Object }
        const model = this.getModel(schema, this.db, 'site_layouts');
        await model.findOneAndUpdate({ assignment: query.assignment }, { layout: query.layout }, { new: true });
        return await this.findModules(query, presenter);
    }

    async updateModule(query, presenter) {
        let { _id, type, assignment, plugin, module_id, title } = query;

        if (!_id) {
            _id = new mongoose.mongo.ObjectID()
        }

        try {
            await this.model.findOneAndUpdate(
                { _id },
                {
                    $set: {
                        plugin,
                        type,
                        module_id: module_id,
                        title,
                        assignment: assignment
                    }
                },
                { new: true, upsert: true }
            );

            return await this.findModules(query, presenter);
        } catch (e) {
            Logger.error(e)
        }
    }

    async destroyModule(query, presenter) {
        let { _id } = query;
        try {
            await this.model.findByIdAndRemove(_id);
            return await this.findModules(query, presenter);
        } catch (e) {
            Logger.error(e);
        }
    }
}
