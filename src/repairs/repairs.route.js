const express = require('express')
const router = express.Router()
const {findAllRepairs, findOneRepair, createRepair, updateRepair, cancelRepair} = require('./repairs.controller.js')

//Obtener la lista de motos pendientes (pending) de reparar
router.get('/',findAllRepairs)

//Obtener una moto pendiente de reparar por su id
router.get('/:id',findOneRepair)

//Crear una cita, se debe incluir en elreq.body lo siguiente (date, userId) El userId siendo el id del usuario quien solicita la reparación.
router.post('/',createRepair)

//Actualizar el status de una reparación ha completado (cambiar status a completed)
router.patch('/:id',updateRepair)

//Cancelar la reparación de un usuario (cambiar status a cancelled)

router.delete('/:id',cancelRepair)

module.exports = router