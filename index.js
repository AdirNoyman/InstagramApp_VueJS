/*
    dependecies //////////////////////////////
*/

const express = require("express");
const admin = require("firebase-admin");
let inspect = require("util").inspect;
let Busboy = require("busboy");

/*
    config - express //////////////////////////////
*/

const app = express();

/*
    config - Firebase //////////////////////////////
*/

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/*
    endpoint (route) - posts //////////////////////////////
*/

// app.get("/", (req, res) => {
//   res.send("Welcome to the Home page 🏡");
// });

app.get("/posts", async (req, res) => {
  // Allow acces to my app from any IP address (server)
  res.set("Access-Control-Allow-Origin", "*");

  let posts = [];
  const snapshot = await db
    .collection("posts")
    .orderBy("date", "desc")
    .get();
  snapshot.forEach(doc => {
    posts.push(doc.data());
  });
  res.send(posts);
});

/*
    endpoint  - Create Post  //////////////////////////////
*/

app.post("/createpost", async (req, res) => {
  // Allow acces to my app from any IP address
  res.set("Access-Control-Allow-Origin", "*");
  /* Using Busboy npm package for parsing the data that is coming in file
   that was sent to this end point via the request */
  var busboy = new Busboy({ headers: req.headers });

  let fields = {};

  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    file.on("data", function(data) {});
    file.on("end", function() {});
  });
  busboy.on("field", function(
    fieldname,
    val,
    fieldnameTruncated,
    valTruncated,
    encoding,
    mimetype
  ) {
    fields[fieldname] = val;
  });
  busboy.on("finish", function() {
    // Uploading the data from the post sent in the request to Google Cloud
    db.collection("posts")
      .doc(fields.id)
      .set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/adirsquasar.appspot.com/o/london.jpeg?alt=media&token=67c3bdfb-1bd5-4a9b-8dfa-578bba9be1cf"
      });

    // res.writeHead(303, { Connection: "close", Location: "/posts" });
    res.send("Done parsing form");
    res.end();
  });

  req.pipe(busboy);
});

/*
    listen //////////////////////////////
*/

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🤘🙂");
});
