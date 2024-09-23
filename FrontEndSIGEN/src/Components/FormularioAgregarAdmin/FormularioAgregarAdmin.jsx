import React from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

export const FormularioAgregarAdmin = () => (
  <div className="columns is-centered is-vcentered is-fullheight">
    <div className="column is-4">
      <div className="box has-text-centered">
        <p className="has-text-grey is-size-5">AGREGAR ADMINISTRADOR</p>
        <form>
          <div className="field">
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Nombre" />
              <span className="icon is-small is-left">
                <FaRegUser />
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Apellido" />
              <span className="icon is-small is-left">
                <FaRegUser />
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input className="input" type="text" placeholder="Correo" />
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <select>
                <option value="Administrador">Administrador</option>
                <option value="Coordinador">Coordinador</option>
              </select>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Contraseña"
              />
              <span className="icon is-small is-left">
                <RiLockPasswordLine />
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Confirme su contraseña"
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
