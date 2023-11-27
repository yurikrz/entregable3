const UsersModel = require('./users.model.js')

class UsersServices {
    static async findAllUsers(){
        return await UsersModel.findAll()
    }

    static async findOneUser(id){
        return await UsersModel.findOne({
            where: {
                id
            }
        })
    }

    static async createUser(data){
        return await UsersModel.create(data)
    }

    static async updateUser(user,data){
        return await user.update(data)
    }

    static async disableUser(user){
        return await user.update({
            status: 'disabled'
        })
    }
    
    static async findOneUserByEmail(email){
        return await UsersModel.findOne({
            where: {
                email
            }
        })
    }
}

module.exports = UsersServices