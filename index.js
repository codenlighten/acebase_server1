const { AceBaseServer } = require("acebase-server");
const dbname = "sovereignShield1";

const settings = {
  host: "chaindb.online",
  port: 443,
  https: {
    certPath: "/home/greg/greg_dev/acebase_server/ssl/fullchain.pem", // Path to the certificate file
    keyPath: "/home/greg/greg_dev/acebase_server/ssl/privkey.pem", // Path to the private key file
  },
};
const server = new AceBaseServer(dbname, settings);
server.on("ready", () => {
  console.log("SERVER ready");
});
