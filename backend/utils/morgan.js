import morgan from "morgan";
import chalk from "chalk";

morgan.token("status", function (_req, res) {
  const status = res.statusCode;
  const color =
    status >= 500
      ? "red"
      : status >= 400
      ? "yellow"
      : status >= 300
      ? "cyan"
      : "green";
  return chalk[color](status);
});

morgan.token("method", function (req) {
  return chalk.blue(req.method);
});

morgan.token("host", function (req) {
  return req.headers.host;
});

morgan.token("remote-addr", function (req) {
  return req.socket.remoteAddress;
});

morgan.token("user-agent", function (req) {
  return req.headers["user-agent"];
});

const customFormat =
  ":remote-addr - :host - :method :url :status :res[content-length] - :response-time ms - :user-agent";

export const morganLogger = morgan(customFormat);