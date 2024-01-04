const { AceBaseServer } = require("acebase-server");
const dbname = "sovereignShield1";

const settings = {
  host: "chaindb.online",
  port: 443,
  https: {
    certPath: "/home/greg/greg_dev/acebase_server/ssl/privkey.pem",
    keyPath: "/home/greg/greg_dev/acebase_server/ssl/fullchain.pem",
  },
};
const server = new AceBaseServer(dbname, settings);
server.on("ready", () => {
  console.log("SERVER ready");
});
