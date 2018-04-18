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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
	_classCallCheck(this, Tree);

	this._keymap = {};
	this.root;
	this.rootKey;
};

exports.default = Tree;


var protoType = Tree.prototype;

protoType.insert = function (element, elementId, parentId) {

	if (elementId !== undefined && typeof elementId !== 'string') {
		console.warn('elementId can be only string if provided');
		return;
	}

	if (parentId !== undefined && typeof parentId !== 'string') {
		console.warn('parentId can be only string if provided');
		return;
	}

	if (!this.root) {
		// first insert will become the rootNode
		this.root = new _Node2.default(element, elementId);
		this.rootKey = this.root.key;
	}

	// check if given parent exist
	var parentNode = null;
	if (parentId) {
		parentNode = this._keymap[parentId];
		if (!parentNode) {
			console.warn('parent not found: ', parentId);
			return;
		}
	} else {
		parentId = this.rootKey;
		parentNode = this.root;
	}

	var childNode = null;
	if (elementId) {
		childNode = this._keymap[elementId];
		if (!childNode) {
			childNode = new _Node2.default(element, elementId);
			parentNode.add(childNode, parentNode.key);
			this._keymap[childNode.key] = childNode;
		}
	}

	return childNode.key;
};

Tree.prototype.getChildrenForNode = function (key) {
	var parentNode = this._keymap[key];
	if (parentNode) {
		return parentNode.getChildren();
	}
	return null;
};

Tree.prototype.search = function (key) {
	return this._keymap[key];
};

