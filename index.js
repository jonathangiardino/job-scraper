const Sheet = require("./sheet");
const fetch = require("node-fetch");

async function scrapePage(index) {
  const res = await fetch(
    `https://jobs.github.com/positions.json?&page=${index}`
  );
  const json = await res.json();

  const rows = json.map(
    ({ title, url, location, created_at, company, company_url }) => {
      return {
        company,
        company_url,
        created_at,
        location,
        title,
        url,
      };
    }
  );

  const jobs = rows.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  //   const filteredJobs = jobs.filter((job) =>
  //     job.title.toLowerCase().includes("javascript")
  //   );

  return jobs;
}

(async function () {
  let index = 1;
  let rows = [];

  while (true) {
    const newRows = await scrapePage(index);
    if (newRows.length === 0) break;
    rows = [...rows, ...newRows];
    console.log("NEW ROWS LENGTH >>>>>>>", newRows.length);
    index++;
  }

  //   console.log(rows);

  const sheet = new Sheet();
  await sheet.load();
  await sheet.add(rows);
})();
