class AppError extends Error {
  constructor(msg, statusCode = 500) {
    super(msg)
    this.error = msg
    this.statusCode = statusCode
  }
}

export { AppError }
