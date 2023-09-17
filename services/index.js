const { Model } = require('../models/user.model.js');

exports.generateCrudMethods = (Model) => {
  return {
    getAll: () => Model.find().exec(),
    getById: (id) => Model.findById(id).exec(),
    create: (record) => Model.create(record),
    update: async (id, record) => {
      try {
        const updatedRecord = await Model.findByIdAndUpdate(id, record, {
          new: true,
        }).exec();

        if (!updatedRecord) {
          throw new Error(`Record with id ${id} not found`);
        }

        return updatedRecord;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id) => {
      try {
        const deletedRecord = await Model.findByIdAndDelete(id).exec();

        if (!deletedRecord) {
          throw new Error(`Record with id ${id} not found`);
        }

        return deletedRecord;
      } catch (error) {
        throw error;
      }
    },
  };
};
