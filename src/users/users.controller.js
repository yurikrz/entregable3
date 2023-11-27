const UsersServices = require('./users.service.js')

const findAllUsers = async (req, res) => {
    try {
        const users = await UsersServices.findAllUsers()
        return res.status(200).json([
            {
                users
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

const findOneUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await UsersServices.findOneUser(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `user with id ${id} not found`
            })
        }

        return res.status(200).json([
            {
                user
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

const createUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        const userSearched = await UsersServices.findOneUserByEmail(email)
        if (userSearched) {
            return res.status(404).json({
                status: 'error',
                message: `Email address ${email} already in use, please use another email address.`
            })
        }

        const user = await UsersServices.createUser({
            name,
            email,
            password,
            role
        })
        
        return res.status(201).json([
            {
                data: user
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

const updateUser = async (req, res) => {
    try {
        const {id } = req.params
        const {name, email} = req.body
        const user = await UsersServices.findOneUser(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`
            })
        }

        const userUpdate = await UsersServices.updateUser(user, {
            name,
            email
        })

        return res.status(200).json([
            {
                userUpdate
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

const disableUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await UsersServices.findOneUser(id)

        if(!user){
            return res.status(404).json({
                status: 'error',
                message: `User with id ${id} not found`
            }) 
        }
        await UsersServices.disableUser(user)
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
    findAllUsers,
    findOneUser,
    createUser,
    updateUser,
    disableUser
}
