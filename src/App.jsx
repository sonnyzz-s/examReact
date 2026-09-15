import { useState } from "react";

export default function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "мега название", author: "супер автор", genre: "лютый жанр", year: 812, text: "мощный текст", rating: 10, reviews: [], readTimes: 1000 },
    { id: 2, title: "мега супер название2", author: "супер пупер автор2", genre: "лютый мега жанр2", year: 52, text: "ультра мощный текст2", rating: 9, reviews: [], readTimes: 500 }
  ]);

  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", year: "", text: "", rating: "", reviews: [], readTimes: 0 });

  const addBook = () => setBooks([...books, newBook]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const editBook = (id) => {
    const book = books.find(b => b.id === id);
    if (!book) return;

    const title = prompt("новое название:", book.title);
    const author = prompt("новый автор:", book.author);
    const genre = prompt("новый жанр:", book.genre);
    const year = prompt("новый год:", book.year);
    const text = prompt("новый текст:", book.text);

    setBooks(books.map(b => b.id === id ? { ...b, title, author, genre, year, text } : b));
  };

  const addReview = (id) => {
    const review = prompt("введите отзыв:");
    setBooks(books.map(b => b.id === id ? { ...b, reviews: [...b.reviews, review] } : b));
  };

  const changeRating = (id) => {
    const changedRating = Number(prompt("новый рейтинг (0-5):"));
    setBooks(books.map(b => b.id === id ? { ...b, rating: changedRating } : b));
  };
    
  const readBook = (id) => {
    const book = books.find(b=>b.id===id);
    alert(book.text);
    setBooks(books.map(b=>b.id === id ? {...b, readTimes: b.readTimes + 1 } : b));
  };

  const searchByTitle = () => {
  setSearchResults(books.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  const searchByAuthor = () => {
  setSearchResults(books.filter(b => b.author.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  const searchByGenre = () => {
  setSearchResults(books.filter(b => b.genre.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  const topAllBooks = [...books].sort((a,b) => b.readTimes - a.readTimes).slice(0,10);
  const topByGenre = genre => books.filter(b =>b.genre === genre).sort((a,b) => b.readTimes - a.readTimes).slice(0,10)
  const topByAuthor = author => books.filter(b => b.author === author).sort((a,b) => readTimes - a.readTimes).slice(0,10);


  return (
    <div>
      <ul>
        <li>Библиотека</li>
        {books.map(b => 
          <li key={b.id}>
            <input value={b.title} onChange={e => setBooks(books.map(x => x.id===b.id ? {...x, title:e.target.value} : x))} />
            <input value={b.author} onChange={e => setBooks(books.map(x => x.id===b.id ? {...x, author:e.target.value} : x))} />
            <input value={b.genre} onChange={e => setBooks(books.map(x => x.id===b.id ? {...x, genre:e.target.value} : x))} />
            <input value={b.year} onChange={e => setBooks(books.map(x => x.id===b.id ? {...x, year:e.target.value} : x))} />
            <input value={b.text} onChange={e => setBooks(books.map(x => x.id===b.id ? {...x, text:e.target.value} : x))} />
            <input value={b.rating} onChange={e => setBooks(books.map(x => x.id===b.id ? {...x, rating:e.target.value} : x))} />
            <button onClick={() => setBooks(books.map(x => x.id===b.id ? {...x, readTimes:x.readTimes+1} : x))}>Читать</button>
          </li>
        )}

        <li>Добавить книгу</li>
        <li><input placeholder="Название" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} /></li>
        <li><input placeholder="Автор" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} /></li>
        <li><input placeholder="Жанр" value={newBook.genre} onChange={e => setNewBook({ ...newBook, genre: e.target.value })} /></li>
        <li><input placeholder="Год" value={newBook.year} onChange={e => setNewBook({ ...newBook, year: e.target.value })} /></li>
        <li><input placeholder="Текст книги" value={newBook.text} onChange={e => setNewBook({ ...newBook, text: e.target.value })} /></li>
        <li><input placeholder="Рейтинг" value={newBook.rating} onChange={e => setNewBook({ ...newBook, rating:e.target.value })} /></li>
        <li><button onClick={addBook}>Добавить</button></li>

        <li>ТОП-10 всех</li>
        {books.sort((a,b)=>b.readTimes-a.readTimes).slice(0,10).map(b=><li key={b.id}>{b.title} - {b.readTimes} прочтений</li>)}

        <li>ТОП-10 по жанру</li>
        {books.sort((a,b)=>b.readTimes-a.readTimes).slice(0,10).map(b=><li key={b.id}>{b.title} - {b.readTimes} прочтений</li>)}

        <li>ТОП-3 по автору</li>
        {books.sort((a,b)=>b.readTimes-a.readTimes).slice(0,3).map(b=><li key={b.id}>{b.title} - {b.readTimes} прочтений</li>)}
      </ul>

      {/* 🔹 Блок поиска */}
      <div>
        <input 
          placeholder="Введите запрос" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
        />
        <button onClick={searchByTitle}>Поиск по названию</button>
        <button onClick={searchByAuthor}>Поиск по автору</button>
        <button onClick={searchByGenre}>Поиск по жанру</button>

        <ul>
          {searchResults.map(b => (
            <li key={b.id}>{b.title} - {b.author} - {b.genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}