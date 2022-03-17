const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title:{
            type: String,
            min: [2, "Title must be at least 2 characters"],
            max: [20, "Title must be at most 20 characters"],
        },
        description:{
            type: String,
            required: [true, 'the description is required'],
            min: [10, "description must be at least 10 characters"],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        links:[{
            type: String
        }],
        images:[{
            type: String
        }],
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
            enum: [" ","Efectivo", "Tranferencia_electrónica", "tarjeta_de_debito", "tarjeta_de_credito"],
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
        },
        end: {
            type: Date,
        },
        brand: {
            type: String,
        },
        year: {
            type: Number,
        },
        active: {
            type: Boolean,
            default: true
        },
        _user: {
            type:Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        _favorites:
            [
                {
                    type:Schema.Types.ObjectId,
                ref: 'User'
                }
            ],
        _reviews:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = model("Post", postSchema);