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
    },

    filterFields: (data, allowedFields) => {
        let filtered_data = {};
        
        allowedFields.forEach(allowed_field => {
            if (data[allowed_field]){
                filtered_data[allowed_field] = data[allowed_field];
            }
        });

        return filtered_data;
    }
}

module.exports = ValidationService;