import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import {getIngredientsApi} from '../../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/actions/ingredients-slice';
import {getIngredientsStatus} from "../../utils/tools";

function App() {
  const dispatch = useDispatch();
  const status = useSelector(getIngredientsStatus);

  // console.log(useSelector(state => state));

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredientsApi()
        .then((data) => setIngredients(data.data))
        .catch((err) => console.error(err));
  }, []);

  if (status === 'load') return (<div>Data load...</div>);
  if (status === 'error') return (<div>Connection error...</div>);

  return (
      <>
        <AppHeader/>
        <Main/>
      </>
  );
}

export default App;
