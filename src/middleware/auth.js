export const userAuth = (req,res,next) => {
    console.log("User Authentication has started !");
    const token  = "jwt-secret";
    if(token === "jwt-secret"){
        console.log("User Authentication Successful!");
        next();
    }
    else{
        res.status(401).send("Unauthorized User, Ban and Report Him to CBI");
    }
};

export const adminAuth = (req,res, next) => {
    console.log("Admin Authentication has started !");
    const token  = "jwt-secret3";
    if(token === "jwt-secret2"){
        console.log("Admin Authentication Successful!");
        next();
    }
    else{
        res.status(401).send("Unauthorized Admin, Try Again!");
    }
}
