const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  provider: "opencage",
  apiKey: process.env.OPENCAGE_API_KEY,
};

const geocoder = NodeGeocoder(options);

const geocodeAddress = async (postalCode) => {
  return geocoder.geocode(postalCode);
};

module.exports = { geocodeAddress };
