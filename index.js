require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { AceBaseServer } = require("acebase-server");
const bsv = require("bsv");

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

const server = new AceBaseServer("sovereignShield1", {
  port: port,
  allowUnauthenticated: true,
});

server.ready(() => {
  console.log("Server is running");
  // Additional initialization logic here
});
