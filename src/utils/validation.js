import validator from 'validator';

const validateData = (req) => {
    const{firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) throw new Error("Not a valid name!");
    else if(!validator.isEmail(emailId)) throw new Error("Not a valid email !");
    else if(!validator.isStrongPassword(password)) throw new Error("Not a strong password !");
} 

export default validateData;