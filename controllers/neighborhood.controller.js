const { response } = require('express');
const axios = require("axios");


const getNeighborhoods = async(req, res= response) =>{
    try {
        const { cp } = req.params;
        //const {data:response} = await  axios.get(`https://apisgratis.com/cp/colonias/cp/?valor=${cp}`);
        //let data = [];
        let data = [
            'ELECTRA',
            'LA LOMA',
            'ARCOS ELECTRA',
            'MIGUEL HIDALGO',
            'VALLE DEL PARAISO',
            'VIVEROS DEL RIO',
            'VIVEROS DEL VALLE',
            'VALLE DE LOS PINOS 2DA. SECCION',
            'VALLE SOL'
          ]
        /*response.map( colonia =>{
            data.push(colonia.Colonia)
        });*/
        return res.json({
            ok:true,
            data
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


module.exports = {
    getNeighborhoods,
};