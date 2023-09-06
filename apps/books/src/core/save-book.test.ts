import { cmsdbSchema } from "@ruicsh/cmsdb-schema";

import { cmsdb, reset } from "src/services/cmsdb/db-test";

import { saveBook } from "./save-book";

const book = {
  title: "B1",
  authors: "A1",
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
        { ...wishedBook, title: "B2", sourceUrl: "https://foo.dev/book-2" },
        cmsdb
      );
      const actual = await cmsdb("book").select(["title", "sourceUrl"]);

      const expected = [
        { title: "B1", sourceUrl: "https://foo.dev/book-1" },
        { title: "B2", sourceUrl: "https://foo.dev/book-2" },
      ];
      expect(actual).toHaveLength(2);
      expect(actual).toStrictEqual(expected);
    });

    it("updates an existing book", async () => {
      await saveBook(wishedBook, cmsdb);
      await saveBook({ ...wishedBook, title: "B2" }, cmsdb);
      const actual = await cmsdb("book").select();

      const expected = { ...book, title: "B2", id: expect.anything() };
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
        { ...enqueuedBook, title: "B2", sourceUrl: "https://foo.dev/book-2" },
        cmsdb
      );
      const actual = await cmsdb("book").select(["title", "sourceUrl"]);

      const expected = [
        { title: "B1", sourceUrl: "https://foo.dev/book-1" },
        { title: "B2", sourceUrl: "https://foo.dev/book-2" },
      ];
      expect(actual).toHaveLength(2);
      expect(actual).toStrictEqual(expected);
    });

    it("updates an existing book", async () => {
      await saveBook(enqueuedBook, cmsdb);
      await saveBook({ ...enqueuedBook, title: "B2" }, cmsdb);
      const actual = await cmsdb("book").select();

      const expected = { ...book, title: "B2", id: expect.anything() };
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
        { ...readBook, title: "B2", sourceUrl: "https://foo.dev/book-2" },
        cmsdb
      );
      const actual = await cmsdb("book").select(["title", "sourceUrl"]);

      const expected = [
        { title: "B1", sourceUrl: "https://foo.dev/book-1" },
        { title: "B2", sourceUrl: "https://foo.dev/book-2" },
      ];
      expect(actual).toHaveLength(2);
      expect(actual).toStrictEqual(expected);
    });

    it("updates an existing book", async () => {
      await saveBook(readBook, cmsdb);
      await saveBook({ ...readBook, title: "B2" }, cmsdb);
      const actual = await cmsdb("book").select();

      const expected = { ...book, title: "B2", id: expect.anything() };
      expect(actual).toHaveLength(1);
      expect(actual[0]).toMatchObject(expected);
    });
  });

  describe("genres", () => {
    const bookWithGenres = { ...book, genres: "C1;C2" };

    it("inserts new genres", async () => {
      await saveBook(bookWithGenres, cmsdb);

      const actual = await cmsdb("book")
        .join("book_genres", { "book.id": "book_genres.bookId" })
        .join("genre", { "book_genres.genreId": "genre.id" })
        .select(["book.title", "genre.slug", "genre.label"])
        .orderBy("genre.slug");

      const expected = [
        { title: "B1", slug: "c1", label: "C1" },
        { title: "B1", slug: "c2", label: "C2" },
      ];
      expect(actual).toHaveLength(2);
      expect(actual).toStrictEqual(expected);
    });

    it("uses exiting genres, creates new one", async () => {
      const book1 = { ...book, genres: "C1;C2" };
      const book2 = {
        ...book,
        title: "B2",
        sourceUrl: "https://foo.dev/book-2",
        genres: "C1;C2; C3",
      };
      await saveBook(book1, cmsdb);
      await saveBook(book2, cmsdb);

      const actual = await cmsdb("book")
        .join("book_genres", { "book.id": "book_genres.bookId" })
        .join("genre", { "book_genres.genreId": "genre.id" })
        .select(["book.title", "genre.slug", "genre.label"])
        .orderBy(["book.title", "genre.slug"]);

      const expected = [
        { title: "B1", slug: "c1", label: "C1" },
        { title: "B1", slug: "c2", label: "C2" },
        { title: "B2", slug: "c1", label: "C1" },
        { title: "B2", slug: "c2", label: "C2" },
        { title: "B2", slug: "c3", label: "C3" },
      ];
      expect(actual).toStrictEqual(expected);
    });

    it("handles no genres", async () => {
      const book1 = { ...book };
      await saveBook(book1, cmsdb);

      const actual = await cmsdb("book")
        .leftJoin("book_genres", { "book.id": "book_genres.bookId" })
        .leftJoin("genre", { "book_genres.genreId": "genre.id" })
        .select(["book.title", "genre.slug", "genre.label"])
        .orderBy("genre.slug");

      const expected = [{ title: "B1", slug: null, label: null }];
      expect(actual).toStrictEqual(expected);
    });

    it("changes genres", async () => {
      const book1 = { ...book, genres: "C1;C2;C3" };
      const book2 = { ...book, genres: "C1;C4;C5" };
      await saveBook(book1, cmsdb);
      await saveBook(book2, cmsdb);

      const actual = await cmsdb("book")
        .leftJoin("book_genres", { "book.id": "book_genres.bookId" })
        .leftJoin("genre", { "book_genres.genreId": "genre.id" })
        .select(["book.title", "genre.slug", "genre.label"])
        .orderBy("genre.slug");

      const expected = [
        { title: "B1", slug: "c1", label: "C1" },
        { title: "B1", slug: "c4", label: "C4" },
        { title: "B1", slug: "c5", label: "C5" },
      ];
      expect(actual).toStrictEqual(expected);
    });
  });
});
