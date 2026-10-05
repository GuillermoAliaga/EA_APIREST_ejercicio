Video:
https://drive.google.com/drive/u/1/folders/1UwvnCp1VQk7zFsj2jQiiFG3GwOfvsGzw
Uso de IA: (Claude)
- Porque me da error al importar Tag? Respuesta: tenia que en el modelo Tag poner export deafult. Pero al poner esto me ha salido otro error en el bookservice. El error se solucionaba poniendo un if para en el caso de que no se encuentre el tag.
- const book = await BookService.añadirtag(bookId,tipotag, req.body); cuando añado esta linea al controlador de books me salta error en la función añadirtag, me pone que no existe pero si la he creado en bookservice.
- Property 'añadirtag' does not exist on type '{ createBook: (data: IBook) => Promise<Document<unknown, {}, IBookModel, {}, DefaultSchemaOptions> & IBookModel & Required<{ ...; }> & { ...; } & { ...; }>; getBookById: (bookId: string) => Query<...>; getAllBooks: () => Query<...>; updateBook: (bookId: string, data: IBook) => Query<...>; deleteBook: (bookId: string...'. Solución: se me había olvidado exportar esta función para que la pudiese usar el controlador.
- (Le he pasado la función añadirtag, con unos ejemplos de los comentarios para el router)Hazme los comentarios del añadirtag. Solución: me los ha dado perfectos, se los he pedido porque un simple fallo y todo daba error.
- Al ejecutar esta función si se actualiza en la base de datos pero no en el swagger que le falta? Solución: ke faltaba una linea new:true, porque la función lo que hace es remplazar los tags pero la propia función devuelve el documento antiguo y no el nuevo ya cambiado
- (Le he pasado la función remplazarTag, con unos ejemplos de los comentarios para el router)Hazme los comentarios del remplazarTag.
- Cuando ejecuto dice que no existen los tags que le estoy pasando. Solución: básicamente se me habia olvidado agragar los diferentes casos de tags a la base de datos 
- Claro ahora al crear el modelo tag, el modelo book recibe un object.id en vez de un string, por lo que ahora no crea el libro como lo puedo solucionar. Solución: traducir con Tag.find en el service. Pero ahora los tags me salen solo con su id, para solucionarlo en el populate he añadido un name.
- Que es lo contrario que $addToSet?
