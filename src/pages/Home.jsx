import React, { memo } from 'react'
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort'
import { useSelector } from 'react-redux'
// import { sort } from 'semver';
const Home = ({ addPizza, choosenPizza }) => {
    const { items } = useSelector(({ pizzaReducer }) => {
        return {
            items: pizzaReducer.items,
        };
    });
    const [sortBy, setSortBy] = React.useState('популярности');
    const sortBySort = (sort) => {
        setSortBy(sort)
    }
    function compareByRating(a, b) {
        if (a.rating < b.rating) {
            return 1;
        }
        if (a.rating > b.rating) {
            return -1;
        }
        return 0;
    }
    function compareByPrice(a, b) {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }
    function compareByName(a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    }

    const [category, setCategory] = React.useState(null);
    const sortByCategories = (cat) => setCategory(cat);

    const search = () => {
        const sort = sortBy === 'популярности' ? items.sort(compareByRating) :
            sortBy === 'цене' ? items.sort(compareByPrice) :
                sortBy === 'алфавиту' ? items.sort(compareByName) : items
        return (category == null ? sort : sort.filter(item =>
            [item.category].includes(category)
        )).map(pizza => <PizzaBlock choosenPizza={choosenPizza} addPizza={addPizza} pizza={pizza} key={pizza.id} {...pizza} />)
    }

    return (
        <div className="container" >
            <div className="content__top">
                <Categories sortByCategories={sortByCategories} />
                <Sort sortBySort={sortBySort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {search()}
            </div>
        </div>
    )
}

export default memo(Home)
