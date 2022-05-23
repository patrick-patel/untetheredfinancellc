/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/index.jsx":
/*!******************************!*\
  !*** ./client/src/index.jsx ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/patrickpatel/Documents/untethered/client/src/index.jsx: Unexpected token, expected \\\",\\\" (24:25)\\n\\n\\u001b[0m \\u001b[90m 22 | \\u001b[39m      \\u001b[32m\\\"price\\\"\\u001b[39m\\u001b[33m:\\u001b[39m \\u001b[35m0\\u001b[39m\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 23 | \\u001b[39m      \\u001b[32m\\\"totalBTC\\\"\\u001b[39m\\u001b[33m:\\u001b[39m \\u001b[35m0\\u001b[39m\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 24 | \\u001b[39m      \\u001b[32m\\\"distributions\\\"\\u001b[39m\\u001b[33m:\\u001b[39m []\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m                         \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 25 | \\u001b[39m      isLoggedIn\\u001b[33m:\\u001b[39m localStorage\\u001b[33m.\\u001b[39mgetItem(\\u001b[32m'token'\\u001b[39m)\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 26 | \\u001b[39m    }\\u001b[0m\\n\\u001b[0m \\u001b[90m 27 | \\u001b[39m  }\\u001b[0m\\n    at Object._raise (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:748:17)\\n    at Object.raiseWithData (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:741:17)\\n    at Object.raise (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:735:17)\\n    at Object.unexpected (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:9097:16)\\n    at Object.expect (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:9083:28)\\n    at Object.parseObjectLike (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:10896:14)\\n    at Object.parseExprAtom (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:10464:23)\\n    at Object.parseExprAtom (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:4759:20)\\n    at Object.parseExprSubscripts (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:10122:23)\\n    at Object.parseUpdate (/Users/patrickpatel/Documents/untethered/node_modules/@babel/parser/lib/index.js:10102:21)\");\n\n//# sourceURL=webpack:///./client/src/index.jsx?");

/***/ })

/******/ });