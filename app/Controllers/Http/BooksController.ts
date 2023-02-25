import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Book from 'App/Models/Book'
export default class BooksController {
    public async registerBook({request}:HttpContextContract){
        const book = new Book();
        const {title, editorial, format, pages, user_id} = request.all()
        book.title = title;
        book.editorial = editorial;
        book.format = format;
        book.pages = pages;
        book.user_id = user_id;
        await book.save()
        return {
            "Book": book,
            "msg": "Registro ingresado correctamente",
            "status": 200
        }
    }

    public async listAll() {
        const books = await Book.all()
        return books
    }

    public async find({params,response}:HttpContextContract){
        try{
            const book = await Book.find(params.id)
            if (book){
                return book
            } else {
                return ("Registro no existe")
            }
        } catch (error) {
            console.log(error)
            return response.status(400).json({"msg": "Error al buscar el libro"})
        }
    }

    public async update({request,params,response}:HttpContextContract) {
        const book = await Book.find(params.id);
        
        if (book) {
            const {title, editorial, format, pages, user_id} = request.all()
            book.title = title
            book.editorial = editorial
            book.format = format;
            book.pages = pages;
            book.user_id = user_id;
            if (await book.save()) {
                return {
                    "msg": "Actualizado correctamente",
                    book
                }
            }
            return response.status(400).json({"msg":"Error al actualizar"})
            
        } 
        return response.status(400).json({"msg": "Registro no encontrado"})
    }

    public async delete({params,response}:HttpContextContract){
        const id = params.id;
        try {
            await (await Book.findOrFail(id)).delete()
            return {"msg": "Eliminado correctamente", "status": 200}
        } catch(err) {
            return response.status(400).json({"msg": "Error al eliminar el registro"})
        }
     }

}
