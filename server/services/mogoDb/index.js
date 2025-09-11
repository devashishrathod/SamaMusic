exports.createItem = async (Model, payload) => {
  return await Model.create(payload);
};

exports.findById = async (Model, id, projection = {}, options = {}) => {
  return await Model.findById(id, projection, options);
};

exports.findOne = async (Model, filter = {}, projection = {}, options = {}) => {
  return await Model.findOne(filter, projection, options);
};

exports.findMany = async (
  Model,
  filter = {},
  projection = {},
  options = {}
) => {
  return await Model.find(filter, projection, options);
};

exports.updateOne = async (
  Model,
  filter = {},
  updateData = {},
  options = {}
) => {
  return await Model.updateOne(filter, updateData, options);
};

exports.findOneAndUpdate = async (
  Model,
  filter = {},
  updateData = {},
  options = {}
) => {
  return await Model.findOneAndUpdate(filter, updateData, {
    new: true,
    ...options,
  });
};

exports.findByIdAndUpdate = async (
  Model,
  id,
  updateData = {},
  options = {}
) => {
  return await Model.findByIdAndUpdate(id, updateData, {
    new: true,
    ...options,
  });
};
