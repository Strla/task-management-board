export const validationRules = {
    title: {
        required: 'Title is required',
        minLength: {
            value: 3,
            message: 'Title must be at least 3 characters'
        },
        maxLength: {
            value: 50,
            message: 'Title cannot exceed 50 characters'
        }
    },
    description: {
        required: 'Description is required',
        minLength: {
            value: 5,
            message: 'Description must be at least 5 characters'
        },
        maxLength: {
            value: 200,
            message: 'Description cannot exceed 200 characters'
        }
    }
};
