import {
  DashboardApp
} from "./chunk-IF7DTLZR.mjs";
import "./chunk-NQIC7ZFS.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-4GQOUCX6.mjs";
import "./chunk-2VTICXJR.mjs";
import "./chunk-D3YQN7HV.mjs";
import "./chunk-6WKBBTKM.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-WNBMJMFU.mjs";
import "./chunk-MNXC6Q4F.mjs";
import "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-XKXNQ2KV.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-OBQI23QM.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/app.tsx
import displayModule from "virtual:medusa/displays";
import formModule from "virtual:medusa/forms";
import menuItemModule from "virtual:medusa/menu-items";
import routeModule from "virtual:medusa/routes";
import widgetModule from "virtual:medusa/widgets";
import { jsx } from "react/jsx-runtime";
var localPlugin = {
  widgetModule,
  routeModule,
  displayModule,
  formModule,
  menuItemModule
};
function App({ plugins = [] }) {
  const app = new DashboardApp({
    plugins: [localPlugin, ...plugins]
  });
  return /* @__PURE__ */ jsx("div", { children: app.render() });
}
var app_default = App;
export {
  app_default as default
};
