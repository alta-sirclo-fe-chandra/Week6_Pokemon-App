import { FormEvent, useState } from "react";
import { Image } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { reduxAction } from "../utils/action";

const Navbar = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(reduxAction("search", data));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand fs-3 fw-bold" href="/">
          <Image
            src="https://cdn.worldvectorlogo.com/logos/pokemon-23.svg"
            className="me-3"
            alt="logo"
            height="80"
          />
        </a>
        <button
          className="navbar-toggler btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link active fs-4"
                aria-current="page"
                to="/pokemon/pokedek"
              >
                Pokedex
              </NavLink>
            </li>
          </ul>
          <form
            className="d-flex gap-2 ms-auto col-md-8"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setData(e.target.value)}
            />
            <button className="btn" type="submit">
              <BsSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
