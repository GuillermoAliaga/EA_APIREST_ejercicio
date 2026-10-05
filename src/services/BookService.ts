
import Book, { IBook } from '../models/Book';
import Tag from '../models/Tag';

// Funcion que se encarga de crear un libro en la base de datos
export const createBook = async (data: Omit<IBook, 'tags'> & { tags?: string[] }) => {
  const tagNames = data.tags ?? [];
  const tagDocs = await Tag.find({ name: { $in: tagNames } });
  const tagIds = tagDocs.map(t => t._id);

  const book = new Book({ ...data, tags: tagIds });
  return book.save();
};

// Funcion que busca un libro por su ID en la base de datos
export const getBookById = (bookId: string) => {
    // Buscamos el libro por su ID y obtenemos tambien los datos de sus autores
    return Book.findById(bookId).populate('authors').populate('tags', 'name').lean();
};

// Funcion que busca todos los libros de la base de datos
export const getAllBooks = () => {
    // Buscamos todos los libros y obtenemos tambien los datos de sus autores
    return Book.find().populate('authors').populate('tags', 'name').lean();
};

// Funcion que se encarga de actualizar un libro
export const updateBook = async (
  bookId: string,
  data: Omit<IBook, 'tags'> & { tags?: string[] }
) => {
  const tagNames = data.tags ?? [];
  const tagDocs = await Tag.find({ name: { $in: tagNames } });
  const tagIds = tagDocs.map(t => t._id);

  return Book.findByIdAndUpdate(
    bookId,
    { ...data, tags: tagIds },
    { returnDocument: 'after' }
  )
    .populate('authors')
    .populate('tags', 'name')
    .lean();
};

// Funcion que se encarga de eliminar un libro de la base de datos
export const deleteBook = (bookId: string) => {
    // Buscamos el libro por su ID y lo eliminamos
    return Book.findByIdAndDelete(bookId);
};

export const añadirtag =async (bookId: string, tipotag: string) => {
const tag = await Tag.findOne({ name: tipotag });
 if (!tag) {
     throw new Error(`Tag no encontrado: ${tipotag}`);
 }
 const book = await Book.findByIdAndUpdate(
    bookId,
    { $addToSet: { tags: tag._id } },
    { returnDocument: 'after' }
  ).populate('authors').populate('tags', 'name').lean();

  return book;
};

export const remplazarTags = async (bookId: string, nombresTags: string[]) => {
    const tagDocs = await Tag.find({ name: { $in: nombresTags } });
    const tagIds = tagDocs.map(t => t._id);

    const book = await Book.findByIdAndUpdate(
        bookId,
        { tags: tagIds },
        { returnDocument: 'after' }
    ).populate('authors').populate('tags', 'name').lean();

    return book;
};

export const deleteTag=async (bookId: string, tipoTag: string) => {
    const tag = await Tag.findOne({ name: tipoTag });
    if (!tag) {
        throw new Error(`Tag no encontrado: ${tipoTag}`);
    }

    const book = await Book.findByIdAndUpdate(
        bookId,
        { $pull: { tags: tag._id } },
        { returnDocument: 'after' }
    ).populate('authors').populate('tags', 'name').lean();

    return book;
};

// Exportamos todas las funciones para poder utilizarlas desde el controlador
export default {
    createBook,

    getBookById,

    getAllBooks,

    updateBook,

    deleteBook,

    añadirtag,

    remplazarTags,

    deleteTag
};
