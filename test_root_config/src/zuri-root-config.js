import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

if (window.local){
  registerApplication({
    name: "@zuri/zuri-plugin-noticeboard",
    app: () => System.import("//localhost:8000/static/zuri-zuri-plugin-noticeboard.js"),
    activeWhen: ["/"]
  });
}else{
  registerApplication({
    name: "@zuri/zuri-plugin-noticeboard",
    app: () =>
      System.import(
        "https://noticeboard.zuri.chat/static/zuri-zuri-plugin-noticeboard.js"
      ),
    activeWhen: ["/"]
  });
}

start({
  urlRerouteOnly: true,
});
