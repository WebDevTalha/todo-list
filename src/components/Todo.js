import React, { useEffect, useState } from "react"
import "../App.css"
import logo from "../debugging-diaries.png"

// To get the data from local storage
const getLocalItmes = () => {
    const list = localStorage.getItem("list")

    if (list) {
        return JSON.parse(localStorage.getItem("list"))
    } else {
        return []
    }
}

const Todo = () => {
    const [inputDate, setInputDeta] = useState("")
    const [items, setItems] = useState(getLocalItmes())

    // Add Items
    const addItem = (e) => {
        e.preventDefault()
        if (!inputDate) {
        } else {
            setItems([...items, inputDate])
            setInputDeta("")
        }
    }

    // Delete Sinlge Items
    const deleteItem = (id) => {
        // console.log(id)
        const updatedItems = items.filter((elem, ind) => {
            return ind !== id
        })
        setItems(updatedItems)
    }

    // remove all
    const removeAll = () => {
        setItems([])
    }

    // add data to localStorage
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="todo-app">
                <div className="logo">
                    <figure>
                        <img src={logo} alt="Logo" />
                        <figcaption>Add Your List Here!👇</figcaption>
                    </figure>
                </div>
                <form className="input-section">
                    <input
                        id="todoInput"
                        autoComplete="off"
                        type="text"
                        placeholder="Add item..."
                        value={inputDate}
                        onChange={(e) => setInputDeta(e.target.value)}
                    />
                    <button
                        id="addBtn"
                        type="submit"
                        className="add"
                        onClick={addItem}
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </form>
                <div className="todos">
                    {items.length > 0 ? (
                        <ul className="todo-list">
                            {items.map((elem, ind) => {
                                return (
                                    <li className="li" key={ind}>
                                        <span className="todo-text">
                                            {elem}
                                        </span>
                                        <span className="span-button">
                                            <span
                                                className="material-symbols-outlined"
                                                onClick={() => deleteItem(ind)}
                                            >
                                                delete
                                            </span>
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <h1 className="none-text">Empty List</h1>
                    )}
                </div>
                <div className="showItems">
                    <button
                        className="remove-all-btn"
                        data-sm-link-text="Remove All"
                        onClick={removeAll}
                    >
                        <span>Remove All</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Todo
