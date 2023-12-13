

export default new class ResSuccess {
    
    default(res, data, status_code, status_text) {
        return res.status(status_code).json({
            success: true, 
            status: status_text
        })
    } 
}