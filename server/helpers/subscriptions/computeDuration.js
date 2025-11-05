const { DURATION_MAP } = require("../../constants");
const { throwError } = require("../../utils");

exports.computeDuration = (type) => {
  const days = DURATION_MAP[type];
  if (!days)
    throwError(400, "Invalid subscription type for duration calculation");
  return days;
};
