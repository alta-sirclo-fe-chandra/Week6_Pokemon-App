/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { GiSprout } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Pokedek = () => {
  const [poke, setPoke] = useState<any>([]);
  const [isReady, setIsReady] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const temp = localStorage.getItem("pokedek");
    setPoke(JSON.parse(temp || "[]"));
  }, [isReady]);

  const handleDetail = (item: any) => {
    navigate(`/pokemon/${item.name}`);
  };

  const handleRelease = (item: any) => {
    setIsReady(false);
    setTimeout(() => {
      const temp = poke;
      temp.splice(poke.indexOf(item), 1);
      localStorage.setItem("pokedek", JSON.stringify(poke));
      setPoke(temp);
      setIsReady(true);
    }, 1000);
  };

  if (isReady) {
    return (
      <div className="container text-center">
        <h2>My Pokemon</h2>
        <div className="row my-5 justify-content-center">
          {poke.map((item: any, index: number) => (
            <div
              key={index}
              className="col-3 d-flex align-items-center m-2 py-3 px-4 rounded-pill shadow"
            >
              <img src={item.img} alt="pic" height="80" width="80" />
              <div className="text-start">
                <div
                  className="d-flex fs-5 ms-3 mb-0"
                  style={{ textTransform: "capitalize" }}
                >
                  {item.monsterName}
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-${item.name}`}>Release</Tooltip>
                    }
                  >
                    <p
                      style={{ cursor: "pointer" }}
                      className="ms-3 mb-0"
                      onClick={() => handleRelease(item)}
                    >
                      <GiSprout />
                    </p>
                  </OverlayTrigger>
                </div>
                <p
                  className="fs-6 ms-3 mb-0"
                  onClick={() => handleDetail(item)}
                  style={{ cursor: "pointer", textTransform: "capitalize" }}
                >
                  {item.name}
                  <BsChevronRight className="ms-3" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
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

export default Pokedek;
