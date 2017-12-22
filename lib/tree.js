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
	this.root;
	this.rootKey;
};

exports.default = Tree;


Tree.prototype.insert = function (childValue) {
	var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.rootKey;
	var childKey = arguments[2];
	var callback = arguments[3];

	if (childKey !== undefined && typeof childKey !== 'string') {
		console.warn('childKey can be only string if provided');
		return;
	}

	if (parentKey !== undefined && typeof parentKey !== 'string') {
		console.warn('parentKey can be only string if provided');
		return;
	}

	if (this._keymap) {
		var parentNode = null;
		if (parentKey !== undefined) {
			parentNode = this._keymap[parentKey];
			if (!parentNode) {
				console.warn('parent not found: ', parentKey);
				return;
			}
		}

		var newChild = new _Node2.default(childValue, childKey);
		if (!this.root) {
			// first insert will become the rootNode
			this.root = newChild;
			this.rootKey = newChild.key;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjYTZhNGYyYjliNzZhNGQ3MzBlNyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyJdLCJuYW1lcyI6WyJUcmVlIiwiY2FjaGUiLCJfa2V5bWFwIiwicm9vdCIsInJvb3RLZXkiLCJwcm90b3R5cGUiLCJpbnNlcnQiLCJjaGlsZFZhbHVlIiwicGFyZW50S2V5IiwiY2hpbGRLZXkiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImNvbnNvbGUiLCJ3YXJuIiwicGFyZW50Tm9kZSIsIm5ld0NoaWxkIiwia2V5IiwiYWRkIiwiYXBwbHkiLCJnZXRDaGlsZHJlbkZvck5vZGUiLCJnZXRDaGlsZHJlbiIsInNlYXJjaCIsInJlbW92ZSIsIm5vZGVUb1JlbW92ZSIsImFzSlNPTiIsImlnbm9yZUtleSIsImFzSnNvbiIsIk5vZGUiLCJ2YWx1ZSIsIm1heENoaWxkcmVuIiwiY2hpbGRDb3VudCIsImNoaWxkcmVuRGF0YVN0cnVjdHVyZSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2hpbGQiLCJpbmRleCIsImVycm9yIiwiaGFzQ2hpbGRBdCIsImdldENoaWxkQXQiLCJqc29uIiwiY29udGFpbnNDaGlsZHJlbiIsIk9iamVjdCIsImtleXMiLCJpIiwiY2hpbGROb2RlIiwiY2hpbGRBc0pzb24iLCJCaW5hcnlUcmVlIiwiTGVhZiIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsIl92YWx1ZSIsIm5ld1ZhbHVlIiwibmV3Tm9kZSIsImluT3JkZXJUcmF2ZXJzZSIsInByZU9yZGVyVHJhdmVyc2UiLCJwb3N0T3JkZXJUcmF2ZXJzZSIsIm1pbiIsIm1heCIsImluc2VydE5vZGUiLCJpbk9yZGVyVHJhdmVyc2VOb2RlIiwibm9kZSIsImxlZnROb2RlIiwicmlnaHROb2RlIiwiY2FsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7O0lBR3FCQSxJLEdBQ3BCLGdCQUEyQjtBQUFBLEtBQWZDLEtBQWUsdUVBQVAsSUFBTzs7QUFBQTs7QUFDMUIsTUFBS0MsT0FBTCxHQUFlRCxRQUFRLEVBQVIsR0FBYSxJQUE1QjtBQUNBLE1BQUtFLElBQUw7QUFDQSxNQUFLQyxPQUFMO0FBQ0EsQzs7a0JBTG1CSixJOzs7QUFRckJBLEtBQUtLLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixVQUFXQyxVQUFYLEVBQW1FO0FBQUEsS0FBNUNDLFNBQTRDLHVFQUFoQyxLQUFLSixPQUEyQjtBQUFBLEtBQWxCSyxRQUFrQjtBQUFBLEtBQVRDLFFBQVM7O0FBQzFGLEtBQUtELGFBQWFFLFNBQWQsSUFBNEIsT0FBT0YsUUFBUCxLQUFvQixRQUFwRCxFQUE2RDtB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RUFBcUJULE9BQXJCO0FBQ0E7QUFDRCxFQVBELE1BT007QUFDTCxNQUFNVSxZQUFZRixLQUFLeEIsVUFBTCxDQUFnQixDQUFoQixDQUFsQjtBQUNBLE1BQUcwQixjQUFjLElBQWQsSUFBc0JBLGNBQWNyRCxTQUF2QyxFQUFpRDtBQUNoRG1ELFFBQUs3QyxHQUFMLENBQVNxQyxPQUFULEVBQWtCLElBQWxCLEVBQXlCLENBQXpCO0FBQ0EsR0FGRCxNQUVNO0FBQ0xNLGNBQVdJLFNBQVgsRUFBc0JWLE9BQXRCO0FBQ0E7QUFDRDtBQUNEOztBQUdNLFNBQVNPLG1CQUFULENBQTZCQyxJQUE3QixFQUFtQ3BELFFBQW5DLEVBQTRDO0FBQ2xELEtBQUdvRCxTQUFTLElBQVQsSUFBaUJBLFNBQVNuRCxTQUE3QixFQUF3QztBQUN2QyxNQUFNb0QsV0FBV0QsS0FBS3hCLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBakI7QUFDQTtBQUNBdUIsc0JBQW9CRSxRQUFwQixFQUE4QnJELFFBQTlCO0FBQ0FBLFdBQVN1RCxJQUFULENBQWN2RCxTQUFTLE1BQVQsQ0FBZCxFQUFnQ29ELEtBQUs5QyxHQUFyQztBQUNBLE1BQU1nRCxZQUFZRixLQUFLeEIsVUFBTCxDQUFnQixDQUFoQixDQUFsQjtBQUNBO0FBQ0F1QixzQkFBb0JHLFNBQXBCLEVBQThCdEQsUUFBOUI7QUFFQTtBQUNELEMiLCJmaWxlIjoibGliL3RyZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInRyZWVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widHJlZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0cmVlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjYTZhNGYyYjliNzZhNGQ3MzBlNyIsImltcG9ydCBOb2RlIGZyb20gJy4vTm9kZSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZSB7XG5cdGNvbnN0cnVjdG9yKGNhY2hlID0gdHJ1ZSApIHtcblx0XHR0aGlzLl9rZXltYXAgPSBjYWNoZSA/IHt9IDogbnVsbDtcblx0XHR0aGlzLnJvb3Q7XG5cdFx0dGhpcy5yb290S2V5O1xuXHR9XG59XG5cblRyZWUucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uICggY2hpbGRWYWx1ZSwgcGFyZW50S2V5ID0gdGhpcy5yb290S2V5LCBjaGlsZEtleSxjYWxsYmFjayl7XG5cdGlmKCAoY2hpbGRLZXkgIT09IHVuZGVmaW5lZCkgJiYgdHlwZW9mIGNoaWxkS2V5ICE9PSAnc3RyaW5nJyl7XG5cdFx0Y29uc29sZS53YXJuKCdjaGlsZEtleSBjYW4gYmUgb25seSBzdHJpbmcgaWYgcHJvdmlkZWQnKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiggKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2YgcGFyZW50S2V5ICE9PSAnc3RyaW5nJyl7XG5cdFx0Y29uc29sZS53YXJuKCdwYXJlbnRLZXkgY2FuIGJlIG9ubHkgc3RyaW5nIGlmIHByb3ZpZGVkJyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYodGhpcy5fa2V5bWFwKXtcblx0XHRsZXQgcGFyZW50Tm9kZSA9IG51bGw7XG5cdFx0aWYocGFyZW50S2V5ICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0cGFyZW50Tm9kZSA9IHRoaXMuX2tleW1hcFtwYXJlbnRLZXldO1xuXHRcdFx0aWYoIXBhcmVudE5vZGUpe1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ3BhcmVudCBub3QgZm91bmQ6ICcsIHBhcmVudEtleSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBuZXdDaGlsZCA9IG5ldyBOb2RlKGNoaWxkVmFsdWUsIGNoaWxkS2V5KTtcblx0XHRpZighdGhpcy5yb290KXsgLy8gZmlyc3QgaW5zZXJ0IHdpbGwgYmVjb21lIHRoZSByb290Tm9kZVxuXHRcdFx0dGhpcy5yb290ID0gbmV3Q2hpbGQ7XG5cdFx0XHR0aGlzLnJvb3RLZXkgPSBuZXdDaGlsZC5rZXk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcmVudE5vZGUuYWRkKG5ld0NoaWxkLCBwYXJlbnROb2RlLmtleSk7XG5cdFx0fVxuXHRcdHRoaXMuX2tleW1hcFtuZXdDaGlsZC5rZXldID0gbmV3Q2hpbGQ7XG5cdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tbJ3RoaXMnXSk7XG5cdFx0cmV0dXJuIG5ld0NoaWxkLmtleTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblRyZWUucHJvdG90eXBlLmdldENoaWxkcmVuRm9yTm9kZSA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdGNvbnN0IHBhcmVudE5vZGUgPSAgdGhpcy5fa2V5bWFwW2tleV07XG5cdFx0aWYocGFyZW50Tm9kZSl7XG5cdFx0XHRyZXR1cm4gcGFyZW50Tm9kZS5nZXRDaGlsZHJlbigpXG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVHJlZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGtleSl7XG5cdGlmKHRoaXMuX2tleW1hcCl7XG5cdFx0cmV0dXJuIHRoaXMuX2tleW1hcFtrZXldO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2spe1xuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdGNvbnN0IG5vZGVUb1JlbW92ZSA9IHRoaXMuX2tleW1hcFtrZXldO1xuXHRcdGNvbnN0IHBhcmVudEtleSA9IG5vZGVUb1JlbW92ZS5wYXJlbnRLZXk7XG5cdFx0aWYocGFyZW50S2V5ICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Y29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX2tleW1hcFtwYXJlbnRLZXldO1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmUoa2V5KTtcblx0XHR9XG5cdFx0ZGVsZXRlIHRoaXMuX2tleW1hcFtrZXldO1xuXHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrWyd0aGlzJ10pO1xuXHR9XG59O1xuXG5cblRyZWUucHJvdG90eXBlLmFzSlNPTiA9IGZ1bmN0aW9uIChpZ25vcmVLZXkpe1xuXHRyZXR1cm4gdGhpcy5yb290LmFzSnNvbihpZ25vcmVLZXkpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9pbmRleC5qcyIsImltcG9ydCBMZWFmIGZyb20gJy4vbGVhZic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUgZXh0ZW5kcyBMZWFmIHtcblx0Y29uc3RydWN0b3IodmFsdWUsIGtleSwgbWF4Q2hpbGRyZW4pe1xuXHRcdHN1cGVyKHZhbHVlLCBrZXkpO1xuXHRcdHRoaXMuY2hpbGRDb3VudCA9IDA7XG5cdFx0dGhpcy5tYXhDaGlsZHJlbjtcblx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZTtcblx0XHRpZihtYXhDaGlsZHJlbiAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdHRoaXMubWF4Q2hpbGRyZW4gPSBtYXhDaGlsZHJlbjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXTtcblx0XHRcdHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gdGhpcy5tYXhDaGlsZHJlbjtcblx0XHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID0gJ2FycmF5Jztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jaGlsZHJlbiA9IHt9O1xuXHRcdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPSAnb2JqZWN0Jztcblx0XHR9XG5cblx0XHR0aGlzLnBhcmVudEtleTtcblx0fVxufVxuXG5Ob2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2hpbGQsIHBhcmVudEtleSwgaW5kZXgpe1xuXHRpZihjaGlsZC5rZXkpe1xuXHRcdGlmKHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID09PSAnYXJyYXknICYmIGluZGV4ICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0dGhpcy5jaGlsZHJlbltpbmRleF0gPSBjaGlsZFxuXHRcdH0gZWxzZSBpZiAodGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPT09ICdvYmplY3QnKXtcblx0XHRcdGlmKCF0aGlzLmNoaWxkcmVuW2NoaWxkLmtleV0pe1xuXHRcdFx0XHRpZih0aGlzLm1heENoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tYXhDaGlsZHJlbiA9PT0gdGhpcy5jaGlsZENvdW50KXtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiTWF4IENoaWxkcmVuIGNvdW50IHJlYWNoZWRcIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2hpbGQucGFyZW50S2V5ID0gcGFyZW50S2V5O1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRyZW5bY2hpbGQua2V5XSA9IGNoaWxkO1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRDb3VudCA9IHRoaXMuY2hpbGRDb3VudCArIDE7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5lcnJvcihcIktleSBpcyByZXF1aXJlZCB0byBhZGQgY2hpbGQgdG8gbm9kZVwiKVxuXHR9XG5cbn07XG5cbk5vZGUucHJvdG90eXBlLmhhc0NoaWxkQXQgPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5jaGlsZHJlbltrZXldKXtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2Vcbn07XG5cbk5vZGUucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbihrZXkpe1xuXHRyZXR1cm4gdGhpcy5jaGlsZHJlbltrZXldO1xufTtcblxuTm9kZS5wcm90b3R5cGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5jaGlsZHJlbjtcbn07XG5cbk5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLmNoaWxkcmVuW2tleV0pe1xuXHRcdGRlbGV0ZSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0dGhpcy5jaGlsZENvdW50ID0gdGhpcy5jaGlsZENvdW50IC0gMTtcblx0fVxufTtcblxuTm9kZS5wcm90b3R5cGUuYXNKc29uID0gZnVuY3Rpb24gKGlnbm9yZUtleSl7XG5cdGNvbnN0IGpzb24gPSB7XG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0Y2hpbGRyZW46IG51bGxcblx0fTtcblx0aWYoIWlnbm9yZUtleSl7XG5cdFx0anNvbi5rZXkgPSB0aGlzLmtleVxuXHR9XG5cblx0Y29uc3QgY29udGFpbnNDaGlsZHJlbiA9ICh0aGlzLmNoaWxkcmVuKSAmJiAoT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbikubGVuZ3RoID4gMCk7XG5cdGlmKGNvbnRhaW5zQ2hpbGRyZW4pe1xuXHRcdGpzb24uY2hpbGRyZW4gPSBbXTtcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbik7XG5cdFx0Zm9yKGxldCBpID0gMCA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRjb25zdCBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0XHRpZihjaGlsZE5vZGUpe1xuXHRcdFx0XHRjb25zdCBjaGlsZEFzSnNvbiA9IGNoaWxkTm9kZS5hc0pzb24oaWdub3JlS2V5KTtcblx0XHRcdFx0anNvbi5jaGlsZHJlbltrZXldID0gY2hpbGRBc0pzb247XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblx0cmV0dXJuIGpzb247XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9Ob2RlLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi90cmVlJztcbmltcG9ydCBCaW5hcnlUcmVlIGZyb20gJy4vYmluYXJ5VHJlZSc7XG5cbmV4cG9ydCB7XG5cdFRyZWUsXG5cdEJpbmFyeVRyZWVcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFmIHtcblx0Y29uc3RydWN0b3IodmFsdWUsIGtleSl7XG5cdFx0dGhpcy5rZXkgPSBrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcblx0XHR0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlXG5cdH1cblxuXHRzZXQgdmFsdWUobmV3VmFsdWUpe1xuXHRcdHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9sZWFmLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi8uLi90cmVlJztcbmltcG9ydCBOb2RlIGZyb20gJy4vLi4vdHJlZS9Ob2RlJztcbmltcG9ydCB7aW5zZXJ0Tm9kZSwgaW5PcmRlclRyYXZlcnNlTm9kZX0gZnJvbSAnLi9oZWxwZXInO1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5hcnlUcmVlIGV4dGVuZHMgVHJlZSB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoJ251bWJlcicsIGZhbHNlKTtcblx0fVxuXG5cdGFzSlNPTigpe1xuXHRcdHJldHVybiBzdXBlci5hc0pTT04odHJ1ZSk7XG5cdH1cbn1cblxuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0Y29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLHZhbHVlLCAyKTtcblx0aWYodGhpcy5yb290KXtcblx0XHRpbnNlcnROb2RlKHRoaXMucm9vdCxuZXdOb2RlKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJvb3QgPSBuZXdOb2RlO1xuXHR9XG59O1xuXG5cbi8vIHZpc2l0cyBhbGwgdGhlIG5vZGVzIGluIGFzY2VuZGluZyBvcmRlclxuQmluYXJ5VHJlZS5wcm90b3R5cGUuaW5PcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRpbk9yZGVyVHJhdmVyc2VOb2RlKHRoaXMucm9vdCxjYWxsYmFjayk7XG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5wcmVPcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oKXtcblxufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUucG9zdE9yZGVyVHJhdmVyc2UgPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JpbmFyeVRyZWUvaW5kZXguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5zZXJ0Tm9kZShub2RlLCBuZXdOb2RlKXtcblx0aWYobmV3Tm9kZS5rZXkgPCBub2RlLmtleSl7XG5cdFx0Y29uc3QgbGVmdE5vZGUgPSBub2RlLmdldENoaWxkQXQoMCk7XG5cdFx0aWYobGVmdE5vZGUgPT09IG51bGwgfHwgbGVmdE5vZGUgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRub2RlLmFkZChuZXdOb2RlLCBudWxsLCAwKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKGxlZnROb2RlLCBuZXdOb2RlKTtcblx0XHR9XG5cdH0gZWxzZXtcblx0XHRjb25zdCByaWdodE5vZGUgPSBub2RlLmdldENoaWxkQXQoMSk7XG5cdFx0aWYocmlnaHROb2RlID09PSBudWxsIHx8IHJpZ2h0Tm9kZSA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdG5vZGUuYWRkKG5ld05vZGUsIG51bGwgLCAxKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKHJpZ2h0Tm9kZSwgbmV3Tm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluT3JkZXJUcmF2ZXJzZU5vZGUobm9kZSwgY2FsbGJhY2spe1xuXHRpZihub2RlICE9PSBudWxsICYmIG5vZGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdGNvbnN0IGxlZnROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDApO1xuXHRcdC8vIHJlY3Vyc2l2ZWx5IGNhbGwgYWxsIGxlZnQgdG8gZ2V0IHRoZSBtaW4gdmFsdWVcblx0XHRpbk9yZGVyVHJhdmVyc2VOb2RlKGxlZnROb2RlLCBjYWxsYmFjayk7XG5cdFx0Y2FsbGJhY2suY2FsbChjYWxsYmFja1sndGhpcyddLCBub2RlLmtleSk7XG5cdFx0Y29uc3QgcmlnaHROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDEpO1xuXHRcdC8vYWZ0ZXIgY2FsbGluZyBhbGwgbGVmdCBuXG5cdFx0aW5PcmRlclRyYXZlcnNlTm9kZShyaWdodE5vZGUsY2FsbGJhY2spO1xuXG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmluYXJ5VHJlZS9oZWxwZXIuanMiXSwic291cmNlUm9vdCI6IiJ9