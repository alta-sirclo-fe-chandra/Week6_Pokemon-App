/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../utils/reducer";

const Index = () => {
  const [poke, setPoke] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const searchValue = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [url]);

  useEffect(() => {
    searchValue !== "" ? requestSearch(searchValue) : fetchData();
  }, [searchValue]);

  const fetchData = async () => {
    setIsReady(false);
    await axios
      .get(url)
      .then((res) => {
        const { data } = res;
        setPoke(data.results);
        setNext(data.next);
        setPrev(data.previous);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  const handlenext = () => {
    setUrl(next);
  };

  const handleprev = () => {
    setUrl(prev);
  };

  const requestSearch = async (searchValue: string) => {
    setIsReady(false);
    await axios
      .get(`${url}?limit=100&offset=0`)
      .then((res) => {
        const { data } = res;
        const temp = data.results;
        const searchRegex = new RegExp(searchValue, "i");
        const filterRows = temp.filter(function (el: any) {
          return searchRegex.test(el.name);
        });
        setPoke(filterRows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  const handleDetail = (item: any) => {
    navigate(`/pokemon/${item.name}`);
  };

  if (isReady) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 text-end">
            <img
              className="img-fluid"
              src="https://image.flaticon.com/icons/png/512/1033/1033083.png"
              alt="banner"
            />
          </div>
          <div className="col-5 align-self-center">
            <h1 className="display-3 fw-bold position-relative">
              Snap <br /> Adventure
            </h1>
          </div>
        </div>
        <div className="row my-5 justify-content-center">
          {poke.map((item: any, index) => (
            <div
              key={index}
              className="col-9 col-md-5 col-lg-3 d-flex justify-content-center align-items-center m-2 py-3 px-4 rounded-pill shadow"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.url
                  .slice(34, 37)
                  .replace(/\/+$/, "")}.svg`}
                alt="pic"
                height="80"
                width="80"
              />
              <p
                className="fs-5 ms-3 mb-0"
                onClick={() => handleDetail(item)}
                style={{ cursor: "pointer", textTransform: "capitalize" }}
              >
                {item.name}
                <BsChevronRight className="ms-3" />
              </p>
            </div>
          ))}
          <div
            className={`${
              searchValue
                ? "d-none"
                : "col-9 col-md-5 col-lg-3 d-flex align-items-center justify-content-center m-2 py-3 px-4 rounded-pill shadow"
            }`}
          >
            <p
              className="fs-5 me-3 mb-0"
              onClick={handleprev}
              style={{ cursor: "pointer" }}
            >
              <BsChevronLeft className="me-3" />
              Prev
            </p>
            <p
              className="fs-5 ms-3 mb-0"
              onClick={handlenext}
              style={{ cursor: "pointer" }}
            >
              Next
              <BsChevronRight className="ms-3" />
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }
};

export default Index;
