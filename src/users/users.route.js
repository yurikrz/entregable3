const express = require('express')
const router = express.Router()
const {findAllUsers, findOneUser, createUser, updateUser, disableUser} = require('./users.controller.js')

//endpoint Obtener el listado de todos los usuarios de la BD
router.get('/',findAllUsers)

//Obtener un solo usuario dado un id
router.get('/:id',findOneUser)

//Crear un nuevo usuario, se debe proporcionar por elreq.body (name, email, password, role), elrole (rol) puede ser client o employee
router.post('/',createUser)

//Actualizar los datos de un usuario dado un id, solo puede actualizar su name y email
router.patch('/:id',updateUser)

//Deshabilitar la cuenta de un usuario, cambiar status a disabled
router.delete('/:id',disableUser)

module.exports = router