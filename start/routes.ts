/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.post('/register', 'AuthController.registerUser').middleware(['auth','admin'])
  Route.post('/login','AuthController.login')

  Route.group(()=>{
    Route.get('/list','UsersController.listAll')
    Route.get('/find/:id','UsersController.find')

    Route.put('/update/:id','UsersController.update').middleware(['auth','admin'])
    
    Route.delete('/delete/:id','UsersController.delete').middleware(['auth','admin'])
  }).prefix('/user')

  Route.group(()=>{
    Route.post('/registerBook','BooksController.registerBook').middleware(['auth','editor'])

    Route.get('/list','BooksController.listAll')
    Route.get('/find/:id','BooksController.find')

    Route.put('/update/:id','BooksController.update').middleware(['auth','editor'])
    
    Route.delete('/delete/:id','BooksController.delete').middleware(['auth','editor'])

  }).prefix('/book')

  Route.group(()=>{
    Route.post('/registerProfile','ProfilesController.registerProfile').middleware(['auth','admin'])

    Route.get('/list','ProfilesController.listAll')
    Route.get('/find/:id','ProfilesController.find')

    Route.put('/update/:id','ProfilesController.update').middleware(['auth','admin'])
    
    Route.delete('/delete/:id','ProfilesController.delete').middleware(['auth','admin'])

    
  }).prefix('/profile')

  


  
}).prefix('/api')