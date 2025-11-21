import validator from 'validator';

const validateData = (req) => {
    const{firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) throw new Error("Not a valid name!");
    else if(!validator.isEmail(emailId)) throw new Error("Not a valid email !");
    else if(!validator.isStrongPassword(password)) throw new Error("Not a strong password !");
} 

export const validateProfileEditableData = (req) =>{
    const fieldsEditable = ["firstName", "lastName", "age", "photoUrl", "gender"];
    const isValidPatchRequest = Object.keys(req.body).every((field) => fieldsEditable.includes(field));
    return isValidPatchRequest;
}

export default validateData;