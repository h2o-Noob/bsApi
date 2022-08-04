// create new treat
exports.test = async (req, res, next) => {
    try {
      res.status(201).json({
        success: true,
        message: "treat made successfullly",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  };