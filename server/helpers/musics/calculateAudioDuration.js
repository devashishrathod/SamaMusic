const mm = require("music-metadata");
const fetch = require("node-fetch");

/**
 * Calculates audio duration in seconds (supports local path or URL)
 */
exports.calculateAudioDuration = async (audioPath) => {
  try {
    let metadata;
    if (audioPath.startsWith("http")) {
      // For remote audio files
      const response = await fetch(audioPath);
      const buffer = await response.arrayBuffer();
      metadata = await mm.parseBuffer(Buffer.from(buffer), null, {
        duration: true,
      });
    } else {
      // For local temp files
      metadata = await mm.parseFile(audioPath);
    }
    return Math.round(metadata.format.duration || 0);
  } catch (error) {
    console.error("Error calculating audio duration:", error.message);
    return 0;
  }
};
