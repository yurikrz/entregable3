const RepairsModel = require('./repairs.model.js')

class RepairsServices {
    static async findAllRepairs(){
        return await RepairsModel.findAll({
            where: {
                status: 'pending'
            }
        })
    }

    static async findOneRepair(id){
        return await RepairsModel.findOne({
            where: {
                id,
                status: 'pending'
            }
        })
    }

    static async createRepair(data){
        return await RepairsModel.create(data)
    }

    static async updateRepair(repair,data){
        return await repair.update(data)
    }

    static async cancelRepair(repair){
        return await repair.update({
            status: 'cancelled'
        })
    }

    static async findOneRepairById(id){
        return await RepairsModel.findOne({
            where: {
                id
            }
        })
    }
}

module.exports = RepairsServices