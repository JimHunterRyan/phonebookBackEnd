const express = require("express");
const app = express();

let persons = [
  {
    name: "jim",
    number: "083 - 1234567",
    id: 1
  },
  {
    name: "john",
    number: "084 - 1234567",
    id: 2
  },
  {
    name: "jenny",
    number: "085 - 1234567",
    id: 3
  },
  {
    name: "jill",
    number: "086 - 1234567",
    id: 4
  },
  {
    name: "james",
    number: "087 - 1234567",
    id: 5
  }
];
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${persons.length} persons <br>
  ${new Date()}`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  console.log(id);
  const person = persons.find(p => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
