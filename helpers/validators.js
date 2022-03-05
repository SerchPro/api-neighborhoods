

const correctPassword = async(password) => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(password)) {
        throw new Error(`"Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter."`)
    };
}

module.exports = {
    correctPassword
}