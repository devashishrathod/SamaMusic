const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();
const routesDir = __dirname;

fs.readdirSync(routesDir).forEach((file) => {
  const fullPath = path.join(routesDir, file);
  if (
    file !== "index.js" &&
    file.endsWith(".js") &&
    fs.statSync(fullPath).isFile()
  ) {
    const routeModule = require(fullPath);
    const mainRouter = routeModule.router || routeModule;
    const mainPrefix =
      routeModule.routePrefix || "/" + path.basename(file, ".js");
    if (mainRouter && typeof mainRouter === "function") {
      router.use(mainPrefix, mainRouter);
      console.log(`✅ Mounted: ${mainPrefix} → ${file}`);
    }
    // Support extraRoutes array
    if (Array.isArray(routeModule.extraRoutes)) {
      routeModule.extraRoutes.forEach(({ path, router: extraRouter }) => {
        if (path && typeof extraRouter === "function") {
          router.use(path, extraRouter);
          console.log(`🔁 Extra Mounted: ${path} → ${file}`);
        }
      });
    }
  }
});

module.exports = router;
