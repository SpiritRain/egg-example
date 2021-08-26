const baseResponse = {
    code: {
        type: 'number',
        required: true,
        example: 200
    },
    message: {
        type: 'string',
        required: true,
        example: 'success'
    },
    data: {
        type: 'string',
        example: ''
    },
}

module.exports = {
    baseResponse: baseResponse
};