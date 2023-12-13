

export default new class Product {

    typeArrayList(res, data, status_code = 200, status_text = '') {
        return res.status(status_code).json({
            data: data,
            status: status_text
        });
    } 
}