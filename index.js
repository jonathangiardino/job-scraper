const Sheet = require("./sheet");

(async function () {
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(
    [
      { title: "Frontend Developer", location: "Amsterdam" },
      { title: "Backend Developer", email: "Alkmaar" },
    ],
    0
  );
})();
