require("dotenv").config();
const cluster = require("cluster");
const os = require("os");
const { dirname } = require("path");
const { fileURLToPath } = require("url");

const cpuCount = process.env.CLUSTER_PROCESS ?? 2;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
  exec: __dirname + "/hls-proxy/bin/hlsd.js",
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}
cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  cluster.fork();
});