import {  Link } from "react-router-dom";

const  Barra = () =>
{
    return(
        <div>     
          <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
              aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                  <li className="nav-item">
                    <Link className="nav-link text-light fs-5" to="/">Pokemon</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light fs-5" to="/github">GitHub</Link>
                </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    );
}

export default Barra;