Tree.prototype.remove = function (key) {
	var nodeToRemove = this._keymap[key];
	var parentKey = nodeToRemove.parentKey;
	if (parentKey !== undefined) {
		var parentNode = this._keymap[parentKey];
		parentNode.remove(key);
	}
	delete this._keymap[key];
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YTc4YzNmYWQzNTFlMGY2ZmJmNCIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyJdLCJuYW1lcyI6WyJUcmVlIiwiX2tleW1hcCIsInJvb3QiLCJyb290S2V5IiwicHJvdG9UeXBlIiwicHJvdG90eXBlIiwiaW5zZXJ0IiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInBhcmVudElkIiwidW5kZWZpbmVkIiwiY29uc29sZSIsIndhcm4iLCJrZXkiLCJwYXJlbnROb2RlIiwiY2hpbGROb2RlIiwiYWRkIiwiZ2V0Q2hpbGRyZW5Gb3JOb2RlIiwiZ2V0Q2hpbGRyZW4iLCJzZWFyY2giLCJyZW1vdmUiLCJub2RlVG9SZW1vdmUiLCJwYXJlbnRLZXkiLCJhc0pTT04iLCJpZ25vcmVLZXkiLCJhc0pzb24iLCJOb2RlIiwidmFsdWUiLCJtYXhDaGlsZHJlbiIsImNoaWxkQ291bnQiLCJjaGlsZHJlbkRhdGFTdHJ1Y3R1cmUiLCJjaGlsZHJlbiIsImxlbmd0aCIsImNoaWxkIiwiaW5kZXgiLCJlcnJvciIsImhhc0NoaWxkQXQiLCJnZXRDaGlsZEF0IiwianNvbiIsImNvbnRhaW5zQ2hpbGRyZW4iLCJPYmplY3QiLCJrZXlzIiwiaSIsImNoaWxkQXNKc29uIiwiQmluYXJ5VHJlZSIsIkxlYWYiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHIiLCJfdmFsdWUiLCJuZXdWYWx1ZSIsIm5ld05vZGUiLCJpbk9yZGVyVHJhdmVyc2UiLCJjYWxsYmFjayIsInByZU9yZGVyVHJhdmVyc2UiLCJwb3N0T3JkZXJUcmF2ZXJzZSIsIm1pbiIsIm1heCIsImluc2VydE5vZGUiLCJpbk9yZGVyVHJhdmVyc2VOb2RlIiwibm9kZSIsImxlZnROb2RlIiwicmlnaHROb2RlIiwiY2FsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7O0lBR3FCQSxJLEdBQ3BCLGdCQUFjO0FBQUE7O0FBQ2IsTUFBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxNQUFLQyxJQUFMO0FBQ0EsTUFBS0MsT0FBTDtBQUNBLEM7O2tCQUxtQkgsSTs7O0FBUXJCLElBQU1JLFlBQVlKLEtBQUtLLFNBQXZCOztBQUVBRCxVQUFVRSxNQUFWLEdBQW1CLFVBQVNDLE9BQVQsRUFBa0JDLFNBQWxCLEVBQTZCQyxRQUE3QixFQUFzQzs7QUFFeEQsS0FBS0QsY0FBY0UsU0FBZixJQUE2QixPQUFPRixTQUFQLEtBQXFCLFFBQXRELEVBQStEO0FBQzlERyxVQUFRQyxJQUFSLENBQWEsMENBQWI7QUFDQTtBQUNBOztBQUVELEtBQUtILGFBQWFDLFNBQWQsSUFBNEIsT0FBT0QsUUFBUCxL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ekI7QUFDQSxHQUZELE1BRU07QUFDTE8sY0FBV0ksU0FBWCxFQUFzQlgsT0FBdEI7QUFDQTtBQUNEO0FBQ0Q7O0FBR00sU0FBU1EsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DUCxRQUFuQyxFQUE0QztBQUNsRCxLQUFHTyxTQUFTLElBQVQsSUFBaUJBLFNBQVNuRCxTQUE3QixFQUF3QztBQUN2QyxNQUFNb0QsV0FBV0QsS0FBS3hCLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBakI7QUFDQTtBQUNBdUIsc0JBQW9CRSxRQUFwQixFQUE4QlIsUUFBOUI7QUFDQUEsV0FBU1UsSUFBVCxDQUFjVixTQUFTLE1BQVQsQ0FBZCxFQUFnQ08sS0FBS2hELEdBQXJDO0FBQ0EsTUFBTWtELFlBQVlGLEtBQUt4QixVQUFMLENBQWdCLENBQWhCLENBQWxCO0FBQ0E7QUFDQXVCLHNCQUFvQkcsU0FBcEIsRUFBOEJULFFBQTlCO0FBRUE7QUFDRCxDIiwiZmlsZSI6ImxpYi90cmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0cmVlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRyZWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widHJlZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2E3OGMzZmFkMzUxZTBmNmZiZjQiLCJpbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9rZXltYXAgPSB7fTtcblx0XHR0aGlzLnJvb3Q7XG5cdFx0dGhpcy5yb290S2V5O1xuXHR9XG59XG5cbmNvbnN0IHByb3RvVHlwZSA9IFRyZWUucHJvdG90eXBlO1xuXG5wcm90b1R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24oZWxlbWVudCwgZWxlbWVudElkLCBwYXJlbnRJZCl7XG5cblx0aWYoIChlbGVtZW50SWQgIT09IHVuZGVmaW5lZCkgJiYgdHlwZW9mIGVsZW1lbnRJZCAhPT0gJ3N0cmluZycpe1xuXHRcdGNvbnNvbGUud2FybignZWxlbWVudElkIGNhbiBiZSBvbmx5IHN0cmluZyBpZiBwcm92aWRlZCcpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmKCAocGFyZW50SWQgIT09IHVuZGVmaW5lZCkgJiYgdHlwZW9mIHBhcmVudElkICE9PSAnc3RyaW5nJyl7XG5cdFx0Y29uc29sZS53YXJuKCdwYXJlbnRJZCBjYW4gYmUgb25seSBzdHJpbmcgaWYgcHJvdmlkZWQnKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZighdGhpcy5yb290KXsgLy8gZmlyc3QgaW5zZXJ0IHdpbGwgYmVjb21lIHRoZSByb290Tm9kZVxuXHRcdHRoaXMucm9vdCA9IG5ldyBOb2RlKGVsZW1lbnQsIGVsZW1lbnRJZCk7XG5cdFx0dGhpcy5yb290S2V5ID0gdGhpcy5yb290LmtleTtcblx0fVxuXG5cdC8vIGNoZWNrIGlmIGdpdmVuIHBhcmVudCBleGlzdFxuXHRsZXQgcGFyZW50Tm9kZSA9IG51bGw7XG5cdGlmKHBhcmVudElkKXtcblx0XHRwYXJlbnROb2RlID0gdGhpcy5fa2V5bWFwW3BhcmVudElkXTtcblx0XHRpZighcGFyZW50Tm9kZSl7XG5cdFx0XHRjb25zb2xlLndhcm4oJ3BhcmVudCBub3QgZm91bmQ6ICcsIHBhcmVudElkKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cGFyZW50SWQgPSB0aGlzLnJvb3RLZXk7XG5cdFx0cGFyZW50Tm9kZSA9IHRoaXMucm9vdDtcblx0fVxuXG5cdGxldCBjaGlsZE5vZGUgPSBudWxsO1xuXHRpZihlbGVtZW50SWQpe1xuXHRcdGNoaWxkTm9kZSA9IHRoaXMuX2tleW1hcFtlbGVtZW50SWRdO1xuXHRcdGlmKCFjaGlsZE5vZGUpe1xuXHRcdFx0Y2hpbGROb2RlID0gbmV3IE5vZGUoZWxlbWVudCwgZWxlbWVudElkKTtcblx0XHRcdHBhcmVudE5vZGUuYWRkKGNoaWxkTm9kZSwgcGFyZW50Tm9kZS5rZXkpO1xuXHRcdFx0dGhpcy5fa2V5bWFwW2NoaWxkTm9kZS5rZXldID0gY2hpbGROb2RlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjaGlsZE5vZGUua2V5O1xufTtcblxuVHJlZS5wcm90b3R5cGUuZ2V0Q2hpbGRyZW5Gb3JOb2RlID0gZnVuY3Rpb24gKGtleSl7XG5cdGNvbnN0IHBhcmVudE5vZGUgPSAgdGhpcy5fa2V5bWFwW2tleV07XG5cdGlmKHBhcmVudE5vZGUpe1xuXHRcdHJldHVybiBwYXJlbnROb2RlLmdldENoaWxkcmVuKClcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblRyZWUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChrZXkpe1xuXHRyZXR1cm4gdGhpcy5fa2V5bWFwW2tleV07XG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KXtcblx0Y29uc3Qgbm9kZVRvUmVtb3ZlID0gdGhpcy5fa2V5bWFwW2tleV07XG5cdGNvbnN0IHBhcmVudEtleSA9IG5vZGVUb1JlbW92ZS5wYXJlbnRLZXk7XG5cdGlmKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkKXtcblx0XHRjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fa2V5bWFwW3BhcmVudEtleV07XG5cdFx0cGFyZW50Tm9kZS5yZW1vdmUoa2V5KTtcblx0fVxuXHRkZWxldGUgdGhpcy5fa2V5bWFwW2tleV07XG59O1xuXG5cblRyZWUucHJvdG90eXBlLmFzSlNPTiA9IGZ1bmN0aW9uIChpZ25vcmVLZXkpe1xuXHRyZXR1cm4gdGhpcy5yb290LmFzSnNvbihpZ25vcmVLZXkpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9pbmRleC5qcyIsImltcG9ydCBMZWFmIGZyb20gJy4vbGVhZic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUgZXh0ZW5kcyBMZWFmIHtcblx0Y29uc3RydWN0b3IodmFsdWUsIGtleSwgbWF4Q2hpbGRyZW4pe1xuXHRcdHN1cGVyKHZhbHVlLCBrZXkpO1xuXHRcdHRoaXMuY2hpbGRDb3VudCA9IDA7XG5cdFx0dGhpcy5tYXhDaGlsZHJlbjtcblx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZTtcblx0XHRpZihtYXhDaGlsZHJlbiAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdHRoaXMubWF4Q2hpbGRyZW4gPSBtYXhDaGlsZHJlbjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXTtcblx0XHRcdHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gdGhpcy5tYXhDaGlsZHJlbjtcblx0XHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID0gJ2FycmF5Jztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jaGlsZHJlbiA9IHt9O1xuXHRcdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPSAnb2JqZWN0Jztcblx0XHR9XG5cblx0XHR0aGlzLnBhcmVudEtleTtcblx0fVxufVxuXG5Ob2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2hpbGQsIHBhcmVudEtleSwgaW5kZXgpe1xuXHRpZihjaGlsZC5rZXkpe1xuXHRcdGlmKHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID09PSAnYXJyYXknICYmIGluZGV4ICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0dGhpcy5jaGlsZHJlbltpbmRleF0gPSBjaGlsZFxuXHRcdH0gZWxzZSBpZiAodGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPT09ICdvYmplY3QnKXtcblx0XHRcdGlmKCF0aGlzLmNoaWxkcmVuW2NoaWxkLmtleV0pe1xuXHRcdFx0XHRpZih0aGlzLm1heENoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tYXhDaGlsZHJlbiA9PT0gdGhpcy5jaGlsZENvdW50KXtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiTWF4IENoaWxkcmVuIGNvdW50IHJlYWNoZWRcIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2hpbGQucGFyZW50S2V5ID0gcGFyZW50S2V5O1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRyZW5bY2hpbGQua2V5XSA9IGNoaWxkO1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRDb3VudCA9IHRoaXMuY2hpbGRDb3VudCArIDE7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5lcnJvcihcIktleSBpcyByZXF1aXJlZCB0byBhZGQgY2hpbGQgdG8gbm9kZVwiKVxuXHR9XG5cbn07XG5cbk5vZGUucHJvdG90eXBlLmhhc0NoaWxkQXQgPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5jaGlsZHJlbltrZXldKXtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2Vcbn07XG5cbk5vZGUucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbihrZXkpe1xuXHRyZXR1cm4gdGhpcy5jaGlsZHJlbltrZXldO1xufTtcblxuTm9kZS5wcm90b3R5cGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5jaGlsZHJlbjtcbn07XG5cbk5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLmNoaWxkcmVuW2tleV0pe1xuXHRcdGRlbGV0ZSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0dGhpcy5jaGlsZENvdW50ID0gdGhpcy5jaGlsZENvdW50IC0gMTtcblx0fVxufTtcblxuTm9kZS5wcm90b3R5cGUuYXNKc29uID0gZnVuY3Rpb24gKGlnbm9yZUtleSl7XG5cdGNvbnN0IGpzb24gPSB7XG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0Y2hpbGRyZW46IG51bGxcblx0fTtcblx0aWYoIWlnbm9yZUtleSl7XG5cdFx0anNvbi5rZXkgPSB0aGlzLmtleVxuXHR9XG5cblx0Y29uc3QgY29udGFpbnNDaGlsZHJlbiA9ICh0aGlzLmNoaWxkcmVuKSAmJiAoT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbikubGVuZ3RoID4gMCk7XG5cdGlmKGNvbnRhaW5zQ2hpbGRyZW4pe1xuXHRcdGpzb24uY2hpbGRyZW4gPSBbXTtcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbik7XG5cdFx0Zm9yKGxldCBpID0gMCA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRjb25zdCBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0XHRpZihjaGlsZE5vZGUpe1xuXHRcdFx0XHRjb25zdCBjaGlsZEFzSnNvbiA9IGNoaWxkTm9kZS5hc0pzb24oaWdub3JlS2V5KTtcblx0XHRcdFx0anNvbi5jaGlsZHJlbltrZXldID0gY2hpbGRBc0pzb247XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblx0cmV0dXJuIGpzb247XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9Ob2RlLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi90cmVlJztcbmltcG9ydCBCaW5hcnlUcmVlIGZyb20gJy4vYmluYXJ5VHJlZSc7XG5cbmV4cG9ydCB7XG5cdFRyZWUsXG5cdEJpbmFyeVRyZWVcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFmIHtcblx0Y29uc3RydWN0b3IodmFsdWUsIGtleSl7XG5cdFx0dGhpcy5rZXkgPSBrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcblx0XHR0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlXG5cdH1cblxuXHRzZXQgdmFsdWUobmV3VmFsdWUpe1xuXHRcdHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9sZWFmLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi8uLi90cmVlJztcbmltcG9ydCBOb2RlIGZyb20gJy4vLi4vdHJlZS9Ob2RlJztcbmltcG9ydCB7aW5zZXJ0Tm9kZSwgaW5PcmRlclRyYXZlcnNlTm9kZX0gZnJvbSAnLi9oZWxwZXInO1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5hcnlUcmVlIGV4dGVuZHMgVHJlZSB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoJ251bWJlcicsIGZhbHNlKTtcblx0fVxuXG5cdGFzSlNPTigpe1xuXHRcdHJldHVybiBzdXBlci5hc0pTT04odHJ1ZSk7XG5cdH1cbn1cblxuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0Y29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLHZhbHVlLCAyKTtcblx0aWYodGhpcy5yb290KXtcblx0XHRpbnNlcnROb2RlKHRoaXMucm9vdCxuZXdOb2RlKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJvb3QgPSBuZXdOb2RlO1xuXHR9XG59O1xuXG5cbi8vIHZpc2l0cyBhbGwgdGhlIG5vZGVzIGluIGFzY2VuZGluZyBvcmRlclxuQmluYXJ5VHJlZS5wcm90b3R5cGUuaW5PcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRpbk9yZGVyVHJhdmVyc2VOb2RlKHRoaXMucm9vdCxjYWxsYmFjayk7XG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5wcmVPcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oKXtcblxufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUucG9zdE9yZGVyVHJhdmVyc2UgPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JpbmFyeVRyZWUvaW5kZXguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5zZXJ0Tm9kZShub2RlLCBuZXdOb2RlKXtcblx0aWYobmV3Tm9kZS5rZXkgPCBub2RlLmtleSl7XG5cdFx0Y29uc3QgbGVmdE5vZGUgPSBub2RlLmdldENoaWxkQXQoMCk7XG5cdFx0aWYobGVmdE5vZGUgPT09IG51bGwgfHwgbGVmdE5vZGUgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRub2RlLmFkZChuZXdOb2RlLCBudWxsLCAwKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKGxlZnROb2RlLCBuZXdOb2RlKTtcblx0XHR9XG5cdH0gZWxzZXtcblx0XHRjb25zdCByaWdodE5vZGUgPSBub2RlLmdldENoaWxkQXQoMSk7XG5cdFx0aWYocmlnaHROb2RlID09PSBudWxsIHx8IHJpZ2h0Tm9kZSA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdG5vZGUuYWRkKG5ld05vZGUsIG51bGwgLCAxKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKHJpZ2h0Tm9kZSwgbmV3Tm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluT3JkZXJUcmF2ZXJzZU5vZGUobm9kZSwgY2FsbGJhY2spe1xuXHRpZihub2RlICE9PSBudWxsICYmIG5vZGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdGNvbnN0IGxlZnROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDApO1xuXHRcdC8vIHJlY3Vyc2l2ZWx5IGNhbGwgYWxsIGxlZnQgdG8gZ2V0IHRoZSBtaW4gdmFsdWVcblx0XHRpbk9yZGVyVHJhdmVyc2VOb2RlKGxlZnROb2RlLCBjYWxsYmFjayk7XG5cdFx0Y2FsbGJhY2suY2FsbChjYWxsYmFja1sndGhpcyddLCBub2RlLmtleSk7XG5cdFx0Y29uc3QgcmlnaHROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDEpO1xuXHRcdC8vYWZ0ZXIgY2FsbGluZyBhbGwgbGVmdCBuXG5cdFx0aW5PcmRlclRyYXZlcnNlTm9kZShyaWdodE5vZGUsY2FsbGJhY2spO1xuXG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmluYXJ5VHJlZS9oZWxwZXIuanMiXSwic291cmNlUm9vdCI6IiJ9