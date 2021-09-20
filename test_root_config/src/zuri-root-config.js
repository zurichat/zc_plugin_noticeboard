import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });


registerApplication({
  name: "@zuri/zuri-plugin-noticeboard",
  app: () => System.import("@zuri/zuri-plugin-noticeboard"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
