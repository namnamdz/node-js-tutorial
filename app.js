const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Success", app: "my appp" });
// });
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  //   console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "Fails",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

//update nhanh 1 truong nao do trong db giong put
app.patch("/api/v1/tours/:id", (req, res) => {});

app.delete("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id;
  if (id * 1 > tours.length) {
    res.status(404).json({
      status: "Fails",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "Success",
    data: {
      tours: "Updating in here ....",
    },
  });
});

app.listen(port, () => {
  console.log("app running on port:", port);
});
