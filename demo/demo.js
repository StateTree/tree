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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YTc4YzNmYWQzNTFlMGY2ZmJmNCIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9kZW1vL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRyZWUiLCJfa2V5bWFwIiwicm9vdCIsInJvb3RLZXkiLCJwcm90b1R5cGUiLCJwcm90b3R5cGUiLCJpbnNlcnQiLCJlbGVtZW50IiwiZWxlbWVudElkIiwicGFyZW50SWQiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwid2FybiIsImtleSIsInBhcmVudE5vZGUiLCJjaGlsZE5vZGUiLCJhZGQiLCJnZXRDaGlsZHJlbkZvck5vZGUiLCJnZXRDaGlsZHJlbiIsInNlYXJjaCIsInJlbW92ZSIsIm5vZGVUb1JlbW92ZSIsInBhcmVudEtleSIsImFzSlNPTiIsImlnbm9yZUtleSIsImFzSnNvbiIsIk5vZGUiLCJ2YWx1ZSIsIm1heENoaWxkcmVuIiwiY2hpbGRDb3VudCIsImNoaWxkcmVuRGF0YVN0cnVjdHVyZSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2hpbGQiLCJpbmRleCIsImVycm9yIiwiaGFzQ2hpbGRBdCIsImdldENoaWxkQXQiLCJqc29uIiwiY29udGFpbnNDaGlsZHJlbiIsIk9iamVjdCIsImtleXMiLCJpIiwiY2hpbGRBc0pzb24iLCJCaW5hcnlUcmVlIiwiTGVhZiIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsIl92YWx1ZSIsIm5ld1ZhbHVlIiwibmV3Tm9kZSIsImluT3JkZXJUcmF2ZXJzZSIsImNhbGxiYWNrIiwicHJlT3JkZXJUcmF2ZXJzZSIsInBvc3RPcmRlclRyYXZlcnNlIiwibWluIiwibWF4IiwiaW5zZXJ0Tm9kZSIsImluT3JkZXJUcmF2ZXJzZU5vZGUiLCJub2RlIiwibGVmdE5vZGUiLCJyaWdodE5vZGUiLCJjYWxsIiwiYnQiLCJwcmludE5vZGUiLCJ2YWwiLCJsb2ciLCJ0cmVlIiwia2V5MSIsImFzSnNvblRyZWUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7OztJQUdxQkEsSSxHQUNwQixnQkFBYztBQUFBOztBQUNiLE1BQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsTUFBS0MsSUFBTDtBQUNBLE1BQUtDLE9BQUw7QUFDQSxDOztrQkFMbUJILEk7OztBQVFyQixJQUFNSSxZQUFZSixLQUFLSyxTQUF2Qjs7QUFFQUQsVUFBVUUsTUFBVixHQUFtQixVQUFTQyxPQUFULEVBQWtCQyxTQUFsQixFQUE2QkMsUUFBN0IsRUFBc0M7O0FBRXhELEtBQUtELGNBQWNFLFNBQWYsSUFBNkIsT0FBT0YsU0FBUCxLQUFxQixRQUF0RCxF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QVksQ0FBWixDQUFOOztBQUVBK0QsS0FBSy9ELE1BQUwsQ0FBWSxDQUFaLEVBQWVPLEdBQWY7QUFDQXlELE9BQUtELEtBQUsvRCxNQUFMLENBQVksQ0FBWixFQUFlTyxHQUFmLENBQUw7QUFDQXdELEtBQUsvRCxNQUFMLENBQVksQ0FBWixFQUFlTyxHQUFmO0FBQ0F3RCxLQUFLakQsTUFBTCxDQUFZa0QsSUFBWjs7QUFFQSxJQUFNQyxhQUFhRixLQUFLOUMsTUFBTCxFQUFuQjs7QUFFQVosUUFBUXlELEdBQVIsQ0FBWUcsVUFBWixFIiwiZmlsZSI6ImRlbW8vZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidHJlZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0cmVlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRyZWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdhNzhjM2ZhZDM1MWUwZjZmYmY0IiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fa2V5bWFwID0ge307XG5cdFx0dGhpcy5yb290O1xuXHRcdHRoaXMucm9vdEtleTtcblx0fVxufVxuXG5jb25zdCBwcm90b1R5cGUgPSBUcmVlLnByb3RvdHlwZTtcblxucHJvdG9UeXBlLmluc2VydCA9IGZ1bmN0aW9uKGVsZW1lbnQsIGVsZW1lbnRJZCwgcGFyZW50SWQpe1xuXG5cdGlmKCAoZWxlbWVudElkICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBlbGVtZW50SWQgIT09ICdzdHJpbmcnKXtcblx0XHRjb25zb2xlLndhcm4oJ2VsZW1lbnRJZCBjYW4gYmUgb25seSBzdHJpbmcgaWYgcHJvdmlkZWQnKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiggKHBhcmVudElkICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBwYXJlbnRJZCAhPT0gJ3N0cmluZycpe1xuXHRcdGNvbnNvbGUud2FybigncGFyZW50SWQgY2FuIGJlIG9ubHkgc3RyaW5nIGlmIHByb3ZpZGVkJyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYoIXRoaXMucm9vdCl7IC8vIGZpcnN0IGluc2VydCB3aWxsIGJlY29tZSB0aGUgcm9vdE5vZGVcblx0XHR0aGlzLnJvb3QgPSBuZXcgTm9kZShlbGVtZW50LCBlbGVtZW50SWQpO1xuXHRcdHRoaXMucm9vdEtleSA9IHRoaXMucm9vdC5rZXk7XG5cdH1cblxuXHQvLyBjaGVjayBpZiBnaXZlbiBwYXJlbnQgZXhpc3Rcblx0bGV0IHBhcmVudE5vZGUgPSBudWxsO1xuXHRpZihwYXJlbnRJZCl7XG5cdFx0cGFyZW50Tm9kZSA9IHRoaXMuX2tleW1hcFtwYXJlbnRJZF07XG5cdFx0aWYoIXBhcmVudE5vZGUpe1xuXHRcdFx0Y29uc29sZS53YXJuKCdwYXJlbnQgbm90IGZvdW5kOiAnLCBwYXJlbnRJZCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHBhcmVudElkID0gdGhpcy5yb290S2V5O1xuXHRcdHBhcmVudE5vZGUgPSB0aGlzLnJvb3Q7XG5cdH1cblxuXHRsZXQgY2hpbGROb2RlID0gbnVsbDtcblx0aWYoZWxlbWVudElkKXtcblx0XHRjaGlsZE5vZGUgPSB0aGlzLl9rZXltYXBbZWxlbWVudElkXTtcblx0XHRpZighY2hpbGROb2RlKXtcblx0XHRcdGNoaWxkTm9kZSA9IG5ldyBOb2RlKGVsZW1lbnQsIGVsZW1lbnRJZCk7XG5cdFx0XHRwYXJlbnROb2RlLmFkZChjaGlsZE5vZGUsIHBhcmVudE5vZGUua2V5KTtcblx0XHRcdHRoaXMuX2tleW1hcFtjaGlsZE5vZGUua2V5XSA9IGNoaWxkTm9kZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY2hpbGROb2RlLmtleTtcbn07XG5cblRyZWUucHJvdG90eXBlLmdldENoaWxkcmVuRm9yTm9kZSA9IGZ1bmN0aW9uIChrZXkpe1xuXHRjb25zdCBwYXJlbnROb2RlID0gIHRoaXMuX2tleW1hcFtrZXldO1xuXHRpZihwYXJlbnROb2RlKXtcblx0XHRyZXR1cm4gcGFyZW50Tm9kZS5nZXRDaGlsZHJlbigpXG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoa2V5KXtcblx0cmV0dXJuIHRoaXMuX2tleW1hcFtrZXldO1xufTtcblxuVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSl7XG5cdGNvbnN0IG5vZGVUb1JlbW92ZSA9IHRoaXMuX2tleW1hcFtrZXldO1xuXHRjb25zdCBwYXJlbnRLZXkgPSBub2RlVG9SZW1vdmUucGFyZW50S2V5O1xuXHRpZihwYXJlbnRLZXkgIT09IHVuZGVmaW5lZCl7XG5cdFx0Y29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX2tleW1hcFtwYXJlbnRLZXldO1xuXHRcdHBhcmVudE5vZGUucmVtb3ZlKGtleSk7XG5cdH1cblx0ZGVsZXRlIHRoaXMuX2tleW1hcFtrZXldO1xufTtcblxuXG5UcmVlLnByb3RvdHlwZS5hc0pTT04gPSBmdW5jdGlvbiAoaWdub3JlS2V5KXtcblx0cmV0dXJuIHRoaXMucm9vdC5hc0pzb24oaWdub3JlS2V5KTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvaW5kZXguanMiLCJpbXBvcnQgTGVhZiBmcm9tICcuL2xlYWYnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIGV4dGVuZHMgTGVhZiB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlLCBrZXksIG1heENoaWxkcmVuKXtcblx0XHRzdXBlcih2YWx1ZSwga2V5KTtcblx0XHR0aGlzLmNoaWxkQ291bnQgPSAwO1xuXHRcdHRoaXMubWF4Q2hpbGRyZW47XG5cdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmU7XG5cdFx0aWYobWF4Q2hpbGRyZW4gIT09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aGlzLm1heENoaWxkcmVuID0gbWF4Q2hpbGRyZW47XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW107XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IHRoaXMubWF4Q2hpbGRyZW47XG5cdFx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9ICdhcnJheSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSB7fTtcblx0XHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID0gJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0dGhpcy5wYXJlbnRLZXk7XG5cdH1cbn1cblxuTm9kZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNoaWxkLCBwYXJlbnRLZXksIGluZGV4KXtcblx0aWYoY2hpbGQua2V5KXtcblx0XHRpZih0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9PT0gJ2FycmF5JyAmJiBpbmRleCAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdHRoaXMuY2hpbGRyZW5baW5kZXhdID0gY2hpbGRcblx0XHR9IGVsc2UgaWYgKHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRpZighdGhpcy5jaGlsZHJlbltjaGlsZC5rZXldKXtcblx0XHRcdFx0aWYodGhpcy5tYXhDaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubWF4Q2hpbGRyZW4gPT09IHRoaXMuY2hpbGRDb3VudCl7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIk1heCBDaGlsZHJlbiBjb3VudCByZWFjaGVkXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkLnBhcmVudEtleSA9IHBhcmVudEtleTtcblx0XHRcdFx0XHR0aGlzLmNoaWxkcmVuW2NoaWxkLmtleV0gPSBjaGlsZDtcblx0XHRcdFx0XHR0aGlzLmNoaWxkQ291bnQgPSB0aGlzLmNoaWxkQ291bnQgKyAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUuZXJyb3IoXCJLZXkgaXMgcmVxdWlyZWQgdG8gYWRkIGNoaWxkIHRvIG5vZGVcIilcblx0fVxuXG59O1xuXG5Ob2RlLnByb3RvdHlwZS5oYXNDaGlsZEF0ID0gZnVuY3Rpb24gKGtleSl7XG5cdGlmKHRoaXMuY2hpbGRyZW5ba2V5XSl7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlXG59O1xuXG5Ob2RlLnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24oa2V5KXtcblx0cmV0dXJuIHRoaXMuY2hpbGRyZW5ba2V5XTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuY2hpbGRyZW47XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5jaGlsZHJlbltrZXldKXtcblx0XHRkZWxldGUgdGhpcy5jaGlsZHJlbltrZXldO1xuXHRcdHRoaXMuY2hpbGRDb3VudCA9IHRoaXMuY2hpbGRDb3VudCAtIDE7XG5cdH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmFzSnNvbiA9IGZ1bmN0aW9uIChpZ25vcmVLZXkpe1xuXHRjb25zdCBqc29uID0ge1xuXHRcdHZhbHVlOiB0aGlzLnZhbHVlLFxuXHRcdGNoaWxkcmVuOiBudWxsXG5cdH07XG5cdGlmKCFpZ25vcmVLZXkpe1xuXHRcdGpzb24ua2V5ID0gdGhpcy5rZXlcblx0fVxuXG5cdGNvbnN0IGNvbnRhaW5zQ2hpbGRyZW4gPSAodGhpcy5jaGlsZHJlbikgJiYgKE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pLmxlbmd0aCA+IDApO1xuXHRpZihjb250YWluc0NoaWxkcmVuKXtcblx0XHRqc29uLmNoaWxkcmVuID0gW107XG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pO1xuXHRcdGZvcihsZXQgaSA9IDAgOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0Y29uc3QgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlbltrZXldO1xuXHRcdFx0aWYoY2hpbGROb2RlKXtcblx0XHRcdFx0Y29uc3QgY2hpbGRBc0pzb24gPSBjaGlsZE5vZGUuYXNKc29uKGlnbm9yZUtleSk7XG5cdFx0XHRcdGpzb24uY2hpbGRyZW5ba2V5XSA9IGNoaWxkQXNKc29uO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cdHJldHVybiBqc29uO1xufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvTm9kZS5qcyIsImltcG9ydCBUcmVlIGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgQmluYXJ5VHJlZSBmcm9tICcuL2JpbmFyeVRyZWUnO1xuXG5leHBvcnQge1xuXHRUcmVlLFxuXHRCaW5hcnlUcmVlXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2luZGV4LmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVhZiB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlLCBrZXkpe1xuXHRcdHRoaXMua2V5ID0ga2V5ICE9PSB1bmRlZmluZWQgPyBrZXkgOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XG5cdFx0dGhpcy5fdmFsdWUgPSB2YWx1ZTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLl92YWx1ZVxuXHR9XG5cblx0c2V0IHZhbHVlKG5ld1ZhbHVlKXtcblx0XHR0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvbGVhZi5qcyIsImltcG9ydCBUcmVlIGZyb20gJy4vLi4vdHJlZSc7XG5pbXBvcnQgTm9kZSBmcm9tICcuLy4uL3RyZWUvTm9kZSc7XG5pbXBvcnQge2luc2VydE5vZGUsIGluT3JkZXJUcmF2ZXJzZU5vZGV9IGZyb20gJy4vaGVscGVyJztcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmluYXJ5VHJlZSBleHRlbmRzIFRyZWUge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCdudW1iZXInLCBmYWxzZSk7XG5cdH1cblxuXHRhc0pTT04oKXtcblx0XHRyZXR1cm4gc3VwZXIuYXNKU09OKHRydWUpO1xuXHR9XG59XG5cblxuQmluYXJ5VHJlZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSx2YWx1ZSwgMik7XG5cdGlmKHRoaXMucm9vdCl7XG5cdFx0aW5zZXJ0Tm9kZSh0aGlzLnJvb3QsbmV3Tm9kZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5yb290ID0gbmV3Tm9kZTtcblx0fVxufTtcblxuXG4vLyB2aXNpdHMgYWxsIHRoZSBub2RlcyBpbiBhc2NlbmRpbmcgb3JkZXJcbkJpbmFyeVRyZWUucHJvdG90eXBlLmluT3JkZXJUcmF2ZXJzZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcblx0aW5PcmRlclRyYXZlcnNlTm9kZSh0aGlzLnJvb3QsY2FsbGJhY2spO1xufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUucHJlT3JkZXJUcmF2ZXJzZSA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnBvc3RPcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oKXtcblxufTtcblxuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5taW4gPSBmdW5jdGlvbigpe1xuXG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5tYXggPSBmdW5jdGlvbigpe1xuXG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGluc2VydE5vZGUobm9kZSwgbmV3Tm9kZSl7XG5cdGlmKG5ld05vZGUua2V5IDwgbm9kZS5rZXkpe1xuXHRcdGNvbnN0IGxlZnROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDApO1xuXHRcdGlmKGxlZnROb2RlID09PSBudWxsIHx8IGxlZnROb2RlID09PSB1bmRlZmluZWQpe1xuXHRcdFx0bm9kZS5hZGQobmV3Tm9kZSwgbnVsbCwgMCk7XG5cdFx0fSBlbHNle1xuXHRcdFx0aW5zZXJ0Tm9kZShsZWZ0Tm9kZSwgbmV3Tm9kZSk7XG5cdFx0fVxuXHR9IGVsc2V7XG5cdFx0Y29uc3QgcmlnaHROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDEpO1xuXHRcdGlmKHJpZ2h0Tm9kZSA9PT0gbnVsbCB8fCByaWdodE5vZGUgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRub2RlLmFkZChuZXdOb2RlLCBudWxsICwgMSk7XG5cdFx0fSBlbHNle1xuXHRcdFx0aW5zZXJ0Tm9kZShyaWdodE5vZGUsIG5ld05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbk9yZGVyVHJhdmVyc2VOb2RlKG5vZGUsIGNhbGxiYWNrKXtcblx0aWYobm9kZSAhPT0gbnVsbCAmJiBub2RlICE9PSB1bmRlZmluZWQgKXtcblx0XHRjb25zdCBsZWZ0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgwKTtcblx0XHQvLyByZWN1cnNpdmVseSBjYWxsIGFsbCBsZWZ0IHRvIGdldCB0aGUgbWluIHZhbHVlXG5cdFx0aW5PcmRlclRyYXZlcnNlTm9kZShsZWZ0Tm9kZSwgY2FsbGJhY2spO1xuXHRcdGNhbGxiYWNrLmNhbGwoY2FsbGJhY2tbJ3RoaXMnXSwgbm9kZS5rZXkpO1xuXHRcdGNvbnN0IHJpZ2h0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgxKTtcblx0XHQvL2FmdGVyIGNhbGxpbmcgYWxsIGxlZnQgblxuXHRcdGluT3JkZXJUcmF2ZXJzZU5vZGUocmlnaHROb2RlLGNhbGxiYWNrKTtcblxuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JpbmFyeVRyZWUvaGVscGVyLmpzIiwiaW1wb3J0IHtUcmVlLCBCaW5hcnlUcmVlfSBmcm9tICcuLy4uL2xpYic7XG5cbnZhciBidCA9IG5ldyBCaW5hcnlUcmVlKCk7XG5idC5pbnNlcnQoNik7XG5idC5pbnNlcnQoNCk7XG5idC5pbnNlcnQoNyk7XG5idC5pbnNlcnQoMik7XG5cblxuZnVuY3Rpb24gcHJpbnROb2RlKHZhbCl7XG5cdGNvbnNvbGUubG9nKHZhbClcbn1cblxuYnQuaW5PcmRlclRyYXZlcnNlKHByaW50Tm9kZSk7XG5cbmNvbnN0IGFzSnNvbiA9IGJ0LmFzSlNPTigpO1xuXG5jb25zb2xlLmxvZyhhc0pzb24pO1xuXG52YXIgdHJlZSA9IG5ldyBUcmVlKCk7XG5sZXQga2V5LCBrZXkxO1xua2V5ID0gdHJlZS5pbnNlcnQoNCk7XG5cbnRyZWUuaW5zZXJ0KDIsIGtleSk7XG5rZXkxPXRyZWUuaW5zZXJ0KDYsIGtleSk7XG50cmVlLmluc2VydCg3LCBrZXkpO1xudHJlZS5yZW1vdmUoa2V5MSk7XG5cbmNvbnN0IGFzSnNvblRyZWUgPSB0cmVlLmFzSlNPTigpO1xuXG5jb25zb2xlLmxvZyhhc0pzb25UcmVlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZW1vL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==