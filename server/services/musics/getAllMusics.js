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
  pipeline.push({
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
      pipeline: [
        { $match: { isDeleted: false } },
        {
          $project: {
            name: 1,
            description: 1,
            image: 1,
            isActive: 1,
          },
        },
      ],
    },
  });
  pipeline.push({
    $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
  });
  pipeline.push({
    $lookup: {
      from: "subcategories",
      localField: "subCategoryId",
      foreignField: "_id",
      as: "subCategory",
      pipeline: [
        { $match: { isDeleted: false } },
        {
          $project: {
            name: 1,
            description: 1,
            image: 1,
            isActive: 1,
          },
        },
      ],
    },
  });
  pipeline.push({
    $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true },
  });
  pipeline.push({
    $lookup: {
      from: "albums",
      localField: "albumId",
      foreignField: "_id",
      as: "album",
      pipeline: [
        { $match: { isDeleted: false } },
        {
          $project: {
            name: 1,
            description: 1,
            image: 1,
            isActive: 1,
          },
        },
      ],
    },
  });
  pipeline.push({
    $unwind: { path: "$album", preserveNullAndEmptyArrays: true },
  });
  if (search) {
    const regex = new RegExp(search, "i");
    pipeline.push({
      $match: {
        $or: [
          { title: regex },
          { description: regex },
          { artists: regex },
          { "category.name": regex },
          { "category.description": regex },
          { "subCategory.name": regex },
          { "subCategory.description": regex },
          { "album.name": regex },
          { "album.description": regex },
        ],
      },
    });
  }
  pipeline.push({
    $project: {
      _id: 1,
      title: 1,
      description: 1,
      artists: 1,
      releaseDate: 1,
      durationInSeconds: 1,
      audio: 1,
      image: 1,
      isActive: 1,
      createdAt: 1,
      updatedAt: 1,
      category: 1,
      subCategory: 1,
      album: 1,
    },
  });
  pipeline.push({
    $sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
  });
  return await pagination(Music, pipeline, page, limit);
};
