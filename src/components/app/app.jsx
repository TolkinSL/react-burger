import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import Main from "../main/main";

const UrlData = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      return await fetch(UrlData)
          .then((res) => {
            if(res.ok) {
              return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`);
          })
          .then((data) => setIngredients(data.data))
          .catch((err) => console.error(err));
    }

    getData();
  }, []);

  return (
    <>
      <AppHeader />
      <Main ingredients={ingredients} />
    </>
  );
}

export default App;
