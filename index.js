import app from "./app.js";

const PORT = process.env.PORT || 3001;

app.get("/", (_, res) => res.send("<h1>DASHBOARD</h1>"));
// app.get("/notes", (_, res) => res.send("note"))

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});
