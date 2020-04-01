const express = require("express");
const app = express();
app.use(express.json());
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

app.post("/api/persons", (request, response) => {
  console.log(request.body.name);
  if (!request.body) {
    return response.status(400).json({
      error: "content missing"
    });
  } else if (
    request.body.name == null ||
    request.body.name == "" ||
    request.body.number == null ||
    request.body.number == ""
  ) {
    return response.status(400).json({
      error: "missing name or number"
    });
  } else if (persons.map(p => p.name).includes(request.body.name)) {
    return response.status(400).json({
      error: "person already there"
    });
  }
  console.log("body", request.body);
  console.log("header", request.headers);
  const newId = Math.floor(Math.random() * 1000);
  const person = request.body;
  console.log("person type", typeof person);
  //person.concat({ id: newId });
  const newPerson = Object.assign({}, person, { id: newId });
  console.log(newPerson);
  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
