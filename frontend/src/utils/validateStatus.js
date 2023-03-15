const validateStatus = (status) => {
    return status >= 200 && status < 300 || status === 201; // Accept 201 as a successful response
}

export default validateStatus;