import { useParams } from "react-router-dom";
import "./BookDetalesPage.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { getOneBook } from "../../services/get";
import { toast } from "react-toastify";

function BookDetalesPage() {
    const { id: bookId } = useParams();
  const contextContent = useContext(UserContext);
  const {user, isLoggedIn, id : userId, token} = contextContent;
  const [book, setBook] = useState({});
  const [category, setCategory] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getBook = async () => {
        try{
          const bo = await getOneBook(bookId)
          setBook(bo);
          setCategory(bo.category.title);
          
          if(bookId && isLoggedIn) {
            // const isFav = await getIsFavorite(userId, bookId);
            // //console.log("isFav = "+isFav);
            // setFavorite(isFav);
          }

        }catch(error){
          console.error(error.message);
          toast.error(error.message);
        }

    };
    getBook();
  }, []);


  return (
    <>
      <div className="row">
        <div className="book-detales-page-img col-sm-6 image-content">
          <img src={book.image} alt="recipe_photo" />
        </div>
        <div className="col col-sm-6 recipe-info-content">
          <h5 className="card-title">{book.name}</h5>
          <br />
          <label htmlFor="description" className="col col-form-label">
            Description:
          </label>
          <div className="col ">{book.description}</div>
          <label htmlFor="isbn" className="col col-form-label">
            ISBN:
          </label>
          <div id="isbn" className="col ">
            {book.isbn}
          </div>
          <label htmlFor="categoryName" className="col col-form-label">
            Book category:
          </label>
          <div className="col ">{category}</div>
          Pages count : {book.pagesCount}
        </div>
      </div>
      {/* <div className="row">
        {isLoggedIn && (
          <div className="col col-sm-6 p-5">
            <span>My favorite</span>
            {favorite ? (
              <>
                <HeartFill
                  color="red"
                  size="36"
                  onClick={clickFavoriteHandler}
                />{" "}
              </>
            ) : (
              <Heart color="red" size="36" onClick={clickFavoriteHandler} />
            )}
          </div>
        )}
        <div className="col col-sm-6 p-5">
          {isLoggedIn && <Stars bookId={bookId} userId={userId} />}
        </div>
      </div>
      {isLoggedIn && <Comments book={book} bookId={bookId} />} */}
    </>
  );
}

export default BookDetalesPage;
