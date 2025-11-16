const mongoose = require("mongoose");
const Music = require("../../models/Music");
const { pagination } = require("../../utils");

exports.getAllMusics = async (query) => {
  let {
    page = 1,
    limit = 10,
    title,
    search,
    artist,
    categoryId,
    subCategoryId,
    albumId,
    fromDate,
    toDate,
    sortBy = "createdAt",
    sortOrder = "desc",
    isActive,
  } = query;
  page = page ? Number(page) : 1;
  limit = limit ? Number(limit) : 10;
  const matchStage = { isDeleted: false };
  if (typeof isActive !== "undefined") {
    matchStage.isActive = isActive === "true" || isActive === true;
  }
  if (title) matchStage.title = title;
  if (artist) matchStage.artists = { $regex: new RegExp(artist, "i") };
  if (categoryId) {
    matchStage.categoryId = new mongoose.Types.ObjectId(categoryId);
  }
  if (subCategoryId) {
    matchStage.subCategoryId = new mongoose.Types.ObjectId(subCategoryId);
  }
  if (albumId) matchStage.albumId = new mongoose.Types.ObjectId(albumId);
  if (search) {
    const searchRegex = new RegExp(search, "i");
    matchStage.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { artists: searchRegex },
    ];
  }
  if (fromDate || toDate) {
    matchStage.createdAt = {};
    if (fromDate) matchStage.createdAt.$gte = new Date(fromDate);
    if (toDate) {
      const d = new Date(toDate);
      d.setHours(23, 59, 59, 999);
      matchStage.createdAt.$lte = d;
    }
  }
  const pipeline = [{ $match: matchStage }];
  const sortStage = {};
  sortStage[sortBy] = sortOrder === "asc" ? 1 : -1;
  pipeline.push({ $sort: sortStage });
  return await pagination(Music, pipeline, page, limit);
};
