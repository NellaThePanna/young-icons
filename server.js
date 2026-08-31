process.env.NODE_ENV = process.env.NODE_ENV || "production";

const { createServer } = require("http");
const next = require("next");

const port = Number.parseInt(process.env.PORT || "3333", 10);
const hostname = process.env.HOST || "0.0.0.0";
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, hostname, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
