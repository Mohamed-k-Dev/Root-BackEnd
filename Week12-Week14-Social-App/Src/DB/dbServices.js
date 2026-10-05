import mongoose from "mongoose";
const defaultUpdateOptions = { new: true, runValidators: true };

export const findById = async ({
  model,
  id,
  projection = {},
  options = {},
  populate = [],
}) => {
  return await model.findById(id, projection, options).populate(populate);
};

export const findOne = async ({
  model,
  filter = {},
  projection = {},
  options = {},
  populate = [],
}) => {
  return await model.findOne(filter, projection, options).populate(populate);
};

export const find = async ({
  model,
  filter = {},
  projection = {},
  options = {},
  populate = [],
}) => {
  return await model.find(filter, projection, options).populate(populate);
};

export const countDocuments = async ({ model, filter = {} }) => {
  return await model.countDocuments(filter);
};

export const exists = async ({ model, filter }) => {
  return await model.exists(filter);
};

export const distinct = async ({ model, field, filter = {} }) => {
  return await model.distinct(field, filter);
};

export const paginate = async ({
  model,
  filter = {},
  projection = {},
  options = {},
  populate = [],
  page = 1,
  limit = 10,
  sort = { createdAt: -1 },
}) => {
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);

  console.log(page);
  const [data, totalItems] = await Promise.all([
    model
      .find(filter, projection, options)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(populate),
    model.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  return {
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    data,
  };
};

export const create = async ({ model, data, options = {} }) => {
  const isArray = Array.isArray(data);
  const result = await model.create(isArray ? data : [data], options);
  return isArray ? result : result[0];
};

export const insertMany = async ({ model, data, options = {} }) => {
  return await model.insertMany(data, options);
};

export const updateOne = async ({ model, filter, data, options = {} }) => {
  return await model.updateOne(filter, data, {
    runValidators: true,
    ...options,
  });
};

export const updateMany = async ({ model, filter, data, options = {} }) => {
  return await model.updateMany(filter, data, {
    runValidators: true,
    ...options,
  });
};

export const findOneAndUpdate = async ({
  model,
  filter,
  data,
  options = {},
  populate = [],
}) => {
  return await model
    .findOneAndUpdate(filter, data, { ...defaultUpdateOptions, ...options })
    .populate(populate);
};

export const findByIdAndUpdate = async ({
  model,
  id,
  data,
  options = {},
  populate = [],
}) => {
  return await model
    .findByIdAndUpdate(id, data, { ...defaultUpdateOptions, ...options })
    .populate(populate);
};

export const deleteOne = async ({ model, filter, options = {} }) => {
  return await model.deleteOne(filter, options);
};

export const deleteMany = async ({ model, filter, options = {} }) => {
  if (!filter || Object.keys(filter).length === 0) {
    throw new Error("deleteMany requires a non-empty filter");
  }
  return await model.deleteMany(filter, options);
};

export const findByIdAndDelete = async ({
  model,
  id,
  options = {},
  populate = [],
}) => {
  return await model.findByIdAndDelete(id, options).populate(populate);
};

export const findOneAndDelete = async ({
  model,
  filter,
  options = {},
  populate = [],
}) => {
  return await model.findOneAndDelete(filter, options).populate(populate);
};

export const aggregate = async ({ model, pipeline = [], options = {} }) => {
  return await model.aggregate(pipeline, options);
};

export const withTransaction = async (callback) => {
  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      result = await callback(session);
    });
    return result;
  } finally {
    session.endSession();
  }
};
