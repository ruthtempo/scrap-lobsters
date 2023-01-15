const puppeteer = require("puppeteer");

const getUpvotes = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://lobste.rs/");

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text())); // to log in terminal my console logs inside evaluate
  const topic = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".story_liner"), (story) => {
      //   console.log("my title", story.querySelector(".details span a").innerText);

      //   const categories = Array.from(
      //     story.querySelectorAll(".tags a"),
      //     (link) => link.title
      //   );
      //   console.log("my cats array", categories);

      return {
        title: story.querySelector(".details span a").innerText,
        categories: Array.from(story.querySelectorAll(".tags a"), (link) => {
          if (link.title === "Use when every tag or no specific tag applies") {
            return "Programming";
          } else {
            return link.title;
          }
        }),
        upvotes: story.querySelector(".score").innerText,
      };
    });
  });
  console.log(topic);

  await browser.close();
};

getUpvotes();
