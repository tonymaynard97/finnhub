// 4xx-5xx errors need to be handled as wont be caught by the catch
const checkResponseStatus = (res) => {
  if (res.ok) {
    return res;
  } else {
    throw new Error(`${res.status}`);
  }
};
module.exports = { checkResponseStatus };
