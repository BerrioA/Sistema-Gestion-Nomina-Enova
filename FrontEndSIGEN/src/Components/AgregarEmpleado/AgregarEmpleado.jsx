import React from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

export const AgregarAdmin = () => (
  <div className="columns is-centered is-vcentered is-fullheight">
    <div className="column is-4">
      <div className="box has-text-centered">
        <p className="has-text-grey is-size-5">AGREGAR ADMINISTRADOR</p>
        <InfoSigen />
        <form>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Ingrese su usuario"
              />
              <span className="icon is-small is-left">
                <FaRegUser />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Ingrese su contraseña"
              />
              <span className="icon is-small is-left">
                <RiLockPasswordLine />
              </span>
            </div>
          </div>
          <div className="field">
            <button className="button is-fullwidth is-danger is-outlined">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
