const Dhun = require("../models/Dhun");
const { asyncWrapper, sendSuccess, throwError } = require("../utils");
const { calculateAudioDuration } = require("../helpers/musics");
const { uploadImage, uploadAudio } = require("../services/uploads");

exports.create = asyncWrapper(async (req, res) => {
  const { title, description } = req.body;
  const image = req.files?.image;
  const audio = req.files?.audio;
  let imageUrl, audioUrl;
  if (!audio) throwError(422, "please provide audio");
  audioUrl = await uploadAudio(audio.tempFilePath);
  const durationInSeconds = await calculateAudioDuration(audio.tempFilePath);
  if (image) imageUrl = await uploadImage(image.tempFilePath);
  const dhun = await Dhun.create({
    title,
    description,
    durationInSeconds,
    image: imageUrl,
    audio: audioUrl,
  });
  return sendSuccess(res, 201, "Dhun created successfully", dhun);
});

exports.get = asyncWrapper(async (req, res) => {
  const { dhunId } = req.params;
  const dhun = await Dhun.findById(dhunId);
  if (!dhun) throwError(404, "Dhun not found");
  return sendSuccess(res, 200, "Dhun fetched successfully", dhun);
});

exports.getAll = asyncWrapper(async (req, res) => {
  let { page = 1, limit = 10, title, search } = req.query;
  page = Number(page);
  limit = Number(limit);
  const filter = {};
  if (title) filter.title = title;
  if (search) {
    filter.title = { $regex: search, $options: "i" };
    filter.description = { $regex: search, $options: "i" };
  }
  const dhuns = await Dhun.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Dhun.countDocuments(filter);
  if (total === 0 || !dhuns.length) throwError(404, "No Dhuns found!");
  return sendSuccess(res, 200, "Dhuns fetched successfully", {
    total,
    page,
    limit,
    dhuns,
  });
});

exports.update = asyncWrapper(async (req, res) => {
  const { dhunId } = req.params;
  const { title, description } = req.body;
  const dhun = await Dhun.findById(dhunId);
  if (!dhun) throwError(404, "Dhun not found");
  let imageUrl = dhun.image;
  let audioUrl = dhun.audio;
  let durationInSeconds = dhun.durationInSeconds;
  const image = req.files?.image;
  const audio = req.files?.audio;
  if (audio) {
    audioUrl = await uploadAudio(audio.tempFilePath);
    durationInSeconds = await calculateAudioDuration(audio.tempFilePath);
  }
  if (image) imageUrl = await uploadImage(image.tempFilePath);
  dhun.title = title || dhun.title;
  dhun.description = description || dhun.description;
  dhun.image = imageUrl;
  dhun.audio = audioUrl;
  dhun.durationInSeconds = durationInSeconds;
  await dhun.save();
  return sendSuccess(res, 200, "Dhun updated successfully", dhun);
});

exports.deleteDhun = asyncWrapper(async (req, res) => {
  const { dhunId } = req.params;
  const dhun = await Dhun.findById(dhunId);
  if (!dhun) throwError(404, "Dhun not found");
  dhun.isActive = false;
  dhun.isDeleted = true;
  await dhun.save();
  return sendSuccess(res, 200, "Dhun deleted successfully");
});

// const fs = require("fs");
// const path = require("path");
// const uuid = require("uuid");

// exports.create = asyncWrapper(async (req, res) => {
//   const { title, description, audioBase64, imageBase64 } = req.body;

//   let imageUrl, audioUrl, durationInSeconds;
//   let tempAudioPath, tempImagePath;

//   /** ---------- AUDIO (File or Base64) ---------- **/
//   if (req.files?.audio) {
//     // normal file upload
//     tempAudioPath = req.files.audio.tempFilePath;
//   } else if (audioBase64) {
//     // base64 audio
//     const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, "");
//     const fileName = `${uuid.v4()}.mp3`;
//     tempAudioPath = path.join(__dirname, "..", "temp", fileName);

//     fs.writeFileSync(tempAudioPath, Buffer.from(base64Data, "base64"));
//   } else {
//     throwError(422, "please provide audio");
//   }

//   audioUrl = await uploadAudio(tempAudioPath);
//   durationInSeconds = await calculateAudioDuration(tempAudioPath);

//   /** ---------- IMAGE (File or Base64) ---------- **/
//   if (req.files?.image) {
//     tempImagePath = req.files.image.tempFilePath;
//     imageUrl = await uploadImage(tempImagePath);
//   } else if (imageBase64) {
//     const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
//     const fileName = `${uuid.v4()}.png`;
//     tempImagePath = path.join(__dirname, "..", "temp", fileName);

//     fs.writeFileSync(tempImagePath, Buffer.from(base64Data, "base64"));
//     imageUrl = await uploadImage(tempImagePath);
//   }

//   /** ---------- CREATE DB RECORD ---------- **/
//   const dhun = await Dhun.create({
//     title,
//     description,
//     durationInSeconds,
//     image: imageUrl,
//     audio: audioUrl,
//   });

//   return sendSuccess(res, 201, "Dhun created successfully", dhun);
// });

// update API logic
// // audio update
// if (req.files?.audio) {
//   tempAudioPath = req.files.audio.tempFilePath;
// } else if (audioBase64) {
//   const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, "");
//   tempAudioPath = path.join(__dirname, "..", "temp", `${uuid.v4()}.mp3`);
//   fs.writeFileSync(tempAudioPath, Buffer.from(base64Data, "base64"));
// }

// if (tempAudioPath) {
//   audioUrl = await uploadAudio(tempAudioPath);
//   durationInSeconds = await calculateAudioDuration(tempAudioPath);
// }

// // image update
// if (req.files?.image) {
//   tempImagePath = req.files.image.tempFilePath;
// } else if (imageBase64) {
//   const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
//   tempImagePath = path.join(__dirname, "..", "temp", `${uuid.v4()}.png`);
//   fs.writeFileSync(tempImagePath, Buffer.from(base64Data, "base64"));
// }

// if (tempImagePath) {
//   imageUrl = await uploadImage(tempImagePath);
// }
