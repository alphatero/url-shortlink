import React, { useState, createContext, useCallback, useContext } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { QRCode } from 'react-qr-svg';
import clsx from 'clsx';
import { v4 as uuid } from "uuid";


/* Toast */
const Context = createContext(undefined);

function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const setMessage = useCallback(
    (messages) => {
      if (!messages) return;

      const id = uuid();

      setMessages((queue) => [...queue, messages]);

      setTimeout(() => {
        setMessages((queue) => queue.filter((pair) => pair.id !== id));
      }, 2000);
    },
    [setMessages]
  );
  return (
    <Context.Provider value={setMessage}>
      {children}

      {messages.map((message, index) => {
        <Toast type="success" key={index} />
      })}
    </Context.Provider>
  )
}

function useToast() {
  const context = useContext(Context);
  if(!context) throw new Error("useToast should be use within ToastProvider");

  return context;
}

function Result() {
  
  let location = useLocation();
  const history = useHistory();
  const shortURL = `${window.location.origin}/${location.state.data}`;
  const setMessage = useToast();

  let myInput = null;
  const copyToClipboard = () => {
    myInput.select();
    document.execCommand('copy');
    setMessage("click");
  };

  return (
    <div>
      {/* <ToastProvider> */}
      <main className="px-6 md:px-20 grid lg:grid-cols-2 place-content-center gap-10 md:gap-20 max-w-screen-xl mx-auto">
        <section className="text-blue-500 my-auto text-center lg:text-left space-y-8 lg:space-y-8">
          <h1 className="text-2xl lg:text-4xl font-bold">
            Best URL Shortening WebApp
          </h1>
          <p className="text-base"> Easy Link Shortening</p>
        </section>

        <section className="space-y-8 flex flex-col justify-center items-center md:mx-1">
          <div className="flex flex-row items-center">
            <input
              readOnly
              className="border border-blue-400 w-80 px-3 py-2 rounded-lg text-gray-600 bg-white"
              value={shortURL}
              ref={(ref) => (myInput = ref)}
            />

            <button
              onClick={copyToClipboard}
              className="ml-2 bg-white py-1.5 px-3 rounded-lg"
            >
              <i className="far fa-copy text-xl text-gray-700"></i>
            </button>
          </div>

          <QRCode
            className="border-2 border-blue-300 p-2 rounded-md"
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 220 }}
            value={shortURL}
          />
          <button
            onClick={() => history.push('/')}
            className="border-2 border-blue-400 text-blue-400 p-2 rounded-xl"
          >
            Shorten a new URL
          </button>
        </section>
      </main>
      {/* </ToastProvider> */}
    </div>
  );
}

export default Result;
