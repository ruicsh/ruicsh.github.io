import { reducer, initialState } from "./reducer";
import { type IAction } from "./books.d";

describe("books reducer", () => {
  describe("genres", () => {
    it("adds new genre", () => {
      const state = { ...initialState, genres: [] };
      const action: IAction = {
        type: "TOGGLE_GENRE",
        payload: { genre: "foo" },
      };
      const actual = reducer(state, action);

      const expected = { ...initialState, genres: ["foo"], page: 1 };
      expect(actual).toStrictEqual(expected);
    });

    it("adds second genre", () => {
      const state = { ...initialState, genres: ["foo"] };
      const action: IAction = {
        type: "TOGGLE_GENRE",
        payload: { genre: "bar" },
      };
      const actual = reducer(state, action);

      const expected = { ...initialState, genres: ["foo", "bar"], page: 1 };
      expect(actual).toStrictEqual(expected);
    });

    it("removes second genre", () => {
      const state = { ...initialState, genres: ["foo", "bar"] };
      const action: IAction = {
        type: "TOGGLE_GENRE",
        payload: { genre: "bar" },
      };
      const actual = reducer(state, action);

      const expected = { ...initialState, genres: ["foo"], page: 1 };
      expect(actual).toStrictEqual(expected);
    });

    it("removes genre", () => {
      const state = { ...initialState, genres: ["foo"] };
      const action: IAction = {
        type: "TOGGLE_GENRE",
        payload: { genre: "foo" },
      };
      const actual = reducer(state, action);

      const expected = { ...initialState, genres: [], page: 1 };
      expect(actual).toStrictEqual(expected);
    });
  });
});
