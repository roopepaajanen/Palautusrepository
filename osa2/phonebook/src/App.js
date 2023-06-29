import React, { useState, useEffect } from "react";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: "Welcome to frontpage!",
    className: "basic",
  });

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const resetPersonForm = () => {
    setNewNumber("");
    setNewName("");
    setFilter("");
  };

  const createNewPerson = () => {
    return {
      name: newName,
      number: newNumber,
    };
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `Deleted ${person.name}`,
            className: "error",
          });
        })
        .catch((error) => {
          console.error(error);
          setNotification({
            message: `Error deleting ${person.name}`,
            className: "error",
          });
        });
    }
  };

const handleSubmit = (event) => {
  event.preventDefault();
  if (newName === "" || newNumber === "") {
    setNotification({
      message: "Empty name or number is not accepted",
      className: "error",
    });
    return;
  }

  if (newName.length < 4) {
    setNotification({
      message: "Name must be at least 3 characters long",
      className: "error",
    });
    return;
  }

  if (/[a-zA-Z]/.test(newNumber)) {
    setNotification({
      message: "Number must only contain numbers",
      className: "error",
    });
    return;
  }

  if (newNumber.length < 8) {
    setNotification({
      message: "Number must be at least 8 characters long",
      className: "error",
    });
    return;
  }

  if (!/^\d{2,3}-\d+$/.test(newNumber)) {
    setNotification({
      message: "Invalid phone number format",
      className: "error",
    });
    return;
  }

  const personExists = persons.find((person) => person.name === newName);

  if (personExists) {
    if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedPerson = { ...personExists, number: newNumber };

      personsService
        .update(personExists.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== personExists.id ? person : response.data
            )
          );
          setNotification({
            message: `Updated ${newName}`,
            className: "change",
          });
          resetPersonForm();
        })
        .catch((error) => {
          console.error(error.response.data);
          setNotification({
            message: `Error updating ${newName}: ${error.response.data.error}`,
            className: "error",
          });
        });
    }
  } else {
    const person = createNewPerson();
    personsService
      .create(person)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNotification({
          message: `Added ${newName}`,
          className: "good",
        });
        resetPersonForm();
      })
      .catch((error) => {
        console.error(error.response.data);
        setNotification({
          message: `Error adding ${newName}: ${error.response.data.error}`,
          className: "error",
        });
      });
  }
};


  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null;
    }

    return <div className={`basic ${className}`}>{message}</div>;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notification.message}
        className={notification.className}
      />
      <div>
        Filter shown with:{" "}
        <input value={filter} onChange={(event) => setFilter(event.target.value)} />
      </div>
      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;