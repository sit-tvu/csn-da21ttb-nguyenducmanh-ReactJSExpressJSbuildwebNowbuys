

function priceAfterDiscount(phone) {
    return phone.price - ((phone.price/100)*phone.discount_percentage)
}

function sortBySelect([...data], select) {

    
    data = [...data] // Chống kiểu dữ liệu reference
    select = {...select} // Chống kiểu dữ liệu reference

    let dataResult = [];

    if ((select.brand == null) && (select.sortBy == null)) { 
        return data
    } else {
        if (select.brand == null) { 
            let count = 0
            for (let i=0; i<data.length; i++) {
                let check = i
                for (let j=i+1; j<data.length; j++) {
                    switch (select.sortBy) {
                        case 'ascending': 
                            if (priceAfterDiscount(data[j]) < priceAfterDiscount(data[check])) 
                                check = j
                            break;
                        case 'descending': 
                            if (priceAfterDiscount(data[j]) > priceAfterDiscount(data[check])) 
                                check = j
                            break;
                        case 'promotion': 
                            if ((data[j].price - priceAfterDiscount(data[j])) > (data[check].price - priceAfterDiscount(data[check]))) 
                                check = j
                            break;
                    }
                }
                let temp = data[i]
                data[i] = data[check]
                data[check] = temp
                dataResult[count++] = data[i]
            }
        } else {
            let count = 0
            for (let i=0; i<data.length; i++) {
                if (data[i].brand == select.brand) {
                    let check = i
                    for (let j=i+1; j<data.length; j++) {
                        if (data[j].brand == select.brand)
                            switch (select.sortBy) {
                                case 'ascending': 
                                    if (priceAfterDiscount(data[j]) < priceAfterDiscount(data[check])) 
                                        check = j
                                    break;
                                case 'descending': 
                                    if (priceAfterDiscount(data[j]) > priceAfterDiscount(data[check])) 
                                        check = j
                                    break;
                                case 'promotion': 
                                    if ((data[j].price - priceAfterDiscount(data[j])) > (data[check].price - priceAfterDiscount(data[check]))) 
                                        check = j
                                    break;
                            }
                    }
                    let temp = data[i]
                    data[i] = data[check]
                    data[check] = temp
                    dataResult[count++] = data[i]
                } 
            }
        }        
    }

    return dataResult
}

export default sortBySelect