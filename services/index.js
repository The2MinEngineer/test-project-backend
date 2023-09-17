const UserModel = require('../models/user.model.js');

exports.generateCrudMethods = (UserModel) => {
  return {
    getAll: () => UserModel.find().exec(),
    getById: (id) => UserModel.findById(id).exec(),
    create: (record) => UserModel.create(record),
    update: async (id, record) => {
      try {
        const updatedRecord = await UserModel.findByIdAndUpdate(id, record, {
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
        const deletedRecord = await UserModel.findByIdAndDelete(id).exec();

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
