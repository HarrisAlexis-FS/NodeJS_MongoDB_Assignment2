const http = require("http");
const app = require("./app/app");
require ("dotenv").config();

const server = http.createServer(app);
server.listen(process.env.port, () => {
    console.log(`server running on port ${process.env.port}`)
})