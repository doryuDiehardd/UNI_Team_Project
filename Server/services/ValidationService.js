const ValidationService = {
    validateData_IsAllFilled: (data) => {
        let errors = {};

        for (const [key, value] of Object.entries(data)){
            if (!value){
                errors[key + '_err'] = 'Field is required';
            }
        }

        return errors;
    },

    validateEmail: (email) => {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
        return emailRegexp.test(email);
    }
}

module.exports = ValidationService;