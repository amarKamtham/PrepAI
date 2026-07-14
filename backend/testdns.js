const dns = require("node:dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.q8qqrpg.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);