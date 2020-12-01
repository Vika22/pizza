import React, { useState } from 'react'

const Categories = ({ sortByCategories }) => {
    const items = [
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
        'Грибные'
    ]

    const [activeItem, setActiveItem] = useState(null)
    const clickCategories = (index) => {
        setActiveItem(index)
        sortByCategories(index)
    }
    return (
        <div className="categories">
            <ul>
                <li className={activeItem === null ? "active" : ''} onClick={() => clickCategories(null)}>Все</li>
                {items.map((item, index) => <li className={activeItem === index ? "active" : ""} onClick={() => clickCategories(index)} key={index} >{item}</li>)}
            </ul>
        </div>
    )
}

export default Categories
