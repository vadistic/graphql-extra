"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("./alias"));
exports.t = t;
__export(require("./ast"));
__export(require("./guards"));
__export(require("./internal"));
__export(require("./mixin"));
__export(require("./api"));
__export(require("./document"));
__export(require("./utils"));
__export(require("./kind-to-node"));
__export(require("./kind-to-api"));
