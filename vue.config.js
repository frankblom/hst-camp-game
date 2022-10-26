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
      filename: "admin-34bb0ad5-0817-4a41-b9a6-c7e86d73bddf.html",
      title: "GameShow admin",
      chunks: ["chunk-vendors", "chunk-common", "admin"],
    },
    screen: {
      entry: "src/app/screen/screen.js",
      template: "public/index.html",
      filename: "screen-5ed9aa65-bf94-48b6-bd8c-568fb9153ff9.html",
      title: "GameShow screen",
      chunks: ["chunk-vendors", "chunk-common", "screen"],
    },
    side: {
      entry: "src/app/side/side.js",
      template: "public/index.html",
      filename: "side-5ed9aa65-bf94-48b6-bd8c-568fb9153ff9.html",
      title: "GameShow side screen",
      chunks: ["chunk-vendors", "chunk-common", "side"],
    },
  },
};
