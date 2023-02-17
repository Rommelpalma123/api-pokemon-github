import React from "react";
import { DotWave } from "@uiball/loaders";

const Cargando = () => 
{
  return (
    <div>
      <div
        className="container text-center mt-5"
        style={{ display: "grid", placeItems: "center" }}
      >
        <DotWave size={60} speed={1} color="black" />
      </div>
    </div>
  );
};

export default Cargando;
