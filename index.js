require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { AceBaseServer } = require("acebase-server");
const bsv = require("bsv");
const https = require("https");
const fs = require("fs");
const cors = require("cors");

// Load private key from environment variable
const wif = process.env.WIF;
const privateKey = bsv.PrivateKey.fromWIF(wif);
const publicKey = privateKey.publicKey;
const port = process.env.PORT || 3000;
const serverId = "0498bb84-df4b-4cf8-a905-683776649c3d";

// Function to hash data using SHA256
const hashData = (data) => {
  try {
    const hash = bsv.crypto.Hash.sha256(Buffer.from(data));
    return hash.toString("hex");
  } catch (error) {
    console.error("Error hashing data:", error);
    return null;
  }
};

const serverHash = () => hashData(serverId);
console.log(serverHash());

// Function to sign data with a private key
const signData = (data) => {
  try {
    const hash = bsv.crypto.Hash.sha256(Buffer.from(data));
    const signature = bsv.crypto.ECDSA.sign(hash, privateKey);
    return signature.toString();
  } catch (error) {
    console.error("Error signing data:", error);
    return null;
  }
};

// Function to verify a signature with a public key
const verifySignature = (data, signature) => {
  try {
    const hash = bsv.crypto.Hash.sha256(Buffer.from(data));
    return bsv.crypto.ECDSA.verify(
      hash,
      bsv.crypto.Signature.fromString(signature),
      publicKey
    );
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
};

// AceBase server configuration
const server = new AceBaseServer("sovereignShield1", {
  port: port,
  // Additional configurations here
});

// Apply CORS middleware
server.app.use(cors());

// HTTPS configuration
const httpsOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// Start HTTPS server with AceBase
https.createServer(httpsOptions, server.app).listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});

server.ready(() => {
  console.log("AceBase Server is running");
});
