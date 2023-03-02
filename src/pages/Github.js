import React, { useState } from "react";

function Github() {
  const [search, setSearch] = useState("");
  const [user, findUser] = useState(null);

  const getUser = async () => {
    try {
      const respuesta = await fetch(
        `https://api.github.com/users/${search}`.toLowerCase()
      );
      const data = await respuesta.json();
      findUser(data);
    } catch (err) {
      console.log(err.message, "algo salio mal al traer los datos");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-6 mt-2">
            <input
              className="form-control"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ingresa el nombre de un usuario"
            />
          </div>
          <div className="col-md-6 mt-2">
            <button className="form-control btn btn-info" onClick={getUser}>
              Enviar
            </button>
          </div>
        </div>
      </div>

      <article className="bg-light mt-5 container">
        {user && (
          <div>
            <div className="row row-cols-1 row-cols-md-3 g-2">
              <div className="col">
                <div className="card">
                  <img
                    src={user.avatar_url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{user.login}</h5>
                    <p className="card-text">{user.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
export default Github;
