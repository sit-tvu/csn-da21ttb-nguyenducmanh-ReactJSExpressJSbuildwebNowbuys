

export default new class ResError {
    
    fromSystem(res, err, status_code, status_text) {
        return res.status(status_code).json({
            is_error: true,
            err: err,
            status: status_text
        })
    }

    forAuthen(res, status_code, status_text) {
        return res.status(status_code).json({
            was_signed_in: false,
            err: status_text
        });
    }

    requestInvalid(res, err, status_code, status_text) {
        return res.status(status_code).json({
            valid: false,
            err: err,
            status: status_text
        });
    }
}