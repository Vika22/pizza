import React, { useState } from 'react'
const PizzaBlock = ({ pizza, addPizza, choosenPizza }) => {

    const onSelectPizza = (pizza) => {
        addPizza({
            ...pizza,
            types: [availableTypes.map((type, index) => (activeType === index ? type : ''))],
            sizes: [availableSizes.map((size, index) => (activeSize === index ? size : ''))],
            qty: 1, price: activePrice,
            id: pizza.id + [availableTypes.map((type, index) => (activeType === index ? type : ''))] + [availableSizes.map((size, index) => (activeSize === index ? size : ''))]
        });
    }
    const [activePrice, setActivePrice] = useState(pizza.price)


    const availableTypes = ['тонкое', 'традиционное'];
    const [activeType, setActiveType] = React.useState(pizza.types[0]);
    const onSelectType = (index) => {
        setActiveType(index);
    };

    const availableSizes = [26, 30, 40];
    const firstIndexSize = availableSizes.findIndex((s) => s === pizza.sizes[0])
    const [activeSize, setActiveSize] = React.useState(firstIndexSize);
    const onSelectSize = (index) => {
        setActiveSize(index);
        setActivePrice(pizza.price + index * 100)
    };

    return (
        <div className="pizza-block" >
            <div>Rating: {pizza.rating}</div>
            <img
                className="pizza-block__image"
                src={pizza.imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{pizza.name}</h4>
            <div className="pizza-block__selector">
                <ul >
                    {availableTypes.map((type, index) => (
                        <li
                            key={type}
                            onClick={() => onSelectType(index)}
                            className={activeType === index ? 'active' :
                                !pizza.types.includes(index) ? 'disabled' : ''
                            }>
                            {type}
                        </li>
                    ))}
                </ul>
                <ul>
                    {availableSizes.map((size, index) => (
                        <li
                            key={size}
                            onClick={() => onSelectSize(index)}
                            className={activeSize === index ? 'active' :
                                !pizza.sizes.includes(size) ? 'disabled' : ''
                            }>
                            {`${size} см.`}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {activePrice} ₽</div>
                <div className="button button--outline button--add" onClick={() => onSelectPizza(pizza)}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {
                        choosenPizza.map(p => p.name === pizza.name ? <i >{choosenPizza.reduce(function (sum, current) {
                            return sum + current.qty;
                        }, 0)}</i> : pizza.qty)
                    }
                </div>
            </div>
        </div>

    )
}

export default PizzaBlock
