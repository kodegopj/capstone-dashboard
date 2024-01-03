import app from "./app.js";
import config from "./utils/config.js";

const PORT = config.PORT || 3001;

app.get("/", (_, res) => res.send("<h1>DASHBOARD</h1>"));
// app.get("/notes", (_, res) => res.send("note"))
app.get("/products", (_, res) => res.send("<h1>Product Page</h1>"));

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});