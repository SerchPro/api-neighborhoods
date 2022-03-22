const { response } = require('express');
const axios = require("axios");


const getNeighborhoods = async(req, res= response) =>{
    try {
        const { cp } = req.params;
        const token = 'd1441de7-6abd-4435-b062-420c1c39d674'
        console.log(cp)

        const response = await  axios.get(`https://api.copomex.com/query/get_colonia_por_cp/${cp}?token=${token}`);
        const data = response.data;

        if(data.error){
            console.log(data)
            return res.status(500).json({
                ok:false,
                msg: "something went wrong"
            })
        }

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
    getNeighborhoods
};