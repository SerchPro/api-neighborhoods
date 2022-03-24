

const validateDataPost = (category, data ) => {
    let dataError = { error: true, msg: 'missing parameters'};
    const dataFeatures = {};
    const { price,
        state,
        delivery_type,
        payment_method,
        property_type,
        contract_type,
        start,
        end,
        brand,
        year} = data;
    switch (category) {
        case 'Productos':
            if (!price || !delivery_type || !payment_method || !state) { return { dataFeatures, dataError} }
            dataFeatures.price = price
            dataFeatures.delivery_type = delivery_type
            dataFeatures.payment_method = payment_method
            if (state != 'Nuevo' || state != 'Usado'){
                dataError.error = true
                dataError.msg = `wrong parameter state ${state} to category ${category}`
                return { dataFeatures, dataError}
            }
            dataFeatures.state = state
            break;
        case 'Servicios':
            if (!price || !payment_method) { return { dataFeatures, dataError} }
            if (payment_method !== 'Efectivo' && payment_method !== 'Tranferencia_electrónica' && payment_method !== 'tarjeta_de_debito' && payment_method !== 'tarjeta_de_credito' ){
                console.error("----------------")
                dataError.error = true
                dataError.msg = `wrong parameter payment_method ${payment_method} to category ${category}`
                return { dataFeatures, dataError}
            }
            dataFeatures.price = price
            dataFeatures.payment_method = payment_method
            break;
        case 'Inmuebles':
            if (!price || !property_type || !contract_type) { return { dataFeatures, dataError} }
            dataFeatures.price = price
            if (property_type != 'Casa' && property_type != 'Departamento' && property_type != 'Terreno'  && property_type != 'Negocio' && property_type != 'Otro'){
                dataError.error = true
                dataError.msg = `wrong parameter property_type ${property_type} to category ${category}`
                return { dataFeatures, dataError}
            }
            dataFeatures.property_type = property_type
            if (contract_type != 'Renta' && contract_type != 'Venta' && contract_type != 'Traspaso'  && contract_type != 'Otro'){
                dataError.error = true
                dataError.msg = `wrong parameter contract_type ${contract_type} to category ${category}`
                return { dataFeatures, dataError}
            }
            dataFeatures.contract_type = contract_type
            break;
        case 'Vehículos':
            if (!price || !brand || !year) { return { dataFeatures, dataError} }
            dataFeatures.price = price
            dataFeatures.brand = brand
            dataFeatures.year = year
            break;
        default:
            break;
    }
    dataError.error = false
    return { dataFeatures, dataError}
}

module.exports = {
    validateDataPost
}