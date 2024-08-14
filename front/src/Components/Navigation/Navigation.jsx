import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserNameFromToken } from "../../utils/jwt";

import "./Navigation.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import BooksContext from "../../Context/BooksContext/BooksContext";

const Navigation = () => {
  const [searchText, setSearchText] = useState("");
  //const token = localStorage.getItem("token");
  const { books, setBooks, setFilteredBooks, update, setUpdate } =
    useContext(BooksContext);
  const navigate = useNavigate();
  //const isLoggedIn = !!localStorage.getItem('token');
  // const userName = getUserNameFromToken(token);
  //const userName = isLoggedIn ? getUserNameFromToken(token) : null;
  const userContextOutput = useContext(UserContext);
  //console.log(userContextOutput, "boooooo");
  const { isLoggedIn, userName, role : userRole } = userContextOutput;
  //console.log("role = "+role);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    toast.success("Logged out!");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if(books && searchText != ''){
      console.log("searchText = "+searchText);
      const filter = books.filter((book) => {
        return book.name.toLowerCase().includes(searchText.toLowerCase());
      });
  
      setFilteredBooks(filter);
      //setBooks(filter);
      setUpdate((prev) => prev + 1);
    } else{
      //setBooks(books);
      //const bo = await getAllBooks(0);
      setFilteredBooks([]);
      setUpdate((prev) => prev + 1);
    }
  }, [searchText, books]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler mb-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="d-flex align-items-center search-select-container">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search title..."
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* <select
              onChange={onCategorySelectChangeHandler}
              className="form-select categories-select"
              aria-label="Select boook category"
            >
              <option value="0">Select book category</option>
              {categories.map && categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select> */}
          </div>

          <div className="navbar-nav ms-auto text-end gap-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/books"
            >
              Books
            </NavLink>
            {!isLoggedIn && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          <div className="navbar-nav ms-auto text-end gap-2">
            {isLoggedIn && (
              <>
                {userRole == "ADMIN" ? (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/admin"
                  >
                    <span className="username">Account: {userName}</span>
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/profile"
                  >
                    <span className="username">Account: {userName}</span>
                  </NavLink>
                )}
                <button className="logout" onClick={logoutHandler}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
