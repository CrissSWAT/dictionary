import axios from "axios";
import { useEffect, useState } from "react";
import DropDown from "./components/DropDown";
import DarkMode from "./components/DarkMode";

export const App = () => {
  const [word, setWord] = useState("");
  const [infoData, setInfoData] = useState([]); //estado para guardar la informacion desde data de la api
  const [isLoading, setIsLoading] = useState(true); //estado para saber si esta cargando o no
  const [darkMode, setDarkMode] = useState(true); //estado del dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); //false
  };

  const handleChange = (e) => {
    //manejador de eventos
    setWord(e.target.value); //se guarda en mi setWord el cambio que obtengo del target
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDictionary(word);
  };
  const fetchDictionary = async (word) => {
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`) //interpolar mi valor
      .then(function (response) {
        // manejar respuesta exitosa
        console.log(response.data[0]);
        setInfoData(response.data[0]); //guardo la informacion solo del primeros
        setIsLoading(false);
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
  }, [darkMode]);

  return (
    <div className="max-w-3xl mx-auto ">
      <nav className="flex w-full justify-between mb-10 pt-20">
        <label className="">📖</label>
        <div className="flex gap-x-20">
          <DropDown />
          <DarkMode toggleDarkMode={toggleDarkMode} />
        </div>
      </nav>

      <h1 className="flex justify-center text-4xl mb-5 text-black dark:text-white">
        Dictionary
      </h1>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="text"
          placeholder="keyboard"
          value={word}
          onChange={handleChange}
          className="flex w-4/5 bg-slate-100 rounded-lg"
        />
        <button className="mx-5">🔍</button>
      </form>
      {isLoading ? (
        <p className="flex justify-center text-black dark:text-white">
          Esperando a que escribas...
        </p>
      ) : (
        <main className="px-10 py-5">
          <section className="flex justify-between  ">
            <div>
              <h2 className="text-6xl text-black dark:text-white">
                {infoData.word}
              </h2>
              <h3 className="text-xl text-purple-500 font-bold">
                {infoData.phonetic}
              </h3>
            </div>
            <div>
              {infoData.phonetics.slice(0, 1).map((phonetic, index) => (
                <div key={index}>
                  <audio controls className="rounded-full">
                    <source src={phonetic.audio} type="audio/mpeg" />
                  </audio>
                </div>
              ))}
            </div>
          </section>
          {infoData.meanings.slice(0, 2).map((meaning, index) => (
            <div key={index}>
              <p className="text-xl font-bold">{meaning.partOfSpeech}</p>
              <br />
              <p className="text-gray-400 text-lg font-bold">Meanings</p>
              <ul>
                {meaning.definitions.slice(0, 3).map((definition, idx) => (
                  <li key={idx}>
                    <p className="text-black dark:text-white">
                      ● {definition.definition}
                    </p>
                    {definition.example && (
                      <p className="text-black dark:text-white">
                        ● {definition.example}
                      </p>
                    )}
                  </li>
                ))}
                {meaning.synonyms.slice(0, 1).map((synonym, indx) => (
                  <li
                    key={indx}
                    className="flex gap-4 align-middle justify-start"
                  >
                    <p className="text-gray-400 text-lg font-bold">synonyms</p>
                    <p className="text-purple-500 font-bold">{synonym} </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-gray-400 text-lg font-bold">Source </p>
            <p className="font-bold text-back dark:text-white">
              {infoData.sourceUrls[0]}
            </p>
          </div>
        </main>
      )}
    </div>
  );
};
