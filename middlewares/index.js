const { ObjectId } = require('mongoose').Types;

const validateDbId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: `Given object id (${req.params.id}) is not valid.`,
    });
  }
  next();
};

const raiseRecord404Error = (req, res) => {
  res.status(404).json({
    error: `No record with given _id : (${req.params.id})`,
  });
};

const errorHandler = (error, req, res, next) => {
  res.status(500).json({ error: error.message || 'Internal Server Error' });
};

module.exports = {
  validateDbId,
  raiseRecord404Error,
  errorHandler,
};
