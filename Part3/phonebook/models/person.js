require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("MONGODB_URI:", url);
console.log("connecting to", url);
mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  // validation for phone number: at least 8 characters, must contain a hyphen on 3rd of 4th position

  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (v) {
        // Phone number must have exactly one hyphen after 2 or 3 digits
        // Examples: 09-1234556, 040-22334455, but not 0401-234556 or 09--1234556
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Phone number must have a hyphen after 2 or 3 digits.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
