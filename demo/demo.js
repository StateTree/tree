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


Tree.prototype.insert = function (childValue) {
	var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	var childKey = arguments[2];
	var callback = arguments[3];


	if (parentKey !== undefined && typeof parentKey !== 'string') {
		console.warn('parentKey can be only string if provided');
		return;
	}

	if (childKey !== undefined && typeof childKey !== 'string') {
		console.warn('childKey can be only string if provioded');
		return;
	}

	if (this._keymap) {
		var parentNode = null;
		if (parentKey !== null) {
			parentNode = this._keymap[parentKey];
			if (!parentNode && this.root) {
				console.warn('parent not found: ', parentKey);
				return;
			}
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

Tree.prototype.getChildrenForNode = function (key) {
	if (this._keymap) {
		var parentNode = this._keymap[key];
		if (parentNode) {
			return parentNode.getChildren();
		}
		return null;
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

Node.prototype.getChildren = function () {
	return this.children;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ZjU4YjVhYmQ4OGUyMWNhMTQ5OCIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9kZW1vL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRyZWUiLCJjYWNoZSIsIl9rZXltYXAiLCJyb290IiwicHJvdG90eXBlIiwiaW5zZXJ0IiwiY2hpbGRWYWx1ZSIsInBhcmVudEtleSIsImNoaWxkS2V5IiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwid2FybiIsInBhcmVudE5vZGUiLCJuZXdDaGlsZCIsImFkZCIsImtleSIsImFwcGx5IiwiZ2V0Q2hpbGRyZW5Gb3JOb2RlIiwiZ2V0Q2hpbGRyZW4iLCJzZWFyY2giLCJyZW1vdmUiLCJub2RlVG9SZW1vdmUiLCJhc0pTT04iLCJpZ25vcmVLZXkiLCJhc0pzb24iLCJOb2RlIiwidmFsdWUiLCJtYXhDaGlsZHJlbiIsImNoaWxkQ291bnQiLCJjaGlsZHJlbkRhdGFTdHJ1Y3R1cmUiLCJjaGlsZHJlbiIsImxlbmd0aCIsImNoaWxkIiwiaW5kZXgiLCJlcnJvciIsImhhc0NoaWxkQXQiLCJnZXRDaGlsZEF0IiwianNvbiIsImNvbnRhaW5zQ2hpbGRyZW4iLCJPYmplY3QiLCJrZXlzIiwiaSIsImNoaWxkTm9kZSIsImNoaWxkQXNKc29uIiwiQmluYXJ5VHJlZSIsIkxlYWYiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHIiLCJfdmFsdWUiLCJuZXdWYWx1ZSIsIm5ld05vZGUiLCJpbk9yZGVyVHJhdmVyc2UiLCJwcmVPcmRlclRyYXZlcnNlIiwicG9zdE9yZGVyVHJhdmVyc2UiLCJtaW4iLCJtYXgiLCJpbnNlcnROb2RlIiwiaW5PcmRlclRyYXZlcnNlTm9kZSIsIm5vZGUiLCJsZWZ0Tm9kZSIsInJpZ2h0Tm9kZSIsImNhbGwiLCJidCIsInByaW50Tm9kZSIsInZhbCIsImxvZyIsInRyZWUiLCJrZXkxIiwiYXNKc29uVHJlZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7O0lBR3FCQSxJLEdBQ3BCLGdCQUEyQjtBQUFBLEtBQWZDLEtBQWUsdUVBQVAsSUFBTzs7QUFBQTs7QUFDMUIsTUFBS0MsT0FBTCxHQUFlRCxRQUFRLEVBQVIsR0FBYSxJQUE1QjtBQUNBLE1BQUtFLElBQUwsR0FBWSxJQUFaO0FBQ0EsQzs7a0JBSm1CSCxJOzs7QUFPckJBLEtBQUtJLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixVQUFXQyxVQUFYLEVBQTJEO0FBQUEsS0FBcENDLFNBQW9DLHVFQUF4QixJQUF3QjtBQUFBLEtBQWxCQyxRQUFrQjtBQUFBLEtBQVRDLFFB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U3dDLEdBQUcxQyxNQUFILEVBQWY7O0FBRUFaLFFBQVF5RCxHQUFSLENBQVkzQyxNQUFaOztBQUVBLElBQUk0QyxPQUFPLGVBQVg7QUFDQSxJQUFJckQsWUFBSjtBQUFBLElBQVNzRCxhQUFUO0FBQ0F0RCxNQUFNcUQsS0FBS2hFLE1BQUwsQ0FBWSxDQUFaLENBQU47O0FBRUFnRSxLQUFLaEUsTUFBTCxDQUFZLENBQVosRUFBZVcsR0FBZjtBQUNBc0QsT0FBS0QsS0FBS2hFLE1BQUwsQ0FBWSxDQUFaLEVBQWVXLEdBQWYsQ0FBTDtBQUNBcUQsS0FBS2hFLE1BQUwsQ0FBWSxDQUFaLEVBQWVXLEdBQWY7QUFDQXFELEtBQUtoRCxNQUFMLENBQVlpRCxJQUFaOztBQUVBLElBQU1DLGFBQWFGLEtBQUs5QyxNQUFMLEVBQW5COztBQUVBWixRQUFReUQsR0FBUixDQUFZRyxVQUFaLEUiLCJmaWxlIjoiZGVtby9kZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0cmVlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRyZWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widHJlZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2Y1OGI1YWJkODhlMjFjYTE0OTgiLCJpbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xuXHRjb25zdHJ1Y3RvcihjYWNoZSA9IHRydWUgKSB7XG5cdFx0dGhpcy5fa2V5bWFwID0gY2FjaGUgPyB7fSA6IG51bGw7XG5cdFx0dGhpcy5yb290ID0gbnVsbDtcblx0fVxufVxuXG5UcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoIGNoaWxkVmFsdWUsIHBhcmVudEtleSA9IG51bGwsIGNoaWxkS2V5LGNhbGxiYWNrKXtcblxuXHRpZiggKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2YgcGFyZW50S2V5ICE9PSAnc3RyaW5nJyl7XG5cdFx0Y29uc29sZS53YXJuKCdwYXJlbnRLZXkgY2FuIGJlIG9ubHkgc3RyaW5nIGlmIHByb3ZpZGVkJyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYoIChjaGlsZEtleSAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2YgY2hpbGRLZXkgIT09ICdzdHJpbmcnKXtcblx0XHRjb25zb2xlLndhcm4oJ2NoaWxkS2V5IGNhbiBiZSBvbmx5IHN0cmluZyBpZiBwcm92aW9kZWQnKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdGxldCBwYXJlbnROb2RlID0gbnVsbDtcblx0XHRpZihwYXJlbnRLZXkgIT09IG51bGwpe1xuXHRcdFx0cGFyZW50Tm9kZSA9IHRoaXMuX2tleW1hcFtwYXJlbnRLZXldO1xuXHRcdFx0aWYoIXBhcmVudE5vZGUgJiYgdGhpcy5yb290KXtcblx0XHRcdFx0Y29uc29sZS53YXJuKCdwYXJlbnQgbm90IGZvdW5kOiAnLCBwYXJlbnRLZXkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgbmV3Q2hpbGQgPSBuZXcgTm9kZShjaGlsZFZhbHVlLCBjaGlsZEtleSk7XG5cdFx0aWYoIXRoaXMucm9vdCl7XG5cdFx0XHR0aGlzLnJvb3QgPSBuZXdDaGlsZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyZW50Tm9kZS5hZGQobmV3Q2hpbGQsIHBhcmVudE5vZGUua2V5KTtcblx0XHR9XG5cdFx0dGhpcy5fa2V5bWFwW25ld0NoaWxkLmtleV0gPSBuZXdDaGlsZDtcblx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5hcHBseShjYWxsYmFja1sndGhpcyddKTtcblx0XHRyZXR1cm4gbmV3Q2hpbGQua2V5O1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVHJlZS5wcm90b3R5cGUuZ2V0Q2hpbGRyZW5Gb3JOb2RlID0gZnVuY3Rpb24gKGtleSl7XG5cdGlmKHRoaXMuX2tleW1hcCl7XG5cdFx0Y29uc3QgcGFyZW50Tm9kZSA9ICB0aGlzLl9rZXltYXBba2V5XTtcblx0XHRpZihwYXJlbnROb2RlKXtcblx0XHRcdHJldHVybiBwYXJlbnROb2RlLmdldENoaWxkcmVuKClcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5fa2V5bWFwKXtcblx0XHRyZXR1cm4gdGhpcy5fa2V5bWFwW2tleV07XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjayl7XG5cdGlmKHRoaXMuX2tleW1hcCl7XG5cdFx0Y29uc3Qgbm9kZVRvUmVtb3ZlID0gdGhpcy5fa2V5bWFwW2tleV07XG5cdFx0Y29uc3QgcGFyZW50S2V5ID0gbm9kZVRvUmVtb3ZlLnBhcmVudEtleTtcblx0XHRpZihwYXJlbnRLZXkgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fa2V5bWFwW3BhcmVudEtleV07XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZShrZXkpO1xuXHRcdH1cblx0XHRkZWxldGUgdGhpcy5fa2V5bWFwW2tleV07XG5cdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tbJ3RoaXMnXSk7XG5cdH1cbn07XG5cblxuVHJlZS5wcm90b3R5cGUuYXNKU09OID0gZnVuY3Rpb24gKGlnbm9yZUtleSl7XG5cdHJldHVybiB0aGlzLnJvb3QuYXNKc29uKGlnbm9yZUtleSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi90cmVlL2luZGV4LmpzIiwiaW1wb3J0IExlYWYgZnJvbSAnLi9sZWFmJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZSBleHRlbmRzIExlYWYge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSwga2V5LCBtYXhDaGlsZHJlbil7XG5cdFx0c3VwZXIodmFsdWUsIGtleSk7XG5cdFx0dGhpcy5jaGlsZENvdW50ID0gMDtcblx0XHR0aGlzLm1heENoaWxkcmVuO1xuXHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlO1xuXHRcdGlmKG1heENoaWxkcmVuICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0dGhpcy5tYXhDaGlsZHJlbiA9IG1heENoaWxkcmVuO1xuXHRcdFx0dGhpcy5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5sZW5ndGggPSB0aGlzLm1heENoaWxkcmVuO1xuXHRcdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPSAnYXJyYXknO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0ge307XG5cdFx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9ICdvYmplY3QnO1xuXHRcdH1cblxuXHRcdHRoaXMucGFyZW50S2V5O1xuXHR9XG59XG5cbk5vZGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50S2V5LCBpbmRleCl7XG5cdGlmKGNoaWxkLmtleSl7XG5cdFx0aWYodGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPT09ICdhcnJheScgJiYgaW5kZXggIT09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aGlzLmNoaWxkcmVuW2luZGV4XSA9IGNoaWxkXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0aWYoIXRoaXMuY2hpbGRyZW5bY2hpbGQua2V5XSl7XG5cdFx0XHRcdGlmKHRoaXMubWF4Q2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLm1heENoaWxkcmVuID09PSB0aGlzLmNoaWxkQ291bnQpe1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJNYXggQ2hpbGRyZW4gY291bnQgcmVhY2hlZFwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZC5wYXJlbnRLZXkgPSBwYXJlbnRLZXk7XG5cdFx0XHRcdFx0dGhpcy5jaGlsZHJlbltjaGlsZC5rZXldID0gY2hpbGQ7XG5cdFx0XHRcdFx0dGhpcy5jaGlsZENvdW50ID0gdGhpcy5jaGlsZENvdW50ICsgMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmVycm9yKFwiS2V5IGlzIHJlcXVpcmVkIHRvIGFkZCBjaGlsZCB0byBub2RlXCIpXG5cdH1cblxufTtcblxuTm9kZS5wcm90b3R5cGUuaGFzQ2hpbGRBdCA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLmNoaWxkcmVuW2tleV0pe1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZVxufTtcblxuTm9kZS5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uKGtleSl7XG5cdHJldHVybiB0aGlzLmNoaWxkcmVuW2tleV07XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmNoaWxkcmVuO1xufTtcblxuTm9kZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSl7XG5cdGlmKHRoaXMuY2hpbGRyZW5ba2V5XSl7XG5cdFx0ZGVsZXRlIHRoaXMuY2hpbGRyZW5ba2V5XTtcblx0XHR0aGlzLmNoaWxkQ291bnQgPSB0aGlzLmNoaWxkQ291bnQgLSAxO1xuXHR9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5hc0pzb24gPSBmdW5jdGlvbiAoaWdub3JlS2V5KXtcblx0Y29uc3QganNvbiA9IHtcblx0XHR2YWx1ZTogdGhpcy52YWx1ZSxcblx0XHRjaGlsZHJlbjogbnVsbFxuXHR9O1xuXHRpZighaWdub3JlS2V5KXtcblx0XHRqc29uLmtleSA9IHRoaXMua2V5XG5cdH1cblxuXHRjb25zdCBjb250YWluc0NoaWxkcmVuID0gKHRoaXMuY2hpbGRyZW4pICYmIChPYmplY3Qua2V5cyh0aGlzLmNoaWxkcmVuKS5sZW5ndGggPiAwKTtcblx0aWYoY29udGFpbnNDaGlsZHJlbil7XG5cdFx0anNvbi5jaGlsZHJlbiA9IFtdO1xuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNoaWxkcmVuKTtcblx0XHRmb3IobGV0IGkgPSAwIDsgaSA8IGtleXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0Y29uc3Qga2V5ID0ga2V5c1tpXTtcblx0XHRcdGNvbnN0IGNoaWxkTm9kZSA9IHRoaXMuY2hpbGRyZW5ba2V5XTtcblx0XHRcdGlmKGNoaWxkTm9kZSl7XG5cdFx0XHRcdGNvbnN0IGNoaWxkQXNKc29uID0gY2hpbGROb2RlLmFzSnNvbihpZ25vcmVLZXkpO1xuXHRcdFx0XHRqc29uLmNoaWxkcmVuW2tleV0gPSBjaGlsZEFzSnNvbjtcblx0XHRcdH1cblxuXHRcdH1cblx0fVxuXHRyZXR1cm4ganNvbjtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi90cmVlL05vZGUuanMiLCJpbXBvcnQgVHJlZSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IEJpbmFyeVRyZWUgZnJvbSAnLi9iaW5hcnlUcmVlJztcblxuZXhwb3J0IHtcblx0VHJlZSxcblx0QmluYXJ5VHJlZVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExlYWYge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSwga2V5KXtcblx0XHR0aGlzLmtleSA9IGtleSAhPT0gdW5kZWZpbmVkID8ga2V5IDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xuXHRcdHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cdH1cblxuXHRnZXQgdmFsdWUoKXtcblx0XHRyZXR1cm4gdGhpcy5fdmFsdWVcblx0fVxuXG5cdHNldCB2YWx1ZShuZXdWYWx1ZSl7XG5cdFx0dGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi90cmVlL2xlYWYuanMiLCJpbXBvcnQgVHJlZSBmcm9tICcuLy4uL3RyZWUnO1xuaW1wb3J0IE5vZGUgZnJvbSAnLi8uLi90cmVlL05vZGUnO1xuaW1wb3J0IHtpbnNlcnROb2RlLCBpbk9yZGVyVHJhdmVyc2VOb2RlfSBmcm9tICcuL2hlbHBlcic7XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmFyeVRyZWUgZXh0ZW5kcyBUcmVlIHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcignbnVtYmVyJywgZmFsc2UpO1xuXHR9XG5cblx0YXNKU09OKCl7XG5cdFx0cmV0dXJuIHN1cGVyLmFzSlNPTih0cnVlKTtcblx0fVxufVxuXG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRjb25zdCBuZXdOb2RlID0gbmV3IE5vZGUodmFsdWUsdmFsdWUsIDIpO1xuXHRpZih0aGlzLnJvb3Qpe1xuXHRcdGluc2VydE5vZGUodGhpcy5yb290LG5ld05vZGUpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMucm9vdCA9IG5ld05vZGU7XG5cdH1cbn07XG5cblxuLy8gdmlzaXRzIGFsbCB0aGUgbm9kZXMgaW4gYXNjZW5kaW5nIG9yZGVyXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5pbk9yZGVyVHJhdmVyc2UgPSBmdW5jdGlvbihjYWxsYmFjayl7XG5cdGluT3JkZXJUcmF2ZXJzZU5vZGUodGhpcy5yb290LGNhbGxiYWNrKTtcbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnByZU9yZGVyVHJhdmVyc2UgPSBmdW5jdGlvbigpe1xuXG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5wb3N0T3JkZXJUcmF2ZXJzZSA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cblxuQmluYXJ5VHJlZS5wcm90b3R5cGUubWluID0gZnVuY3Rpb24oKXtcblxufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUubWF4ID0gZnVuY3Rpb24oKXtcblxufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmluYXJ5VHJlZS9pbmRleC5qcyIsImV4cG9ydCBmdW5jdGlvbiBpbnNlcnROb2RlKG5vZGUsIG5ld05vZGUpe1xuXHRpZihuZXdOb2RlLmtleSA8IG5vZGUua2V5KXtcblx0XHRjb25zdCBsZWZ0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgwKTtcblx0XHRpZihsZWZ0Tm9kZSA9PT0gbnVsbCB8fCBsZWZ0Tm9kZSA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdG5vZGUuYWRkKG5ld05vZGUsIG51bGwsIDApO1xuXHRcdH0gZWxzZXtcblx0XHRcdGluc2VydE5vZGUobGVmdE5vZGUsIG5ld05vZGUpO1xuXHRcdH1cblx0fSBlbHNle1xuXHRcdGNvbnN0IHJpZ2h0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgxKTtcblx0XHRpZihyaWdodE5vZGUgPT09IG51bGwgfHwgcmlnaHROb2RlID09PSB1bmRlZmluZWQpe1xuXHRcdFx0bm9kZS5hZGQobmV3Tm9kZSwgbnVsbCAsIDEpO1xuXHRcdH0gZWxzZXtcblx0XHRcdGluc2VydE5vZGUocmlnaHROb2RlLCBuZXdOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaW5PcmRlclRyYXZlcnNlTm9kZShub2RlLCBjYWxsYmFjayl7XG5cdGlmKG5vZGUgIT09IG51bGwgJiYgbm9kZSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0Y29uc3QgbGVmdE5vZGUgPSBub2RlLmdldENoaWxkQXQoMCk7XG5cdFx0Ly8gcmVjdXJzaXZlbHkgY2FsbCBhbGwgbGVmdCB0byBnZXQgdGhlIG1pbiB2YWx1ZVxuXHRcdGluT3JkZXJUcmF2ZXJzZU5vZGUobGVmdE5vZGUsIGNhbGxiYWNrKTtcblx0XHRjYWxsYmFjay5jYWxsKGNhbGxiYWNrWyd0aGlzJ10sIG5vZGUua2V5KTtcblx0XHRjb25zdCByaWdodE5vZGUgPSBub2RlLmdldENoaWxkQXQoMSk7XG5cdFx0Ly9hZnRlciBjYWxsaW5nIGFsbCBsZWZ0IG5cblx0XHRpbk9yZGVyVHJhdmVyc2VOb2RlKHJpZ2h0Tm9kZSxjYWxsYmFjayk7XG5cblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyIsImltcG9ydCB7VHJlZSwgQmluYXJ5VHJlZX0gZnJvbSAnLi8uLi9saWInO1xuXG52YXIgYnQgPSBuZXcgQmluYXJ5VHJlZSgpO1xuYnQuaW5zZXJ0KDYpO1xuYnQuaW5zZXJ0KDQpO1xuYnQuaW5zZXJ0KDcpO1xuYnQuaW5zZXJ0KDIpO1xuXG5cbmZ1bmN0aW9uIHByaW50Tm9kZSh2YWwpe1xuXHRjb25zb2xlLmxvZyh2YWwpXG59XG5cbmJ0LmluT3JkZXJUcmF2ZXJzZShwcmludE5vZGUpO1xuXG5jb25zdCBhc0pzb24gPSBidC5hc0pTT04oKTtcblxuY29uc29sZS5sb2coYXNKc29uKTtcblxudmFyIHRyZWUgPSBuZXcgVHJlZSgpO1xubGV0IGtleSwga2V5MTtcbmtleSA9IHRyZWUuaW5zZXJ0KDQpO1xuXG50cmVlLmluc2VydCgyLCBrZXkpO1xua2V5MT10cmVlLmluc2VydCg2LCBrZXkpO1xudHJlZS5pbnNlcnQoNywga2V5KTtcbnRyZWUucmVtb3ZlKGtleTEpO1xuXG5jb25zdCBhc0pzb25UcmVlID0gdHJlZS5hc0pTT04oKTtcblxuY29uc29sZS5sb2coYXNKc29uVHJlZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGVtby9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=