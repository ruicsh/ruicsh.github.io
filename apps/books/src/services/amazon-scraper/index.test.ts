import AmazonScraper from ".";

describe("amazon scraper", () => {
  it("scrape amazon book page", async () => {
    const amazonScraper = new AmazonScraper();
    const actual = await amazonScraper.fetchBookPage({
      url: "https://www.amazon.co.uk/Man-Moon-Voyages-Apollo-Astronauts/dp/0241363152/ref=sr_1_1?crid=RMDR1GVY22MU&keywords=a+man+on+the+moon+andrew+chaikin&qid=1691766521&sprefix=A+Man+on+the+Moon%2Caps%2C129&sr=8-1#detailBullets_feature_div",
    });

    const expected = {
      cover: "https://m.media-amazon.com/images/I/81T6T0jBU9L.jpg",
      isbn10: "0241363152",
      isbn13: "9780241363157",
      dimensions: "12.9 x 2.9 x 19.8 cm",
      publisher: "Penguin",
      publishedDate: "2019-06-13",
    };
    expect(actual).toStrictEqual(expected);
  });
});
