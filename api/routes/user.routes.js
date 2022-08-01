const express = require('express');
const userRouter = express.Router();
const userController = require('../../controller/user.controller')


userRouter.post('/create', userController.apiCreateUser)

userRouter.get('/query/', userController.apiSearchQuery)

userRouter.get('/', userController.apiGetAllUsers)
// userRouter.get('/', userController.sqlAllUsers)

// userRouter.get('/:id', userController.apiGetUserById)

userRouter.get('/search/:key', userController.apiSearchInAll)

userRouter.put('/update/:id', userController.apiUpdateUser)

userRouter.delete('/delete/:id', userController.apiDeleteUser)


module.exports = userRouter;
