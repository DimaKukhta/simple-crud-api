const { validate } = require('uuid');

function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function validateArgs(data) {
    const { id, name, age, hobbies} = data;
    if (id && !validate(id)) {
        return { isValid: false, message: 'Invalid id' };
    } else if (name && typeof name !== 'string') {
        return { isValid: false, message: 'Name must be a string' };
    } else if (age && typeof age !== 'number') {
        return { isValid: false, message: 'Age must be a number' };
    } else if (hobbies && !Array.isArray(hobbies)) {
        return { isValid: false, message: 'Hobbies must be an array' };
    } else {
        return { isValid: true, message: '' };
    }

}
module.exports = { validateArgs, getReqData };