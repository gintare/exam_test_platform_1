import { useContext, useEffect, useState } from "react";
import "./BooksPage.css";
import BooksContext from "../../Context/BooksContext/BooksContext";
import { getAllBooks } from "../../services/get";
import { toast } from "react-toastify";
import BookCard from "../../Components/BookCard/BookCard";

function BooksPage() {
    const[ page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { books, setBooks, fiteredBooks, update, setUpdate } =
      useContext(BooksContext);
  
    const handlePageClick = (pageNumber) => {
      setPage(pageNumber);
    };
  
    useEffect(() => {
      const getBooks = async () => {
        try {
          console.log("page = "+page);
          const bo = await getAllBooks(page);
          console.log(bo.books);
          setBooks(bo.books);
          setTotalPages(bo.totalPages);
        } catch (error) {
          toast.error(error.message);
          console.error(error.message);
        }
      };
      getBooks();
      console.log(books, "boooooooooks")
    }, [page, setUpdate])


  return (
    <>
      <h1>Books page</h1>
      <div className="book-list">
        {fiteredBooks.map &&
          fiteredBooks.map((book, index) => {
            return <BookCard key={index} book={book} />;
          })}
      </div>
      <div className="book-list">
        {fiteredBooks.length == 0 &&
          books.map((book, index) => {
            return <BookCard key={index} book={book} />;
          })}
      </div>

      {fiteredBooks.length == 0 && (
        <div className="pagination-content m-3">
          <ul className="pagination pagination-ul">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${page === index ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="books-page-footer"></div>
    </>
  );
}

export default BooksPage;
