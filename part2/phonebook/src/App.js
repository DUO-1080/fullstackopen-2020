import React, { useState, useEffect } from "react";
import phoneService from "./services/phoneService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Message from "./components/Message";

function App() {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleFilter = (name) => {
    setFilterName(name.toLowerCase());
  };

  const handleAddPerson = (person) => {
    phoneService.personInServer(person).then((personInServer) => {
      if (personInServer) {
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with the new one?`
        ) &&
          phoneService
            .update(personInServer.id, person)
            .then((person) => {
              console.log("update new person: ", person);
              setPersons(persons.map((p) => (p.id === person.id ? person : p)));
            })
            .catch((error) => {
              console.log("update person error: ", error.response.data);
              setMessage({ success: false, info: error.response.data.error });
              setTimeout(() => {
                setMessage(null);
              }, 2000);
            });
      } else {
        phoneService
          .addPerson(person)
          .then((person) => {
            setPersons(persons.concat(person));
            setMessage({ success: true, info: `Add ${person.name}` });
            setTimeout(() => {
              setMessage(null);
            }, 2000);
          })
          .catch((error) => {
            console.log("add new person error: ", error.response.data);
            setMessage({ success: false, info: error.response.data.error });
            setTimeout(() => {
              setMessage(null);
            }, 2000);
          });
      }
    });
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    window.confirm(`Delete ${person.name}`) &&
      phoneService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((err) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({
            success: false,
            info: `Information of ${person.name} has already been removed from server.`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 1000);
          console.log("cannot able to delete " + person.name, err);
        });
  };

  const filteredPerson = filterName
    ? persons.filter((person) => person.name.toLowerCase().includes(filterName))
    : persons;

  return (
    <div>
      <h2>PhoneBook</h2>
      {message && <Message message={message} />}
      <Filter onFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onAddPerson={handleAddPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPerson} onDeletePerson={handleDeletePerson} />
    </div>
  );
}

export default App;
