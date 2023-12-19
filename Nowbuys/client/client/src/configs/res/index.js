

export default new class ResConfig {
    err(err) {
        switch (err.response.status) {
            case 401:
                return {
                    data: {
                        error: true,
                        not_sign_in: true,
                        message: err.response.data.message
                    }
                }
                break;
            default: 
                return {
                    data: {
                        error: true,
                        message: err.response.data.message
                    }
                }
        } 
    }
}