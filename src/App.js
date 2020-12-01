import './App.scss';
import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPizzas } from './redux/actions/pizzas';
function App() {
   const dispatch = useDispatch();
   React.useEffect(() => {
      axios.get('http://localhost:3000/db.json').then(({ data }) => {
         dispatch(setPizzas(data.pizzas));
      });
   }, []);
   const [choosenPizza, setChoosenPizza] = React.useState([]);
   // const diff = function (a1, a2) {
   //    return p.sizes
   //       .filter((i) => pizza.sizes.indexOf(i) < 0)
   //       .concat(pizza.sizes.filter((i) => p.sizes.indexOf(i) < 0));
   // };
   const addPizza = (pizza) => {
      const somePizza = choosenPizza.some((p) =>
         p.id === pizza.id &&
         JSON.stringify(p.sizes) === JSON.stringify(pizza.sizes) &&
         JSON.stringify(p.types) === JSON.stringify(pizza.types)
            ? p.qty++
            : '',
      );
      if (!somePizza) {
         setChoosenPizza([...choosenPizza, pizza]);
      } else {
         setChoosenPizza([...choosenPizza]);
      }
   };
   const resetAllPizzas = () => {
      setChoosenPizza([]);
   };
   const plusPizza = (pizza) => {
      pizza.qty++;
      setChoosenPizza([...choosenPizza]);
   };
   const minusPizza = (pizza) => {
      if (pizza.qty > 1) {
         pizza.qty--;
         setChoosenPizza([...choosenPizza]);
      } else {
         setChoosenPizza(choosenPizza.filter((p) => p.id !== pizza.id));
      }
   };
   const deletePizza = (pizza) => {
      setChoosenPizza(choosenPizza.filter((p) => p.id !== pizza.id));
   };
   return (
      <div className="wrapper">
         <Router>
            <Header choosenPizza={choosenPizza} />
            <div className="content">
               <Route exact path="/">
                  <Home addPizza={addPizza} choosenPizza={choosenPizza} />
               </Route>
               <Route path="/cart">
                  <Cart
                     deletePizza={deletePizza}
                     minusPizza={minusPizza}
                     plusPizza={plusPizza}
                     resetAllPizzas={resetAllPizzas}
                     choosenPizza={choosenPizza}
                  />
               </Route>
            </div>
         </Router>
      </div>
   );
}

export default App;
