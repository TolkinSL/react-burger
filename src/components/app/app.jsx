import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import {getIngredients} from '../../utils/api';
import {UserContext} from "../../services/context";

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredients()
        .then((data) => setIngredients(data.data))
        .catch((err) => console.error(err));
  }, []);

  return (
      <>
        <AppHeader/>
        <UserContext.Provider value={ingredients}>
          <Main/>
        </UserContext.Provider>
      </>
  );
}

export default App;
