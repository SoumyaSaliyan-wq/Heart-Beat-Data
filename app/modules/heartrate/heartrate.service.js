const heartRate=require('../../models/heartrate.model')

module.exports.createData = async params => {
    try {
        const data = await heartRate.create(params);
        return data;
    }
    catch (error) {
        throw new Error(error)
    }
}
module.exports.updateData = async (updateParams,whereParams)=>{
    try{
        const data = await heartRate.update({...updateParams},{where:{...whereParams}})
        return data[0];
    }
    catch(error)
    {
        throw new Error(error)
    }  
}
module.exports.findData = async (params,attributes) => {
    try {
        const data = await heartRate.findOne({ where: { ...params }, ...(attributes && { attributes }) });
        return data;
    }
    catch (error) {
        throw new Error(error)
    }

}