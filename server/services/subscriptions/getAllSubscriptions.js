const Subscription = require("../../models/Subscription");
const { throwError, pagination } = require("../../utils");

exports.getAllSubscriptions = async (query) => {
  let {
    page = 1,
    limit = 10,
    search,
    price,
    name,
    minPrice,
    maxPrice,
    isActive,
    type,
    fromDate,
    toDate,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;
  page = page ? Number(page) : 1;
  limit = limit ? Number(limit) : 10;
  const match = { isDeleted: false };
  if (typeof isActive !== "undefined") {
    match.isActive = isActive === "true" || isActive === true;
  }
  if (type) {
    type = type?.trim()?.toLowerCase();
    match.type = type;
  }
  if (name) {
    name = name?.trim()?.toLowerCase();
    match.name = name;
  }
  if (typeof price !== "undefined" && price !== "") {
    const p = Number(price);
    if (!Number.isFinite(p)) throwError(422, "Invalid price value");
    match.price = p;
  } else {
    const range = {};
    if (typeof minPrice !== "undefined" && minPrice !== "") {
      const mn = Number(minPrice);
      if (!Number.isFinite(mn)) throwError(422, "Invalid minPrice value");
      range.$gte = mn;
    }
    if (typeof maxPrice !== "undefined" && maxPrice !== "") {
      const mx = Number(maxPrice);
      if (!Number.isFinite(mx)) throwError(422, "Invalid maxPrice value");
      range.$lte = mx;
    }
    if (Object.keys(range).length > 0) match.price = range;
  }
  if (search) {
    search = search?.trim()?.toLowerCase();
    const r = new RegExp(search, "i");
    match.$or = [
      { name: { $regex: r } },
      { description: { $regex: r } },
      { benefits: { $elemMatch: { $regex: r } } },
      { limitations: { $elemMatch: { $regex: r } } },
    ];
  }
  if (fromDate || toDate) {
    match.createdAt = {};
    if (fromDate) match.createdAt.$gte = new Date(fromDate);
    if (toDate) {
      const d = new Date(toDate);
      d.setHours(23, 59, 59, 999);
      match.createdAt.$lte = d;
    }
  }
  const pipeline = [{ $match: match }];
  pipeline.push({
    $project: {
      name: 1,
      description: 1,
      price: 1,
      type: 1,
      durationInDays: 1,
      benefits: 1,
      limitations: 1,
      isActive: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  });
  const sortStage = {};
  const allowedSortFields = ["price", "name", "createdAt", "durationInDays"];
  if (!allowedSortFields.includes(sortBy)) sortBy = "createdAt";
  sortStage[sortBy] = sortOrder === "asc" ? 1 : -1;
  pipeline.push({ $sort: sortStage });
  return await pagination(Subscription, pipeline, page, limit);
};
