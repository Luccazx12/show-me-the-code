export const getIpAddressFromRequest = (req: any) => {
  var ipAddr =
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  if (req.headers && req.headers['x-forwarded-for']) {
    [ipAddr] = req.headers['x-forwarded-for'].split(',').pop().trim();
  }

  return ipAddr;
};
