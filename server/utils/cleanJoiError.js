/**
 * Converts Joi validation errors into clean, readable messages
 * Example:
 *  "\"payloadData\" is required"  -->  "Payload Data is required"
 */
exports.cleanJoiError = (error) => {
  if (!error) return null;
  const formatFieldName = (field) => {
    return field
      .replace(/([A-Z])/g, " $1") // split camelCase → spaced
      .replace(/[_\-]+/g, " ") // replace underscores/dashes with spaces
      .replace(/\b\w/g, (l) => l.toUpperCase()) // capitalize each word
      .trim();
  };
  const messages = error.details.map((d) => {
    const field = d.path?.[0] || "";
    const cleanField = formatFieldName(field);
    let msg = d.message.replace(/["\\]/g, "");
    msg = msg.replace(field, cleanField);
    return msg;
  });
  return messages.join(", ");
};
