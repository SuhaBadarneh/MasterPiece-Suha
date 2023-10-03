let { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    //revoke the token under specific conditions
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/public\/uploads(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/products(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}
async function isRevoked(req, object) {
  console.log("object", object);
  if (object.payload.isAdmin === false) {
    console.log("This is not admin");
    return true;
  }

  console.log("This is admin");
  return false;
}
module.exports = authJwt;
