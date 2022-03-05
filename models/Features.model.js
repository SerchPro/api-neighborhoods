const { Schema, model } = require("mongoose");

const featuresSchema = new Schema(
    {
        price: {
            type: Number,
        },
        state: {
            type: String,
            enum: [" ", "Nuevo", "Usado"],
            default: " "
        },
        delivery_type: {
            type: String,
            enum: [" ","Establecimiento", "Servicio_a_domicilio", "punto_medio"],
            default: " "
        },
        payment_method :{
            type: String,
            enum: [" ","Establecimiento", "Servicio_a_domicilio", "punto_medio"],
            default: " "
        },
        property_type :{
            type: String,
            enum: [" ", "Casa", "Departamento", "Terreno", "Negocio", "Otro"],
            default: " "
        },
        contract_type :{
            type: String,
            enum: [" ", "Renta", "Venta", "Traspaso", "Otro"],
            default: " "
        },
        start: {
            type: Date,
            required: true
        },
        marca: {
            type: String,
        },
        modelo: {
            type: Number,
        },
        end: {
            type: Date,
            required: true
        },
        _post: {
            type:Schema.Types.ObjectId,
            ref: 'Post'
        }
    },
    {
        timestamps: true,
    }
);

const Features = model("Features", featuresSchema);
module.exports = Features;