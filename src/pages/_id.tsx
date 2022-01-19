/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

type data = {
  name: string;
  types: string[];
};

const Id = () => {
  const { name } = useParams();
  const [img, setImg] = useState("");
  const [moves, setMoves] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<data>({
    name: "",
    types: [],
  });
  const temp = localStorage.getItem("pokedek");
  const dek = JSON.parse(temp || "[]");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsReady(false);
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        const { data } = res;
        const temp = data.moves.slice(0, 3);
        setData(data);
        setMoves(temp);
        setImg(data.sprites.other.dream_world.front_default);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  const handleCatch = async () => {
    setIsLoading(true);
    const random = Math.floor(Math.random() * 10);
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random <= 5) {
          resolve(`Success`);
        } else {
          reject(`Failed`);
        }
      }, 3000);
    });
    promise
      .then(async (value) => {
        setIsLoading(false);
        const { value: monsterName } = await Swal.fire({
          icon: "success",
          title: "Success to catching monster",
          input: "text",
          inputPlaceholder: "Enter your monster name here...",
          showCancelButton: false,
        });
        const pokeDek: any = {
          monsterName: monsterName,
          name: data.name,
          img: img,
        };
        dek.push(pokeDek);
        localStorage.setItem("pokedek", JSON.stringify(dek));
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed to catching monster",
        });
      });
  };

  if (isReady) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-4 row text-center">
            <img className="img-fluid mb-3" src={img} alt={data.name} />
            <h1 className="mb-3" style={{ textTransform: "capitalize" }}>
              {data.name}
            </h1>
            <div>
              <div className="d-flex justify-content-center">
                {data.types.map((item: any, index: number) => (
                  <div
                    style={{ textTransform: "capitalize" }}
                    key={index}
                    className="rounded-pill px-4 py-2 shadow border border-warning fs-5 m-2"
                  >
                    {item.type.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-6 text-center">
            <h2 className="mt-5 mt-md-0">Moves</h2>
            <div className="row justify-content-center">
              {moves.map((item: any, index: number) => (
                <div
                  key={index}
                  className="col-5 col-lg-4 rounded-pill m-3 px-4 py-2 shadow border border-success fs-5"
                  style={{ textTransform: "capitalize" }}
                >
                  {item.move.name}
                </div>
              ))}
              <div className="row justify-content-center mt-5">
                <div className="col-6 col-md-4">
                  <img
                    className={`${
                      isLoading ? "App-logo img-fluid mb-3" : "img-fluid mb-3"
                    }`}
                    src="https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_960_720.png"
                    alt="pokeball"
                  />
                </div>
                <div className="col-12">
                  {isLoading ? (
                    <p className="fs-5">Catching...</p>
                  ) : (
                    <p
                      className="fs-5"
                      onClick={handleCatch}
                      style={{ cursor: "pointer" }}
                    >
                      Catch This Pokemon
                    </p>
                  )}
                </div>
              </div>
            </div>
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

export default Id;
