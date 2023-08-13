import { cmsdbSchema } from "@ruicsh/cmsdb-schema";

import { cmsdb, reset } from "src/services/cmsdb/db-test";

import { saveBook } from "./save-book";

const book = {
  title: "b1",
  authors: "a1",
  sourceUrl: "https://foo.dev/book-1",
} as IBookToSave;

describe("save book", () => {
  beforeEach(async () => {
    await cmsdbSchema.initialize(cmsdb);
  });

  afterEach(async () => {
    await reset(cmsdb);
  });

  afterAll(async () => {
    await cmsdb.destroy();
  });

  describe("wishlist", () => {
    const wishedBook = { ...book, wishedOnDate: "2023-08-09" };

    it("inserts a new book", async () => {
      await saveBook(wishedBook, cmsdb);
      const actual = await cmsdb("book").select([
        "authors",
        "title",
        "wishedOnDate",
        "sourceUrl",
      ]);

      expect(actual).toHaveLength(1);
      expect(actual[0]).toStrictEqual(wishedBook);
    });

    it("inserts a second book", async () => {
      await saveBook(wishedBook, cmsdb);
      await saveBook(
        { ...wishedBook, title: "b2", sourceUrl: "https://foo.dev/book-2" },
        cmsdb
      );
      const actual = await cmsdb("book").select(["title", "sourceUrl"]);

      const expected = [
        { title: "b1", sourceUrl: "https://foo.dev/book-1" },
        { title: "b2", sourceUrl: "https://foo.dev/book-2" },
      ];
      expect(actual).toHaveLength(2);
      expect(actual).toStrictEqual(expected);
    });

    it("updates an existing book", async () => {
      await saveBook(wishedBook, cmsdb);
      await saveBook({ ...wishedBook, title: "b2" }, cmsdb);
      const actual = await cmsdb("book").select();

      const expected = { ...book, title: "b2", id: expect.anything() };
      expect(actual).toHaveLength(1);
      expect(actual[0]).toMatchObject(expected);
    });

    it("enqueue a wished book", async () => {
      await saveBook(wishedBook, cmsdb);
      const enqueuedBook = { ...wishedBook, queuedOnDate: "2023-08-10" };
      await saveBook(enqueuedBook, cmsdb);
      const actual = await cmsdb("book").select([
        "authors",
        "title",
        "sourceUrl",
        "queuedOnDate",
        "wishedOnDate",
      ]);

      expect(actual).toHaveLength(1);
      expect(actual[0]).toStrictEqual(enqueuedBook);
    });

    it("reads a wished book", async () => {
      await saveBook(wishedBook, cmsdb);
      const readBook = { ...wishedBook, readOnDate: "2023-08-10" };
      await saveBook(readBook, cmsdb);
      const actual = await cmsdb("book").select([
        "authors",
        "title",
        "sourceUrl",
        "readOnDate",
        "wishedOnDate",
      ]);

      expect(actual).toHaveLength(1);
      expect(actual[0]).toStrictEqual(readBook);
    });
  });

  describe("queue", () => {
    const enqueuedBook = { ...book, queuedOnDate: "2023-08-09" };

    it("inserts a new book", async () => {
      await saveBook(enqueuedBook, cmsdb);
      const actual = await cmsdb("book").select([
        "authors",
        "title",
        "queuedOnDate",
        "sourceUrl",
      ]);

      expect(actual).toHaveLength(1);
      expect(actual[0]).toStrictEqual(enqueuedBook);
    });

    it("inserts a second book", async () => {
      await saveBook(enqueuedBook, cmsdb);
      await saveBook(
        { ...enqueuedBook, title: "b2", sourceUrl: "https://foo.dev/book-2" },
        cmsdb
      );
      const actual = await cmsdb("book").select(["title", "sourceUrl"]);

      const expected = [
        { title: "b1", sourceUrl: "https://foo.dev/book-1" },
        { title: "b2", sourceUrl: "https://foo.dev/book-2" },
      ];
      expect(actual).toHaveLength(2);
      expect(actual).toStrictEqual(expected);
    });

    it("updates an existing book", async () => {
      await saveBook(enqueuedBook, cmsdb);
      await saveBook({ ...enqueuedBook, title: "b2" }, cmsdb);
      const actual = await cmsdb("book").select();

      const expected = { ...book, title: "b2", id: expect.anything() };
      expect(actual).toHaveLength(1);
      expect(actual[0]).toMatchObject(expected);
    });

    it("reads an enqueued book", async () => {
      await saveBook(enqueuedBook, cmsdb);
      const readBook = { ...enqueuedBook, readOnDate: "2023-08-10", rating: 4 };
      await saveBook(readBook, cmsdb);
      const actual = await cmsdb("book").select([
        "authors",
        "title",
        "sourceUrl",
        "queuedOnDate",
        "readOnDate",
        "rating",
      ]);

      expect(actual).toHaveLength(1);
      expect(actual[0]).toStrictEqual(readBook);
    });
  });

  describe("read", () => {
    const readBook = { ...book, readOnDate: "2023-08-09" };

    it("inserts a new book", async () => {
      await saveBook(readBook, cmsdb);
      const actual = await cmsdb("book").select([
        "authors",
        "title",
        "readOnDate",
        "sourceUrl",
      ]);

      expect(actual).toHaveLength(1);
      expect(actual[0]).toStrictEqual(readBook);
    });

    it("inserts a second book", async () => {
      await saveBook(readBook, cmsdb);
      await saveBook(
        { ...readBook, title: "b2", sourceUrl: "https://foo.dev/book-2" },
        cmsdb
      );
      const actual = await cmsdb("book").select(["title", "sourceUrl"]);

      const expected = [
        { title: "b1", sourceUrl: "https://foo.dev/book-1" },
        { title: "b2", sourceUrl: "https://foo.dev/book-2" },
      ];
      expect(actual).toHaveLength(2);
      expect(actual).toStrictEqual(expected);
    });

    it("updates an existing book", async () => {
      await saveBook(readBook, cmsdb);
      await saveBook({ ...readBook, title: "b2" }, cmsdb);
      const actual = await cmsdb("book").select();

      const expected = { ...book, title: "b2", id: expect.anything() };
      expect(actual).toHaveLength(1);
      expect(actual[0]).toMatchObject(expected);
    });
  });
});
