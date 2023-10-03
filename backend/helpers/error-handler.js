function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "The user is not authorized" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json(err); // Changed status to 400 for validation errors
  }
  console.log("Error Handler = ", err);
  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
