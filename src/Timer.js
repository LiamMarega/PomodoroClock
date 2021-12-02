import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import "./Timer.css";

const Timer = () => {
  const [minutos, setMinutos] = useState(1500);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState("Pomodoro");
  const myRef = useRef(null);

  var sonido = new Audio();
  sonido.src = "sonido.mp3";

  /* ///////////////////FUNCIONES/////////////////// */

  function toggle() {
    setActivo(!activo);
  }

  function reset() {
    setMinutos(1500);
    setActivo(false);
    setTipo("Pomodoro");
  }

  function timeBreak() {
    setMinutos(300);
    setTipo("Break");
  }

  function cambioTipo() {
    if (tipo === "Agregar Tiempo") {
      setTipo("Pomodoro");
    } else if (tipo === "Pomodoro") {
      setTipo("Agregar Tiempo");
    } else setTipo("Pomodoro");
  }

  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value;
    setMinutos(ref * 60);
  }

  function sound() {
    return sonido.play();
  }

  /* ///////////////////useEffect Comprobaciones/////////////////// */

  useEffect(() => {
    {
      /* NOTE: setInterval: nos permite ejecutar una determinada función o bloque de código cada
       cierto intervalo de tiempo definido en milisegundos. Esto se va a ejecutar hasta
        el momento 
       en que se llamé al método clearInterval */
    }

    let intervalo = null;
    if ((activo && tipo === "Pomodoro") || tipo === "Break") {
      document.title = "Work";
      intervalo = setInterval(() => {
        setMinutos(() => minutos - 1);
      }, 1000);
    }
    if (activo && tipo === "Agregar Tiempo") {
      document.title = "Work";
      if (minutos >= 0) {
        intervalo = setInterval(() => {
          setMinutos((minutos) => minutos - 1);
        }, 1000);
      } else {
        return () => {
          alert("El numero ingresado no es valido");
          clearInterval(intervalo);
          reset();
        };
      }
    }
    if (!activo && minutos === 0 && tipo == "Pomodoro") {
      clearInterval(intervalo);
    }
    if ((minutos === 0 && tipo == "Pomodoro") || tipo == "Agregar Tiempo") {
      sound();
      timeBreak();
      document.title = "Break";
      clearInterval(intervalo);
    }
    if (minutos === 0 && tipo == "Break") {
      sound();
      reset();
      document.title = "Work!";
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, minutos, tipo]);

  /* ///////////////////RENDERIZADO/////////////////// */

  if (tipo == "Pomodoro" || tipo == "Agregar Tiempo") {
    return (
      <div className="app">
        <div className="container">
          <img
            src="https://services.garmin.com/appsLibraryBusinessServices_v0/rest/apps/4b11ad8f-3e48-4112-83df-336065c49829/icon/d31ca7be-0497-4370-801f-97a29dc3b584"
            width="100"
            height="100"
            alt="pomodoro"
          />
          <div className="time">
            {Math.trunc(minutos / 60)}:{minutos % 60}
          </div>
          <div className="row">
            <button
              className={`button button-primary button-primary-${
                activo ? "active" : "inactive"
              }`}
              onClick={toggle}
            >
              {activo ? "Pause" : "Start"}
            </button>
            <button className="button button-secondary" onClick={reset}>
              Reset
            </button>
          </div>
          <button className="button button-cambio" onClick={cambioTipo}>
            {tipo}
          </button>
          {tipo === "Agregar Tiempo" && (
            <input
              className="input"
              type="number"
              placeholder="Ingresa los minutos"
              autoComplete="off"
              ref={myRef}
              onChange={agregaSegundos}
            />
          )}
        </div>
        <div className="imgContainer">
          <a target="_blank" href="https://www.linkedin.com/in/liam-marega/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="html5"
              width="40"
              height="40"
            />
          </a>
          <a target="_blank" href="https://github.com/LiamMarega">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="html5"
              width="40"
              height="40"
            />
          </a>
          <a href="mailto:liammarega85@gmail.com">
            <img
              src="http://cdn.onlinewebfonts.com/svg/img_237869.png"
              alt="html5"
              width="40"
              height="40"
            />
          </a>
        </div>
      </div>
    );
  } else
    return (
      <div className="appGreen">
        <div className="containerGreen">
          <img
            src="https://services.garmin.com/appsLibraryBusinessServices_v0/rest/apps/4b11ad8f-3e48-4112-83df-336065c49829/icon/d31ca7be-0497-4370-801f-97a29dc3b584"
            width="100"
            height="100"
            alt="pomodoro"
          />
          <div className="time">
            {Math.trunc(minutos / 60)}:{minutos % 60}
          </div>
          <div className="row">
            <button
              className={`button button-primary button-primary-${
                activo ? "active" : "inactive"
              }`}
              onClick={toggle}
            >
              {activo ? "Pausa" : "Inicio"}
            </button>
            <button className="button button-secondary" onClick={reset}>
              Reset
            </button>
          </div>
          <button className="button button-cambio" onClick={cambioTipo}>
            {tipo}
          </button>
          {tipo === "Agregar Tiempo" && (
            <input
              className="input"
              type="number"
              placeholder="Ingresa los minutos"
              autoComplete="off"
              ref={myRef}
              onChange={agregaSegundos}
            />
          )}
        </div>
        <div className="imgContainer">
          <a target="_blank" href="https://www.linkedin.com/in/liam-marega/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="html5"
              width="40"
              height="40"
            />
          </a>
          <a target="_blank" href="https://github.com/LiamMarega">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="html5"
              width="40"
              height="40"
            />
          </a>
          <a target="_blank" href="mailto:liammarega85@gmail.com">
            <img
              src="http://cdn.onlinewebfonts.com/svg/img_237869.png"
              alt="html5"
              width="40"
              height="40"
            />
          NASHEEEEEEEEE
          </a>
        </div>
      </div>
    );
};

export default Timer;
