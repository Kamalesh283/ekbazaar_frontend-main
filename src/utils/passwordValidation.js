export const checkPasswordLength = (password) => {
    if (password.length >= 6) {
       return true
    } else {
        return false
    }
};
export const checkSpecialCharacters = (password) => {
    const pattern = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
    if (pattern.test(password)) {
        return true
    } else {
        return false
    }
};
// Check for an uppercase character
export const checkUppercase = (password) => {
    const pattern = /[A-Z]/;
    if (pattern.test(password)) {
        return true
    } else {
        return false
    }
};
// Check for lowercase character
export const checkLowerCase = (password) => {
    const pattern = /[a-z]/;
    if (pattern.test(password)) {
        return true
    } else {
        return false
    }
};
// Check for a number
export const checkNumber = (password) => {
    const pattern = /[0-9]/;
    if (pattern.test(password)) {
        return true
    } else {
        return false
    }
};

export const validateCriteria = (charNumberValid, uppercaseValid, specialCharValid, numberValid) => {
    if (
        !charNumberValid ||
        !uppercaseValid ||
        !specialCharValid ||
        !numberValid
    ) {
        return false
    } else {
        return true
    }
}
