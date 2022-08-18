const reportSchema = require("../models/ReportModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// create report
exports.createReport = async (req, res, next) => {
  try {

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    }

    if (images.length==0) {
      images.push(
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"
      );
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "reports",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    const number = (await reportSchema.countDocuments()) + 1;

    req.body.number = number;
    req.body.user = req.User.id;

    const report = await reportSchema.create(req.body);

    res.status(200).json({
      message: "report created",
      report,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler(error));
  }
};

// get all reports
exports.getAllReports = async (req, res, next) => {
  try {
    const resultPerPage = 8;

    const apiFeatures = new ApiFeatures(
      reportSchema.find().populate("user", "name avatar email"),
      req.query
    )
      .search()
      .pagination(resultPerPage);

    const reports = await apiFeatures.query;

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    next(new ErrorHandler(error));
  }
};

// user reports
exports.myReports = async (req, res, next) => {
  try {
    const reports = await reportSchema.find({ user: req.User._id });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
};

// get report details
exports.getReportDetails = async (req, res, next) => {
  try {
    const report = await reportSchema
      .findById(req.params.id)
      .populate("user", "name avatar email");

    if (!report) {
      return next(new ErrorHandler("report not found", 404));
    }

    res.status(200).json({
      message: "report found",
      report,
    });
  } catch (error) {
    next(new ErrorHandler(error));
  }
};

// update report
exports.updateReport = async (req, res, next) => {
  try {
    report = await reportSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      message: "report updated",
      report,
      success: true,
    });
  } catch (error) {
    next(new ErrorHandler(error));
  }
};

// delete report
exports.deleteReport = async (req, res, next) => {
  try {
    const report = await reportSchema.findByIdAndDelete(req.params.id);

    if (!report) {
      return next(new ErrorHandler("report not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "report deleted",
    });
  } catch (error) {
    next(new ErrorHandler(error));
  }
};
