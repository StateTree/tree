(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tree", [], factory);
	else if(typeof exports === 'object')
		exports["tree"] = factory();
	else
		root["tree"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Node = __webpack_require__(1);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function Tree() {
	var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	_classCallCheck(this, Tree);

	this._keymap = cache ? {} : null;
	this.root = null;
};

exports.default = Tree;


Tree.prototype.insert = function (childValue, parentKey, childKey, callback) {

	if (parentKey !== undefined && typeof parentKey !== 'string') {
		console.warn('parentKey can be only string if provided');
		return;
	}

	if (childKey !== undefined && typeof childKey !== 'string') {
		console.warn('childKey can be only string if provioded');
		return;
	}

	if (this._keymap) {
		var parentNode = this._keymap[parentKey];
		if (!parentNode && this.root) {
			console.warn('parent not found: ', parentKey);
			return;
		}

		var newChild = new _Node2.default(childValue, childKey);
		if (!this.root) {
			this.root = newChild;
		} else {
			parentNode.add(newChild, parentNode.key);
		}
		this._keymap[newChild.key] = newChild;
		callback && callback.apply(callback['this']);
		return newChild.key;
	}
	return null;
};

Tree.prototype.search = function (key) {
	if (this._keymap) {
		return this._keymap[key];
	}
	return null;
};

Tree.prototype.remove = function (key, callback) {
	if (this._keymap) {
		var nodeToRemove = this._keymap[key];
		var parentKey = nodeToRemove.parentKey;
		if (parentKey !== undefined) {
			var parentNode = this._keymap[parentKey];
			parentNode.remove(key);
		}
		delete this._keymap[key];
		callback && callback.apply(callback['this']);
	}
};

Tree.prototype.asJSON = function (ignoreKey) {
	return this.root.asJson(ignoreKey);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _leaf = __webpack_require__(3);

var _leaf2 = _interopRequireDefault(_leaf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = function (_Leaf) {
	_inherits(Node, _Leaf);

	function Node(value, key, maxChildren) {
		_classCallCheck(this, Node);

		var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, value, key));

		_this.childCount = 0;
		_this.maxChildren;
		_this.childrenDataStructure;
		if (maxChildren !== undefined) {
			_this.maxChildren = maxChildren;
			_this.children = [];
			_this.children.length = _this.maxChildren;
			_this.childrenDataStructure = 'array';
		} else {
			_this.children = {};
			_this.childrenDataStructure = 'object';
		}

		_this.parentKey;
		return _this;
	}

	return Node;
}(_leaf2.default);

exports.default = Node;


Node.prototype.add = function (child, parentKey, index) {
	if (child.key) {
		if (this.childrenDataStructure === 'array' && index !== undefined) {
			this.children[index] = child;
		} else if (this.childrenDataStructure === 'object') {
			if (!this.children[child.key]) {
				if (this.maxChildren !== undefined && this.maxChildren === this.childCount) {
					console.error("Max Children count reached");
				} else {
					child.parentKey = parentKey;
					this.children[child.key] = child;
					this.childCount = this.childCount + 1;
				}
			}
		}
	} else {
		console.error("Key is required to add child to node");
	}
};

Node.prototype.hasChildAt = function (key) {
	if (this.children[key]) {
		return true;
	}
	return false;
};

Node.prototype.getChildAt = function (key) {
	return this.children[key];
};

Node.prototype.remove = function (key) {
	if (this.children[key]) {
		delete this.children[key];
		this.childCount = this.childCount - 1;
	}
};

Node.prototype.asJson = function (ignoreKey) {
	var json = {
		value: this.value,
		children: null
	};
	if (!ignoreKey) {
		json.key = this.key;
	}

	var containsChildren = this.children && Object.keys(this.children).length > 0;
	if (containsChildren) {
		json.children = [];
		var keys = Object.keys(this.children);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var childNode = this.children[key];
			if (childNode) {
				var childAsJson = childNode.asJson(ignoreKey);
				json.children[key] = childAsJson;
			}
		}
	}
	return json;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BinaryTree = exports.Tree = undefined;

var _tree = __webpack_require__(0);

var _tree2 = _interopRequireDefault(_tree);

var _binaryTree = __webpack_require__(4);

var _binaryTree2 = _interopRequireDefault(_binaryTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tree = _tree2.default;
exports.BinaryTree = _binaryTree2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Leaf = function () {
	function Leaf(value, key) {
		_classCallCheck(this, Leaf);

		this.key = key !== undefined ? key : Math.random().toString(36).substr(2, 9);
		this._value = value;
	}

	_createClass(Leaf, [{
		key: "value",
		get: function get() {
			return this._value;
		},
		set: function set(newValue) {
			this._value = newValue;
		}
	}]);

	return Leaf;
}();

exports.default = Leaf;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tree = __webpack_require__(0);

var _tree2 = _interopRequireDefault(_tree);

var _Node = __webpack_require__(1);

var _Node2 = _interopRequireDefault(_Node);

var _helper = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinaryTree = function (_Tree) {
	_inherits(BinaryTree, _Tree);

	function BinaryTree() {
		_classCallCheck(this, BinaryTree);

		return _possibleConstructorReturn(this, (BinaryTree.__proto__ || Object.getPrototypeOf(BinaryTree)).call(this, 'number', false));
	}

	_createClass(BinaryTree, [{
		key: 'asJSON',
		value: function asJSON() {
			return _get(BinaryTree.prototype.__proto__ || Object.getPrototypeOf(BinaryTree.prototype), 'asJSON', this).call(this, true);
		}
	}]);

	return BinaryTree;
}(_tree2.default);

exports.default = BinaryTree;


BinaryTree.prototype.insert = function (value) {
	var newNode = new _Node2.default(value, value, 2);
	if (this.root) {
		(0, _helper.insertNode)(this.root, newNode);
	} else {
		this.root = newNode;
	}
};

// visits all the nodes in ascending order
BinaryTree.prototype.inOrderTraverse = function (callback) {
	(0, _helper.inOrderTraverseNode)(this.root, callback);
};

BinaryTree.prototype.preOrderTraverse = function () {};

BinaryTree.prototype.postOrderTraverse = function () {};

BinaryTree.prototype.min = function () {};

BinaryTree.prototype.max = function () {};

BinaryTree.prototype.search = function () {};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.insertNode = insertNode;
exports.inOrderTraverseNode = inOrderTraverseNode;
function insertNode(node, newNode) {
	if (newNode.key < node.key) {
		var leftNode = node.getChildAt(0);
		if (leftNode === null || leftNode === undefined) {
			node.add(newNode, null, 0);
		} else {
			insertNode(leftNode, newNode);
		}
	} else {
		var rightNode = node.getChildAt(1);
		if (rightNode === null || rightNode === undefined) {
			node.add(newNode, null, 1);
		} else {
			insertNode(rightNode, newNode);
		}
	}
}

function inOrderTraverseNode(node, callback) {
	if (node !== null && node !== undefined) {
		var leftNode = node.getChildAt(0);
		// recursively call all left to get the min value
		inOrderTraverseNode(leftNode, callback);
		callback.call(callback['this'], node.key);
		var rightNode = node.getChildAt(1);
		//after calling all left n
		inOrderTraverseNode(rightNode, callback);
	}
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lib = __webpack_require__(2);

var bt = new _lib.BinaryTree();
bt.insert(6);
bt.insert(4);
bt.insert(7);
bt.insert(2);

function printNode(val) {
	console.log(val);
}

bt.inOrderTraverse(printNode);

var asJson = bt.asJSON();

console.log(asJson);

var tree = new _lib.Tree();
var key = void 0,
    key1 = void 0;
key = tree.insert(4);

tree.insert(2, key);
key1 = tree.insert(6, key);
tree.insert(7, key);
tree.remove(key1);

var asJsonTree = tree.asJSON();

console.log(asJsonTree);

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkYTI4ZWZjNDAxZGJjZjgyMjVhZCIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9kZW1vL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRyZWUiLCJjYWNoZSIsIl9rZXltYXAiLCJyb290IiwicHJvdG90eXBlIiwiaW5zZXJ0IiwiY2hpbGRWYWx1ZSIsInBhcmVudEtleSIsImNoaWxkS2V5IiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwid2FybiIsInBhcmVudE5vZGUiLCJuZXdDaGlsZCIsImFkZCIsImtleSIsImFwcGx5Iiwic2VhcmNoIiwicmVtb3ZlIiwibm9kZVRvUmVtb3ZlIiwiYXNKU09OIiwiaWdub3JlS2V5IiwiYXNKc29uIiwiTm9kZSIsInZhbHVlIiwibWF4Q2hpbGRyZW4iLCJjaGlsZENvdW50IiwiY2hpbGRyZW5EYXRhU3RydWN0dXJlIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGlsZCIsImluZGV4IiwiZXJyb3IiLCJoYXNDaGlsZEF0IiwiZ2V0Q2hpbGRBdCIsImpzb24iLCJjb250YWluc0NoaWxkcmVuIiwiT2JqZWN0Iiwia2V5cyIsImkiLCJjaGlsZE5vZGUiLCJjaGlsZEFzSnNvbiIsIkJpbmFyeVRyZWUiLCJMZWFmIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwiX3ZhbHVlIiwibmV3VmFsdWUiLCJuZXdOb2RlIiwiaW5PcmRlclRyYXZlcnNlIiwicHJlT3JkZXJUcmF2ZXJzZSIsInBvc3RPcmRlclRyYXZlcnNlIiwibWluIiwibWF4IiwiaW5zZXJ0Tm9kZSIsImluT3JkZXJUcmF2ZXJzZU5vZGUiLCJub2RlIiwibGVmdE5vZGUiLCJyaWdodE5vZGUiLCJjYWxsIiwiYnQiLCJwcmludE5vZGUiLCJ2YWwiLCJsb2ciLCJ0cmVlIiwia2V5MSIsImFzSnNvblRyZWUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7OztJQUdxQkEsSSxHQUNwQixnQkFBMkI7QUFBQSxLQUFmQyxLQUFlLHVFQUFQLElBQU87O0FBQUE7O0FBQzFCLE1BQUtDLE9BQUwsR0FBZUQsUUFBUSxFQUFSLEdBQWEsSUFBNUI7QUFDQSxNQUFLRSxJQUFMLEdBQVksSUFBWjtBQUNBLEM7O2tCQUptQkgsSTs7O0FBT3JCQSxLQUFLSSxTQUFMLENBQWVDLE1BQWYsR0FBd0IsVUFBV0MsVUFBWCxFQUF1QkMsU0FBdkIsRUFBa0NDLFFBQWxDLEVBQTJDQyxRQUEzQyxFQUFvRDs7QUFFM0UsS0FBS0YsY0FBY0csU0FBZixJQUE2QixPQUFPSCxTQUFQLEtBQXFCLFFBQXRELEVBQStE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bnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0cmVlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRyZWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widHJlZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGEyOGVmYzQwMWRiY2Y4MjI1YWQiLCJpbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xuXHRjb25zdHJ1Y3RvcihjYWNoZSA9IHRydWUgKSB7XG5cdFx0dGhpcy5fa2V5bWFwID0gY2FjaGUgPyB7fSA6IG51bGw7XG5cdFx0dGhpcy5yb290ID0gbnVsbDtcblx0fVxufVxuXG5UcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoIGNoaWxkVmFsdWUsIHBhcmVudEtleSwgY2hpbGRLZXksY2FsbGJhY2spe1xuXG5cdGlmKCAocGFyZW50S2V5ICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBwYXJlbnRLZXkgIT09ICdzdHJpbmcnKXtcblx0XHRjb25zb2xlLndhcm4oJ3BhcmVudEtleSBjYW4gYmUgb25seSBzdHJpbmcgaWYgcHJvdmlkZWQnKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiggKGNoaWxkS2V5ICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBjaGlsZEtleSAhPT0gJ3N0cmluZycpe1xuXHRcdGNvbnNvbGUud2FybignY2hpbGRLZXkgY2FuIGJlIG9ubHkgc3RyaW5nIGlmIHByb3Zpb2RlZCcpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmKHRoaXMuX2tleW1hcCl7XG5cdFx0Y29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX2tleW1hcFtwYXJlbnRLZXldO1xuXHRcdGlmKCFwYXJlbnROb2RlICYmIHRoaXMucm9vdCl7XG5cdFx0XHRjb25zb2xlLndhcm4oJ3BhcmVudCBub3QgZm91bmQ6ICcsIHBhcmVudEtleSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3Q2hpbGQgPSBuZXcgTm9kZShjaGlsZFZhbHVlLCBjaGlsZEtleSk7XG5cdFx0aWYoIXRoaXMucm9vdCl7XG5cdFx0XHR0aGlzLnJvb3QgPSBuZXdDaGlsZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyZW50Tm9kZS5hZGQobmV3Q2hpbGQsIHBhcmVudE5vZGUua2V5KTtcblx0XHR9XG5cdFx0dGhpcy5fa2V5bWFwW25ld0NoaWxkLmtleV0gPSBuZXdDaGlsZDtcblx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5hcHBseShjYWxsYmFja1sndGhpcyddKTtcblx0XHRyZXR1cm4gbmV3Q2hpbGQua2V5O1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuXG5cblRyZWUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdHJldHVybiB0aGlzLl9rZXltYXBba2V5XTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblRyZWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrKXtcblx0aWYodGhpcy5fa2V5bWFwKXtcblx0XHRjb25zdCBub2RlVG9SZW1vdmUgPSB0aGlzLl9rZXltYXBba2V5XTtcblx0XHRjb25zdCBwYXJlbnRLZXkgPSBub2RlVG9SZW1vdmUucGFyZW50S2V5O1xuXHRcdGlmKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9rZXltYXBbcGFyZW50S2V5XTtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlKGtleSk7XG5cdFx0fVxuXHRcdGRlbGV0ZSB0aGlzLl9rZXltYXBba2V5XTtcblx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5hcHBseShjYWxsYmFja1sndGhpcyddKTtcblx0fVxufTtcblxuXG5UcmVlLnByb3RvdHlwZS5hc0pTT04gPSBmdW5jdGlvbiAoaWdub3JlS2V5KXtcblx0cmV0dXJuIHRoaXMucm9vdC5hc0pzb24oaWdub3JlS2V5KTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvaW5kZXguanMiLCJpbXBvcnQgTGVhZiBmcm9tICcuL2xlYWYnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIGV4dGVuZHMgTGVhZiB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlLCBrZXksIG1heENoaWxkcmVuKXtcblx0XHRzdXBlcih2YWx1ZSwga2V5KTtcblx0XHR0aGlzLmNoaWxkQ291bnQgPSAwO1xuXHRcdHRoaXMubWF4Q2hpbGRyZW47XG5cdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmU7XG5cdFx0aWYobWF4Q2hpbGRyZW4gIT09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aGlzLm1heENoaWxkcmVuID0gbWF4Q2hpbGRyZW47XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW107XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IHRoaXMubWF4Q2hpbGRyZW47XG5cdFx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9ICdhcnJheSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSB7fTtcblx0XHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID0gJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0dGhpcy5wYXJlbnRLZXk7XG5cdH1cbn1cblxuTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNoaWxkLCBwYXJlbnRLZXksIGluZGV4KXtcblx0aWYoY2hpbGQua2V5KXtcblx0XHRpZih0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9PT0gJ2FycmF5JyAmJiBpbmRleCAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdHRoaXMuY2hpbGRyZW5baW5kZXhdID0gY2hpbGRcblx0XHR9IGVsc2UgaWYgKHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRpZighdGhpcy5jaGlsZHJlbltjaGlsZC5rZXldKXtcblx0XHRcdFx0aWYodGhpcy5tYXhDaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubWF4Q2hpbGRyZW4gPT09IHRoaXMuY2hpbGRDb3VudCl7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk1heCBDaGlsZHJlbiBjb3VudCByZWFjaGVkXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkLnBhcmVudEtleSA9IHBhcmVudEtleTtcblx0XHRcdFx0XHR0aGlzLmNoaWxkcmVuW2NoaWxkLmtleV0gPSBjaGlsZDtcblx0XHRcdFx0XHR0aGlzLmNoaWxkQ291bnQgPSB0aGlzLmNoaWxkQ291bnQgKyAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUuZXJyb3IoXCJLZXkgaXMgcmVxdWlyZWQgdG8gYWRkIGNoaWxkIHRvIG5vZGVcIilcblx0fVxuXG59O1xuXG5Ob2RlLnByb3RvdHlwZS5oYXNDaGlsZEF0ID0gZnVuY3Rpb24gKGtleSl7XG5cdGlmKHRoaXMuY2hpbGRyZW5ba2V5XSl7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlXG59O1xuXG5Ob2RlLnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24oa2V5KXtcblx0cmV0dXJuIHRoaXMuY2hpbGRyZW5ba2V5XTtcbn07XG5cbk5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLmNoaWxkcmVuW2tleV0pe1xuXHRcdGRlbGV0ZSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0dGhpcy5jaGlsZENvdW50ID0gdGhpcy5jaGlsZENvdW50IC0gMTtcblx0fVxufTtcblxuTm9kZS5wcm90b3R5cGUuYXNKc29uID0gZnVuY3Rpb24gKGlnbm9yZUtleSl7XG5cdGNvbnN0IGpzb24gPSB7XG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0Y2hpbGRyZW46IG51bGxcblx0fTtcblx0aWYoIWlnbm9yZUtleSl7XG5cdFx0anNvbi5rZXkgPSB0aGlzLmtleVxuXHR9XG5cblx0Y29uc3QgY29udGFpbnNDaGlsZHJlbiA9ICh0aGlzLmNoaWxkcmVuKSAmJiAoT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbikubGVuZ3RoID4gMCk7XG5cdGlmKGNvbnRhaW5zQ2hpbGRyZW4pe1xuXHRcdGpzb24uY2hpbGRyZW4gPSBbXTtcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbik7XG5cdFx0Zm9yKGxldCBpID0gMCA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRjb25zdCBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0XHRpZihjaGlsZE5vZGUpe1xuXHRcdFx0XHRjb25zdCBjaGlsZEFzSnNvbiA9IGNoaWxkTm9kZS5hc0pzb24oaWdub3JlS2V5KTtcblx0XHRcdFx0anNvbi5jaGlsZHJlbltrZXldID0gY2hpbGRBc0pzb247XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblx0cmV0dXJuIGpzb247XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9Ob2RlLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi90cmVlJztcbmltcG9ydCBCaW5hcnlUcmVlIGZyb20gJy4vYmluYXJ5VHJlZSc7XG5cbmV4cG9ydCB7XG5cdFRyZWUsXG5cdEJpbmFyeVRyZWVcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFmIHtcblx0Y29uc3RydWN0b3IodmFsdWUsIGtleSl7XG5cdFx0dGhpcy5rZXkgPSBrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcblx0XHR0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlXG5cdH1cblxuXHRzZXQgdmFsdWUobmV3VmFsdWUpe1xuXHRcdHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9sZWFmLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi8uLi90cmVlJztcbmltcG9ydCBOb2RlIGZyb20gJy4vLi4vdHJlZS9Ob2RlJztcbmltcG9ydCB7aW5zZXJ0Tm9kZSwgaW5PcmRlclRyYXZlcnNlTm9kZX0gZnJvbSAnLi9oZWxwZXInO1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5hcnlUcmVlIGV4dGVuZHMgVHJlZSB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoJ251bWJlcicsIGZhbHNlKTtcblx0fVxuXG5cdGFzSlNPTigpe1xuXHRcdHJldHVybiBzdXBlci5hc0pTT04odHJ1ZSk7XG5cdH1cbn1cblxuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0Y29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLHZhbHVlLCAyKTtcblx0aWYodGhpcy5yb290KXtcblx0XHRpbnNlcnROb2RlKHRoaXMucm9vdCxuZXdOb2RlKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJvb3QgPSBuZXdOb2RlO1xuXHR9XG59O1xuXG5cbi8vIHZpc2l0cyBhbGwgdGhlIG5vZGVzIGluIGFzY2VuZGluZyBvcmRlclxuQmluYXJ5VHJlZS5wcm90b3R5cGUuaW5PcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRpbk9yZGVyVHJhdmVyc2VOb2RlKHRoaXMucm9vdCxjYWxsYmFjayk7XG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5wcmVPcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oKXtcblxufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUucG9zdE9yZGVyVHJhdmVyc2UgPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JpbmFyeVRyZWUvaW5kZXguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5zZXJ0Tm9kZShub2RlLCBuZXdOb2RlKXtcblx0aWYobmV3Tm9kZS5rZXkgPCBub2RlLmtleSl7XG5cdFx0Y29uc3QgbGVmdE5vZGUgPSBub2RlLmdldENoaWxkQXQoMCk7XG5cdFx0aWYobGVmdE5vZGUgPT09IG51bGwgfHwgbGVmdE5vZGUgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRub2RlLmFkZChuZXdOb2RlLCBudWxsLCAwKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKGxlZnROb2RlLCBuZXdOb2RlKTtcblx0XHR9XG5cdH0gZWxzZXtcblx0XHRjb25zdCByaWdodE5vZGUgPSBub2RlLmdldENoaWxkQXQoMSk7XG5cdFx0aWYocmlnaHROb2RlID09PSBudWxsIHx8IHJpZ2h0Tm9kZSA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdG5vZGUuYWRkKG5ld05vZGUsIG51bGwgLCAxKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKHJpZ2h0Tm9kZSwgbmV3Tm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluT3JkZXJUcmF2ZXJzZU5vZGUobm9kZSwgY2FsbGJhY2spe1xuXHRpZihub2RlICE9PSBudWxsICYmIG5vZGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdGNvbnN0IGxlZnROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDApO1xuXHRcdC8vIHJlY3Vyc2l2ZWx5IGNhbGwgYWxsIGxlZnQgdG8gZ2V0IHRoZSBtaW4gdmFsdWVcblx0XHRpbk9yZGVyVHJhdmVyc2VOb2RlKGxlZnROb2RlLCBjYWxsYmFjayk7XG5cdFx0Y2FsbGJhY2suY2FsbChjYWxsYmFja1sndGhpcyddLCBub2RlLmtleSk7XG5cdFx0Y29uc3QgcmlnaHROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDEpO1xuXHRcdC8vYWZ0ZXIgY2FsbGluZyBhbGwgbGVmdCBuXG5cdFx0aW5PcmRlclRyYXZlcnNlTm9kZShyaWdodE5vZGUsY2FsbGJhY2spO1xuXG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmluYXJ5VHJlZS9oZWxwZXIuanMiLCJpbXBvcnQge1RyZWUsIEJpbmFyeVRyZWV9IGZyb20gJy4vLi4vbGliJztcblxudmFyIGJ0ID0gbmV3IEJpbmFyeVRyZWUoKTtcbmJ0Lmluc2VydCg2KTtcbmJ0Lmluc2VydCg0KTtcbmJ0Lmluc2VydCg3KTtcbmJ0Lmluc2VydCgyKTtcblxuXG5mdW5jdGlvbiBwcmludE5vZGUodmFsKXtcblx0Y29uc29sZS5sb2codmFsKVxufVxuXG5idC5pbk9yZGVyVHJhdmVyc2UocHJpbnROb2RlKTtcblxuY29uc3QgYXNKc29uID0gYnQuYXNKU09OKCk7XG5cbmNvbnNvbGUubG9nKGFzSnNvbik7XG5cbnZhciB0cmVlID0gbmV3IFRyZWUoKTtcbmxldCBrZXksIGtleTE7XG5rZXkgPSB0cmVlLmluc2VydCg0KTtcblxudHJlZS5pbnNlcnQoMiwga2V5KTtcbmtleTE9dHJlZS5pbnNlcnQoNiwga2V5KTtcbnRyZWUuaW5zZXJ0KDcsIGtleSk7XG50cmVlLnJlbW92ZShrZXkxKTtcblxuY29uc3QgYXNKc29uVHJlZSA9IHRyZWUuYXNKU09OKCk7XG5cbmNvbnNvbGUubG9nKGFzSnNvblRyZWUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RlbW8vaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9