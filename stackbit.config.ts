import { defineStackbitConfig } from "@stackbit/types";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  nodeVersion: "18",

  contentSources: [
    {
      name: "gitcms",
      type: "git",
      models: [
        {
          name: "page",
          type: "page",
          filePathPattern: "index.html",
          urlPath: "/",
        },
      ],
    } as any,
  ],
});
