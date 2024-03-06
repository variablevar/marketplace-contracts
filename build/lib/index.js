"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMarketplaceContract = exports.NFTFactoryContract = void 0;
const listeners_1 = require("./listeners");
var contracts_1 = require("./contracts");
Object.defineProperty(exports, "NFTFactoryContract", { enumerable: true, get: function () { return contracts_1.NFTFactoryContract; } });
Object.defineProperty(exports, "NFTMarketplaceContract", { enumerable: true, get: function () { return contracts_1.NFTMarketplaceContract; } });
(0, listeners_1.listen)()
    .then(function () {
    console.log("listening started on factory contract");
})
    .catch(function (err) {
    console.log(err);
});
