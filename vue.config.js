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
      filename: "admin.html",
      title: "GameShow admin",
      chunks: ["chunk-vendors", "chunk-common", "admin"],
    },
    screen: {
      entry: "src/app/screen/screen.js",
      template: "public/index.html",
      filename: "screen.html",
      title: "GameShow screen",
      chunks: ["chunk-vendors", "chunk-common", "screen"],
    },
    side: {
      entry: "src/app/side/side.js",
      template: "public/index.html",
      filename: "side.html",
      title: "GameShow side screen",
      chunks: ["chunk-vendors", "chunk-common", "side"],
    },
  },
};
