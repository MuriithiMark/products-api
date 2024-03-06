const loginSchema = {
    username: {
        notEmpty: {
            errorMessage: "username cannot be empty"
        },
        isString: {
            errorMessage: 'username must be a string'
        },
        isLength: {
            options: {
                min: 3,
                max: 16,
            },
            errorMessage: "username must be between 3 and 16 characters"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isString: {
            errorMessage: 'password must be a string'
        },
        isLength: {
            options: {
                min: 3,
                max: 16,
            },
            errorMessage: "password must be between 3 and 16 characters"
        }
    }
}

const newUserSchema = {
    email: {
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isString: {
            errorMessage: 'email must be a string'
        },
        isEmail: {
            errorMessage: 'email is not valid'
        }
    },
    ...loginSchema,
}

export {
    loginSchema,
    newUserSchema
}