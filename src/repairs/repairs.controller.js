const RepairsServices = require('./repairs.service.js')

const findAllRepairs = async (req, res) => {
    try {
        const repairs = await RepairsServices.findAllRepairs()
        return res.status(200).json([
            {
                repairs
            }
        ])
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error
        })
    }
}

const findOneRepair = async (req, res) => {
    try {
        const {id} = req.params
        const repair = await RepairsServices.findOneRepair(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Pending repair with id ${id} not found`
            })
        }

        return res.status(200).json([
            {
                repair
            }
        ])
   } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error
        })
   }
}

const createRepair = async (req, res) => {
    try {
        const {date, userId} = req.body
        const repair = await RepairsServices.createRepair({
            date,
            userId
        })
        
        return res.status(201).json([
            {
                data: repair
            }
        ])
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error
        })
    }
}

const updateRepair = async (req, res) => {
    try {
        const {id } = req.params
        const repair = await RepairsServices.findOneRepair(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Pending Repair with id ${id} not found`
            })
        }

        const repairUpdate = await RepairsServices.updateRepair(repair, {
            status: 'completed'
        })

        return res.status(200).json([
            {
                repairUpdate
            }
        ])
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
            error
        })
    }
}

const cancelRepair = async (req, res) => {
    try {
        const {id} = req.params
        const repair = await RepairsServices.findOneRepairById(id)

        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: `Repair with id ${id} not found`
            }) 
        }

        if(repair.status === 'completed'){
            return res.status(404).json({
                status: 'error',
                message: `Repair with id ${id} is already completed, It can be cancelled`
            })  
        }

        await RepairsServices.cancelRepair(repair)
        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Sometring went very wrong!',
            error
        })
    }
}

module.exports ={
    findAllRepairs,
    findOneRepair,
    createRepair,
    updateRepair,
    cancelRepair
}
