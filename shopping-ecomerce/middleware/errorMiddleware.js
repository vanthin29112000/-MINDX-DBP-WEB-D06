const errorHandle = (error, req, res, next) => {
   res.status(res.statusCode);
   res.json({
      message: error.message,
   });
};

module.exports = {
   errorHandle,
};
