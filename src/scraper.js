const puppeteer = require("puppeteer");
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://bnwjefziktrpjkkaxeuh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud2plZnppa3RycGpra2F4ZXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3ODg4NTMsImV4cCI6MTk4OTM2NDg1M30.yAsb7nRdWPS0MQQV4y4QTFysLLVVbH7XR1AVXkW3dDM";
const supabase = createClient(supabaseUrl, supabaseKey);

//for each category we check if they exist in every topic object and if so we sum upvotes that we later return as an object
const getCategoryWithvotes = (categories, topics) => {
  const final = [];
  for (cat of categories) {
    let upvotes = 0;
    topics.forEach((topic) => {
      if (topic.categories.includes(cat)) {
        console.log(typeof topic.upvotes);
        upvotes += parseInt(topic.upvotes);
      }
    });
    final.push({
      category: cat,
      upvotes,
    });
  }
  return final;
};

//scraper function

const getUpvotes = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://lobste.rs/");

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text())); // to log in terminal my console logs inside evaluate

  const topics = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".story_liner"), (story) => {
      //  example debug console.log("my title", story.querySelector(".details span a").innerText);

      return {
        title: story.querySelector(".details span a").innerText,
        categories: Array.from(
          story.querySelectorAll(".tags a"),
          (link) => link.innerText
        ),
        upvotes: story.querySelector(".score").innerText,
      };
    });
  });

  const categories = [];
  //we create an array with all the categories existing in the web scraping
  topics.forEach((topic) => {
    topic.categories.forEach((cat) => {
      if (!categories.includes(cat)) {
        categories.push(cat);
      }
    });
  });

  const arrangedCategories = getCategoryWithvotes(categories, topics); //calling functiono defined above

  console.log(arrangedCategories); // no result at all...

  //here we restart the database in supabase so that we dont have double
  const { error } = await supabase
    .from("scraped data")
    .delete()
    .neq("category", null);
  console.log(error);
  //for each object I want to create a row in supabase
  await supabase.from("scraped data").insert(arrangedCategories); // this is already an array with keys that match supabase

  await browser.close();
};

getUpvotes();
