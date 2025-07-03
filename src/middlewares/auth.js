const adminAuth = (req, resp, next) => {
  console.log("Admin auth is getting checked!!");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    return resp.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req, resp, next) => {
  console.log("User auth is getting checked!!");
  const token = "xyz";
  const isUserAuthorized = token === "xyz123";
  if (!isUserAuthorized) {
    return resp.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
