const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const rolesPermission = (function () {
  ac.grant("basic").readOwn("profile").updateOwn("profile");

  ac.grant("supervisor").extend("basic").readAny("profile");

  ac.grant("admin")
    .extend("basic")
    .extend("supervisor")
    .updateAny("profile")
    .deleteAny("profile");

  return ac;
})();



const grantAccess = function(action, resource) {
  return async (req, res, next) => {
   try {
    const permission = rolesPermission.can(req.user.role)[action](resource);
    if (!permission.granted) {
     return res.status(401).json({
      error: "You don't have enough permission to perform this action"
     });
    }
    next()
   } catch (error) {
    next(error)
   }
  }
 }
  
 const allowIfLoggedin = async (req, res, next) => {
  try {
   const user = res.locals.loggedInUser;
   if (!user)
    return res.status(401).send(
     "You need to be logged in to access this route"
    );
    req.user = user;
    next();
   } catch (error) {
     console.log("error : ", error)
    // next(error);
   }
 }

 module.exports={
   rolesPermission,
   allowIfLoggedin,
   grantAccess
 }