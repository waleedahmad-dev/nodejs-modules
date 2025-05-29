module.exports = (req, res, next) => {
  // Store original methods
  const originalJson = res.json;
  const originalSend = res.send;

  // Override res.json
  res.json = function (body) {
    // Custom logic to modify the JSON response
    const modifiedBody = {
      status: res.statusCode,
      success: res.statusCode < 400, // true for 2xx and 3xx, false for 4xx and 5xx
      data: body, // you can wrap or modify as needed
      timestamp: new Date(),
    };

    // Call the original res.json with the modified body
    return originalJson.call(this, modifiedBody);
  };

  // Override res.send
  res.send = function (body) {
    // You can handle JSON and string responses here
    let modifiedBody = body;

    if (typeof body === 'object') {
      modifiedBody = JSON.stringify({
        status: res.statusCode,
        success: res.statusCode < 400,
        data: body,
        timestamp: new Date(),
      });
      res.set('Content-Type', 'application/json');
    }

    return originalSend.call(this, modifiedBody);
  };

  next();
};
