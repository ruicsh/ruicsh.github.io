import convict from "convict";

const config = convict({
  googleBooks: {
    api: {
      key: {
        format: String,
        doc: "Google Books API key",
        default: "",
        env: "GOOGLE_BOOKS_API_KEY",
      },
    },
  },
});

config.validate({ allowed: "strict" });

export default config;
