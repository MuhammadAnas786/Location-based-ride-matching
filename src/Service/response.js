export const response = (res, status, body) => {
  res.status(status).json(body);
};
