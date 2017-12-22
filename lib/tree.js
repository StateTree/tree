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
	var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	_classCallCheck(this, Tree);

	this._keymap = cache ? {} : null;
	this.root = null;
};

exports.default = Tree;


Tree.prototype.insert = function (childValue, parentKey, childKey, callback) {
	if (childKey !== undefined && typeof childKey !== 'string') {
		console.warn('childKey can be only string if provioded');
		return;
	}

	if (this._keymap) {
		var parentNode = null;
		if (parentKey !== undefined) {
			if (typeof parentKey !== 'string') {
				console.warn('parentKey can be only string if provided');
				return;
			}
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxZWFkNDYxYzk0YzZlMzAwODRhOCIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyJdLCJuYW1lcyI6WyJUcmVlIiwiY2FjaGUiLCJfa2V5bWFwIiwicm9vdCIsInByb3RvdHlwZSIsImluc2VydCIsImNoaWxkVmFsdWUiLCJwYXJlbnRLZXkiLCJjaGlsZEtleSIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiY29uc29sZSIsIndhcm4iLCJwYXJlbnROb2RlIiwibmV3Q2hpbGQiLCJhZGQiLCJrZXkiLCJhcHBseSIsImdldENoaWxkcmVuRm9yTm9kZSIsImdldENoaWxkcmVuIiwic2VhcmNoIiwicmVtb3ZlIiwibm9kZVRvUmVtb3ZlIiwiYXNKU09OIiwiaWdub3JlS2V5IiwiYXNKc29uIiwiTm9kZSIsInZhbHVlIiwibWF4Q2hpbGRyZW4iLCJjaGlsZENvdW50IiwiY2hpbGRyZW5EYXRhU3RydWN0dXJlIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGlsZCIsImluZGV4IiwiZXJyb3IiLCJoYXNDaGlsZEF0IiwiZ2V0Q2hpbGRBdCIsImpzb24iLCJjb250YWluc0NoaWxkcmVuIiwiT2JqZWN0Iiwia2V5cyIsImkiLCJjaGlsZE5vZGUiLCJjaGlsZEFzSnNvbiIsIkJpbmFyeVRyZWUiLCJMZWFmIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwiX3ZhbHVlIiwibmV3VmFsdWUiLCJuZXdOb2RlIiwiaW5PcmRlclRyYXZlcnNlIiwicHJlT3JkZXJUcmF2ZXJzZSIsInBvc3RPcmRlclRyYXZlcnNlIiwibWluIiwibWF4IiwiaW5zZXJ0Tm9kZSIsImluT3JkZXJUcmF2ZXJzZU5vZGUiLCJub2RlIiwibGVmdE5vZGUiLCJyaWdodE5vZGUiLCJjYWxsIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFHcUJBLEksR0FDcEIsZ0JBQTJCO0FBQUEsS0FBZkMsS0FBZSx1RUFBUCxJQUFPOztBQUFBOztBQUMxQixNQUFLQyxPQUFMLEdBQWVELFFBQVEsRUFBUixHQUFhLElBQTVCO0FBQ0EsTUFBS0UsSUFBTCxHQUFZLElBQVo7QUFDQSxDOztrQkFKbUJILEk7OztBQU9yQkEsS0FBS0ksU0FBTCxDQUFlQyxNQUFmLEdBQXdCLFVBQVdDLFVBQVgsRUFBdUJDLFNBQXZCLEVBQWtDQyxRQUFsQyxFQUEyQ0MsUUFBM0MsRUFBb0Q7QUFDM0UsS0FBS0QsYUFBYUUsU0FBZCxJQUE0QixPQUFPRixRQUFQLEtBQW9CLFFBQXBELEVBQTZEO0FBQzVERyxVQUFRQyxJQUFSLENBQWEsMENBQWI7QUFDQTtBQUNBOztBQUVELEtBQUcs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QUFkLElBQXNCQSxjQUFjckQsU0FBdkMsRUFBaUQ7QUFDaERtRCxRQUFLOUMsR0FBTCxDQUFTc0MsT0FBVCxFQUFrQixJQUFsQixFQUF5QixDQUF6QjtBQUNBLEdBRkQsTUFFTTtBQUNMTSxjQUFXSSxTQUFYLEVBQXNCVixPQUF0QjtBQUNBO0FBQ0Q7QUFDRDs7QUFHTSxTQUFTTyxtQkFBVCxDQUE2QkMsSUFBN0IsRUFBbUNwRCxRQUFuQyxFQUE0QztBQUNsRCxLQUFHb0QsU0FBUyxJQUFULElBQWlCQSxTQUFTbkQsU0FBN0IsRUFBd0M7QUFDdkMsTUFBTW9ELFdBQVdELEtBQUt4QixVQUFMLENBQWdCLENBQWhCLENBQWpCO0FBQ0E7QUFDQXVCLHNCQUFvQkUsUUFBcEIsRUFBOEJyRCxRQUE5QjtBQUNBQSxXQUFTdUQsSUFBVCxDQUFjdkQsU0FBUyxNQUFULENBQWQsRUFBZ0NvRCxLQUFLN0MsR0FBckM7QUFDQSxNQUFNK0MsWUFBWUYsS0FBS3hCLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBbEI7QUFDQTtBQUNBdUIsc0JBQW9CRyxTQUFwQixFQUE4QnRELFFBQTlCO0FBRUE7QUFDRCxDIiwiZmlsZSI6ImxpYi90cmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0cmVlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRyZWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widHJlZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWVhZDQ2MWM5NGM2ZTMwMDg0YTgiLCJpbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xuXHRjb25zdHJ1Y3RvcihjYWNoZSA9IHRydWUgKSB7XG5cdFx0dGhpcy5fa2V5bWFwID0gY2FjaGUgPyB7fSA6IG51bGw7XG5cdFx0dGhpcy5yb290ID0gbnVsbDtcblx0fVxufVxuXG5UcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoIGNoaWxkVmFsdWUsIHBhcmVudEtleSwgY2hpbGRLZXksY2FsbGJhY2spe1xuXHRpZiggKGNoaWxkS2V5ICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBjaGlsZEtleSAhPT0gJ3N0cmluZycpe1xuXHRcdGNvbnNvbGUud2FybignY2hpbGRLZXkgY2FuIGJlIG9ubHkgc3RyaW5nIGlmIHByb3Zpb2RlZCcpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmKHRoaXMuX2tleW1hcCl7XG5cdFx0bGV0IHBhcmVudE5vZGUgPSBudWxsO1xuXHRcdGlmKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdGlmKCB0eXBlb2YgcGFyZW50S2V5ICE9PSAnc3RyaW5nJyl7XG5cdFx0XHRcdGNvbnNvbGUud2FybigncGFyZW50S2V5IGNhbiBiZSBvbmx5IHN0cmluZyBpZiBwcm92aWRlZCcpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRwYXJlbnROb2RlID0gdGhpcy5fa2V5bWFwW3BhcmVudEtleV07XG5cdFx0XHRpZighcGFyZW50Tm9kZSAmJiB0aGlzLnJvb3Qpe1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ3BhcmVudCBub3QgZm91bmQ6ICcsIHBhcmVudEtleSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBuZXdDaGlsZCA9IG5ldyBOb2RlKGNoaWxkVmFsdWUsIGNoaWxkS2V5KTtcblx0XHRpZighdGhpcy5yb290KXtcblx0XHRcdHRoaXMucm9vdCA9IG5ld0NoaWxkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXJlbnROb2RlLmFkZChuZXdDaGlsZCwgcGFyZW50Tm9kZS5rZXkpO1xuXHRcdH1cblx0XHR0aGlzLl9rZXltYXBbbmV3Q2hpbGQua2V5XSA9IG5ld0NoaWxkO1xuXHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrWyd0aGlzJ10pO1xuXHRcdHJldHVybiBuZXdDaGlsZC5rZXk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5nZXRDaGlsZHJlbkZvck5vZGUgPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5fa2V5bWFwKXtcblx0XHRjb25zdCBwYXJlbnROb2RlID0gIHRoaXMuX2tleW1hcFtrZXldO1xuXHRcdGlmKHBhcmVudE5vZGUpe1xuXHRcdFx0cmV0dXJuIHBhcmVudE5vZGUuZ2V0Q2hpbGRyZW4oKVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblRyZWUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdHJldHVybiB0aGlzLl9rZXltYXBba2V5XTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblRyZWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrKXtcblx0aWYodGhpcy5fa2V5bWFwKXtcblx0XHRjb25zdCBub2RlVG9SZW1vdmUgPSB0aGlzLl9rZXltYXBba2V5XTtcblx0XHRjb25zdCBwYXJlbnRLZXkgPSBub2RlVG9SZW1vdmUucGFyZW50S2V5O1xuXHRcdGlmKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9rZXltYXBbcGFyZW50S2V5XTtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlKGtleSk7XG5cdFx0fVxuXHRcdGRlbGV0ZSB0aGlzLl9rZXltYXBba2V5XTtcblx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5hcHBseShjYWxsYmFja1sndGhpcyddKTtcblx0fVxufTtcblxuXG5UcmVlLnByb3RvdHlwZS5hc0pTT04gPSBmdW5jdGlvbiAoaWdub3JlS2V5KXtcblx0cmV0dXJuIHRoaXMucm9vdC5hc0pzb24oaWdub3JlS2V5KTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvaW5kZXguanMiLCJpbXBvcnQgTGVhZiBmcm9tICcuL2xlYWYnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIGV4dGVuZHMgTGVhZiB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlLCBrZXksIG1heENoaWxkcmVuKXtcblx0XHRzdXBlcih2YWx1ZSwga2V5KTtcblx0XHR0aGlzLmNoaWxkQ291bnQgPSAwO1xuXHRcdHRoaXMubWF4Q2hpbGRyZW47XG5cdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmU7XG5cdFx0aWYobWF4Q2hpbGRyZW4gIT09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aGlzLm1heENoaWxkcmVuID0gbWF4Q2hpbGRyZW47XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW107XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IHRoaXMubWF4Q2hpbGRyZW47XG5cdFx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9ICdhcnJheSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSB7fTtcblx0XHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID0gJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0dGhpcy5wYXJlbnRLZXk7XG5cdH1cbn1cblxuTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNoaWxkLCBwYXJlbnRLZXksIGluZGV4KXtcblx0aWYoY2hpbGQua2V5KXtcblx0XHRpZih0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9PT0gJ2FycmF5JyAmJiBpbmRleCAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdHRoaXMuY2hpbGRyZW5baW5kZXhdID0gY2hpbGRcblx0XHR9IGVsc2UgaWYgKHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRpZighdGhpcy5jaGlsZHJlbltjaGlsZC5rZXldKXtcblx0XHRcdFx0aWYodGhpcy5tYXhDaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubWF4Q2hpbGRyZW4gPT09IHRoaXMuY2hpbGRDb3VudCl7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk1heCBDaGlsZHJlbiBjb3VudCByZWFjaGVkXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkLnBhcmVudEtleSA9IHBhcmVudEtleTtcblx0XHRcdFx0XHR0aGlzLmNoaWxkcmVuW2NoaWxkLmtleV0gPSBjaGlsZDtcblx0XHRcdFx0XHR0aGlzLmNoaWxkQ291bnQgPSB0aGlzLmNoaWxkQ291bnQgKyAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUuZXJyb3IoXCJLZXkgaXMgcmVxdWlyZWQgdG8gYWRkIGNoaWxkIHRvIG5vZGVcIilcblx0fVxuXG59O1xuXG5Ob2RlLnByb3RvdHlwZS5oYXNDaGlsZEF0ID0gZnVuY3Rpb24gKGtleSl7XG5cdGlmKHRoaXMuY2hpbGRyZW5ba2V5XSl7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlXG59O1xuXG5Ob2RlLnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24oa2V5KXtcblx0cmV0dXJuIHRoaXMuY2hpbGRyZW5ba2V5XTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuY2hpbGRyZW47XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5jaGlsZHJlbltrZXldKXtcblx0XHRkZWxldGUgdGhpcy5jaGlsZHJlbltrZXldO1xuXHRcdHRoaXMuY2hpbGRDb3VudCA9IHRoaXMuY2hpbGRDb3VudCAtIDE7XG5cdH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmFzSnNvbiA9IGZ1bmN0aW9uIChpZ25vcmVLZXkpe1xuXHRjb25zdCBqc29uID0ge1xuXHRcdHZhbHVlOiB0aGlzLnZhbHVlLFxuXHRcdGNoaWxkcmVuOiBudWxsXG5cdH07XG5cdGlmKCFpZ25vcmVLZXkpe1xuXHRcdGpzb24ua2V5ID0gdGhpcy5rZXlcblx0fVxuXG5cdGNvbnN0IGNvbnRhaW5zQ2hpbGRyZW4gPSAodGhpcy5jaGlsZHJlbikgJiYgKE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pLmxlbmd0aCA+IDApO1xuXHRpZihjb250YWluc0NoaWxkcmVuKXtcblx0XHRqc29uLmNoaWxkcmVuID0gW107XG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pO1xuXHRcdGZvcihsZXQgaSA9IDAgOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0Y29uc3QgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlbltrZXldO1xuXHRcdFx0aWYoY2hpbGROb2RlKXtcblx0XHRcdFx0Y29uc3QgY2hpbGRBc0pzb24gPSBjaGlsZE5vZGUuYXNKc29uKGlnbm9yZUtleSk7XG5cdFx0XHRcdGpzb24uY2hpbGRyZW5ba2V5XSA9IGNoaWxkQXNKc29uO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cdHJldHVybiBqc29uO1xufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvTm9kZS5qcyIsImltcG9ydCBUcmVlIGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgQmluYXJ5VHJlZSBmcm9tICcuL2JpbmFyeVRyZWUnO1xuXG5leHBvcnQge1xuXHRUcmVlLFxuXHRCaW5hcnlUcmVlXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2luZGV4LmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVhZiB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlLCBrZXkpe1xuXHRcdHRoaXMua2V5ID0ga2V5ICE9PSB1bmRlZmluZWQgPyBrZXkgOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XG5cdFx0dGhpcy5fdmFsdWUgPSB2YWx1ZTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLl92YWx1ZVxuXHR9XG5cblx0c2V0IHZhbHVlKG5ld1ZhbHVlKXtcblx0XHR0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvbGVhZi5qcyIsImltcG9ydCBUcmVlIGZyb20gJy4vLi4vdHJlZSc7XG5pbXBvcnQgTm9kZSBmcm9tICcuLy4uL3RyZWUvTm9kZSc7XG5pbXBvcnQge2luc2VydE5vZGUsIGluT3JkZXJUcmF2ZXJzZU5vZGV9IGZyb20gJy4vaGVscGVyJztcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmluYXJ5VHJlZSBleHRlbmRzIFRyZWUge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCdudW1iZXInLCBmYWxzZSk7XG5cdH1cblxuXHRhc0pTT04oKXtcblx0XHRyZXR1cm4gc3VwZXIuYXNKU09OKHRydWUpO1xuXHR9XG59XG5cblxuQmluYXJ5VHJlZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSx2YWx1ZSwgMik7XG5cdGlmKHRoaXMucm9vdCl7XG5cdFx0aW5zZXJ0Tm9kZSh0aGlzLnJvb3QsbmV3Tm9kZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5yb290ID0gbmV3Tm9kZTtcblx0fVxufTtcblxuXG4vLyB2aXNpdHMgYWxsIHRoZSBub2RlcyBpbiBhc2NlbmRpbmcgb3JkZXJcbkJpbmFyeVRyZWUucHJvdG90eXBlLmluT3JkZXJUcmF2ZXJzZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcblx0aW5PcmRlclRyYXZlcnNlTm9kZSh0aGlzLnJvb3QsY2FsbGJhY2spO1xufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUucHJlT3JkZXJUcmF2ZXJzZSA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnBvc3RPcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oKXtcblxufTtcblxuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5taW4gPSBmdW5jdGlvbigpe1xuXG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5tYXggPSBmdW5jdGlvbigpe1xuXG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGluc2VydE5vZGUobm9kZSwgbmV3Tm9kZSl7XG5cdGlmKG5ld05vZGUua2V5IDwgbm9kZS5rZXkpe1xuXHRcdGNvbnN0IGxlZnROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDApO1xuXHRcdGlmKGxlZnROb2RlID09PSBudWxsIHx8IGxlZnROb2RlID09PSB1bmRlZmluZWQpe1xuXHRcdFx0bm9kZS5hZGQobmV3Tm9kZSwgbnVsbCwgMCk7XG5cdFx0fSBlbHNle1xuXHRcdFx0aW5zZXJ0Tm9kZShsZWZ0Tm9kZSwgbmV3Tm9kZSk7XG5cdFx0fVxuXHR9IGVsc2V7XG5cdFx0Y29uc3QgcmlnaHROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDEpO1xuXHRcdGlmKHJpZ2h0Tm9kZSA9PT0gbnVsbCB8fCByaWdodE5vZGUgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRub2RlLmFkZChuZXdOb2RlLCBudWxsICwgMSk7XG5cdFx0fSBlbHNle1xuXHRcdFx0aW5zZXJ0Tm9kZShyaWdodE5vZGUsIG5ld05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbk9yZGVyVHJhdmVyc2VOb2RlKG5vZGUsIGNhbGxiYWNrKXtcblx0aWYobm9kZSAhPT0gbnVsbCAmJiBub2RlICE9PSB1bmRlZmluZWQgKXtcblx0XHRjb25zdCBsZWZ0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgwKTtcblx0XHQvLyByZWN1cnNpdmVseSBjYWxsIGFsbCBsZWZ0IHRvIGdldCB0aGUgbWluIHZhbHVlXG5cdFx0aW5PcmRlclRyYXZlcnNlTm9kZShsZWZ0Tm9kZSwgY2FsbGJhY2spO1xuXHRcdGNhbGxiYWNrLmNhbGwoY2FsbGJhY2tbJ3RoaXMnXSwgbm9kZS5rZXkpO1xuXHRcdGNvbnN0IHJpZ2h0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgxKTtcblx0XHQvL2FmdGVyIGNhbGxpbmcgYWxsIGxlZnQgblxuXHRcdGluT3JkZXJUcmF2ZXJzZU5vZGUocmlnaHROb2RlLGNhbGxiYWNrKTtcblxuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JpbmFyeVRyZWUvaGVscGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==