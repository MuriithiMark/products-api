export const newProductsSchema = {
    name: {
        notEmpty: {
            errorMessage: "name cannot be empty"
        },
        isString: {
            errorMessage: 'name must be a string'
        },
        isLength: {
            options: {
                min: 3,
                max: 16,
            },
            errorMessage: "name must be between 3 and 16 characters"
        }
    },
    description: {
        notEmpty: {
            errorMessage: "description cannot be empty"
        },
        isString: {
            errorMessage: 'description must be a string'
        },
        isLength: {
            options: {
                min: 3,
            },
            errorMessage: "description must not be less than 3 characters"
        }
    },
    category: {
        notEmpty: {
            errorMessage: "category cannot be empty"
        },
        isString: {
            errorMessage: 'category must be a string'
        },
        isLength: {
            options: {
                min: 3,
                max: 16,
            },
            errorMessage: "category must be between 3 and 16 characters"
        }
    },
    imgUrl: {
        // notEmpty: {
        //     errorMessage: "name cannot be empty"
        // },
        isString: {
            errorMessage: 'imgUrl must be a string'
        },
        isLength: {
            options: {
                min: 3,
            },
            errorMessage: "imgUrl must not be less than 3 characters"
        }
    },
}

export const updateProductsSchema = {
    id: {
        notEmpty: {
            errorMessage: "id cannot be empty"
        },
        isString: {
            errorMessage: 'id must be a string'
        },
        isLength: {
            options: {
                min: 3,
                max: 40,
            },
            errorMessage: "category must be between 3 and 40 characters"
        }
    },
    ...newProductsSchema,
}