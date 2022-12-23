module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  pages: {
    mobile: {
      entry: "src/app/mobile/mobile.js",
      template: "public/index.html",
      filename: "index.html",
      title: "GameShow",
      chunks: ["chunk-vendors", "chunk-common", "mobile"],
    },
    admin: {
      entry: "src/app/admin/admin.js",
      template: "public/index.html",
      filename: "admin-e0181fa2-0f44-4efc-884b-5118a6a1fe72.html",
      title: "GameShow admin",
      chunks: ["chunk-vendors", "chunk-common", "admin"],
    },
    screen: {
      entry: "src/app/screen/screen.js",
      template: "public/index.html",
      filename: "screen-ad63872c-c03e-4fad-9e2b-8a47bd859bbe.html",
      title: "GameShow screen",
      chunks: ["chunk-vendors", "chunk-common", "screen"],
    },
    side: {
      entry: "src/app/side/side.js",
      template: "public/index.html",
      filename: "side-d151394f-a03c-4960-bbcd-3e90b27ee9b9.html",
      title: "GameShow side screen",
      chunks: ["chunk-vendors", "chunk-common", "side"],
    },
  },
};
