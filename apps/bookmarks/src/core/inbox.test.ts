import { getBookmarksFromInbox } from "./inbox";

describe("getBookmarksFromInbox", () => {
  it("downloads and parses from the remote inbox file", async () => {
    const actual = await getBookmarksFromInbox();

    const expected = {
      savedOnDate: "2023-11-27",
      url: "https://www.hilobrow.com/new-wave-sci-fi/",
    };
    expect(actual).toHaveLength(2);
    expect(actual[0]).toStrictEqual(expected);
  });
});
