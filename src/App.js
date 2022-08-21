import logo from "./logo.svg";
import "./App.css";
import { ListItem } from "./list-item";
import React, { useMemo, useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      item: "Learn JavaScript",
      completed: true,
      isVisible: true,
    },
    {
      item: "Learn React",
      completed: false,
      isVisible: true,
    },
    {
      item: "Have a life!",
      completed: false,
      isVisible: true,
    },
  ]);

  const itemsLeft = useMemo(
    () => items.filter((item) => !item.completed).length
  );

  const [appliedFilter, setAppliedFilter] = useState("all");
  const [toggledAll, setToggledAll] = useState(false);

  const toggleItem = (index) => {
    setItems(
      items.map((item, i) => {
        if (i === index) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
    setToggledAll(false);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const filterItems = (toShow) => {
    if (toShow === "all") {
      setItems(
        items.map((item) => {
          return { ...item, isVisible: true };
        })
      );
      setAppliedFilter("all");
    } else if (toShow === "active") {
      setItems(
        items.map((item) => {
          if (!item.completed) return { ...item, isVisible: true };
          else return { ...item, isVisible: false };
        })
      );
      setAppliedFilter("active");
    } else {
      setItems(
        items.map((item) => {
          if (item.completed) return { ...item, isVisible: true };
          else return { ...item, isVisible: false };
        })
      );
      setAppliedFilter("completed");
    }
  };

  const clearCompleted = () => {
    setItems(items.filter((item) => !item.completed));
  };

  const toggleAll = () => {
    if (!toggledAll) {
      setItems(
        items.map((item) => {
          return { ...item, completed: true };
        })
      );
    } else {
      setItems(
        items.map((item) => {
          return { ...item, completed: !item.completed };
        })
      );
    }
    setToggledAll(true);
  };
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setItems([
                    ...items,
                    { item: e.target.value, completed: false },
                  ]);
                  e.target.value = "";
                }
              }}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" onClick={toggleAll} />
          <label htmlFor="toggle-all" onClick={toggleAll}>
            Mark all as complete
          </label>

          <ul className="todo-list">
            {items.map((item, index) => (
              <ListItem
                key={index}
                todo={item.item}
                completed={item.completed}
                onToggle={toggleItem}
                index={index}
                onRemove={removeItem}
                isVisible={item.isVisible}
              />
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{itemsLeft} </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={appliedFilter === "all" ? "selected" : ""}
                onClick={() => filterItems("all")}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={appliedFilter === "active" ? "selected" : ""}
                onClick={() => filterItems("active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={appliedFilter === "completed" ? "selected" : ""}
                onClick={() => filterItems("completed")}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Hilal Doğaner</a>
        </p>
        <p>Part of PatikaDev</p>
      </footer>
    </>
  );
}

export default App;
