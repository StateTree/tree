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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkYTI4ZWZjNDAxZGJjZjgyMjVhZCIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyJdLCJuYW1lcyI6WyJUcmVlIiwiY2FjaGUiLCJfa2V5bWFwIiwicm9vdCIsInByb3RvdHlwZSIsImluc2VydCIsImNoaWxkVmFsdWUiLCJwYXJlbnRLZXkiLCJjaGlsZEtleSIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiY29uc29sZSIsIndhcm4iLCJwYXJlbnROb2RlIiwibmV3Q2hpbGQiLCJhZGQiLCJrZXkiLCJhcHBseSIsInNlYXJjaCIsInJlbW92ZSIsIm5vZGVUb1JlbW92ZSIsImFzSlNPTiIsImlnbm9yZUtleSIsImFzSnNvbiIsIk5vZGUiLCJ2YWx1ZSIsIm1heENoaWxkcmVuIiwiY2hpbGRDb3VudCIsImNoaWxkcmVuRGF0YVN0cnVjdHVyZSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY2hpbGQiLCJpbmRleCIsImVycm9yIiwiaGFzQ2hpbGRBdCIsImdldENoaWxkQXQiLCJqc29uIiwiY29udGFpbnNDaGlsZHJlbiIsIk9iamVjdCIsImtleXMiLCJpIiwiY2hpbGROb2RlIiwiY2hpbGRBc0pzb24iLCJCaW5hcnlUcmVlIiwiTGVhZiIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsIl92YWx1ZSIsIm5ld1ZhbHVlIiwibmV3Tm9kZSIsImluT3JkZXJUcmF2ZXJzZSIsInByZU9yZGVyVHJhdmVyc2UiLCJwb3N0T3JkZXJUcmF2ZXJzZSIsIm1pbiIsIm1heCIsImluc2VydE5vZGUiLCJpbk9yZGVyVHJhdmVyc2VOb2RlIiwibm9kZSIsImxlZnROb2RlIiwicmlnaHROb2RlIiwiY2FsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7Ozs7O0lBR3FCQSxJLEdBQ3BCLGdCQUEyQjtBQUFBLEtBQWZDLEtBQWUsdUVBQVAsSUFBTzs7QUFBQTs7QUFDMUIsTUFBS0MsT0FBTCxHQUFlRCxRQUFRLEVBQVIsR0FBYSxJQUE1QjtBQUNBLE1BQUtFLElBQUwsR0FBWSxJQUFaO0FBQ0EsQzs7a0JBSm1CSCxJOzs7QUFPckJBLEtBQUtJLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixVQUFXQyxVQUFYLEVBQXVCQyxTQUF2QixFQUFrQ0MsUUFBbEMsRUFBMkNDLFFBQTNDLEVBQW9EOztBQUUzRSxLQUFLRixjQUFjRyxTQUFmLElBQTZCLE9BQU9ILFNBQVAsS0FBcUIsUUFBdEQsRUFBK0Q7QUFDOURJLFVBQVFDLElBQVIsQ0FBYSwwQ0FBYjtBQUNBO0FBQ0E7O0FBRUQsS0FBS0osYUFBYUUsU0FBZCxJQUE0QixPQUFPRixRQUFQLEtBQW9C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QUFkLEVBQWdDa0QsS0FBSzNDLEdBQXJDO0FBQ0EsTUFBTTZDLFlBQVlGLEtBQUt4QixVQUFMLENBQWdCLENBQWhCLENBQWxCO0FBQ0E7QUFDQXVCLHNCQUFvQkcsU0FBcEIsRUFBOEJwRCxRQUE5QjtBQUVBO0FBQ0QsQyIsImZpbGUiOiJsaWIvdHJlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidHJlZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0cmVlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRyZWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGRhMjhlZmM0MDFkYmNmODIyNWFkIiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlIHtcblx0Y29uc3RydWN0b3IoY2FjaGUgPSB0cnVlICkge1xuXHRcdHRoaXMuX2tleW1hcCA9IGNhY2hlID8ge30gOiBudWxsO1xuXHRcdHRoaXMucm9vdCA9IG51bGw7XG5cdH1cbn1cblxuVHJlZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKCBjaGlsZFZhbHVlLCBwYXJlbnRLZXksIGNoaWxkS2V5LGNhbGxiYWNrKXtcblxuXHRpZiggKHBhcmVudEtleSAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2YgcGFyZW50S2V5ICE9PSAnc3RyaW5nJyl7XG5cdFx0Y29uc29sZS53YXJuKCdwYXJlbnRLZXkgY2FuIGJlIG9ubHkgc3RyaW5nIGlmIHByb3ZpZGVkJyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYoIChjaGlsZEtleSAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2YgY2hpbGRLZXkgIT09ICdzdHJpbmcnKXtcblx0XHRjb25zb2xlLndhcm4oJ2NoaWxkS2V5IGNhbiBiZSBvbmx5IHN0cmluZyBpZiBwcm92aW9kZWQnKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdGNvbnN0IHBhcmVudE5vZGUgPSB0aGlzLl9rZXltYXBbcGFyZW50S2V5XTtcblx0XHRpZighcGFyZW50Tm9kZSAmJiB0aGlzLnJvb3Qpe1xuXHRcdFx0Y29uc29sZS53YXJuKCdwYXJlbnQgbm90IGZvdW5kOiAnLCBwYXJlbnRLZXkpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IG5ld0NoaWxkID0gbmV3IE5vZGUoY2hpbGRWYWx1ZSwgY2hpbGRLZXkpO1xuXHRcdGlmKCF0aGlzLnJvb3Qpe1xuXHRcdFx0dGhpcy5yb290ID0gbmV3Q2hpbGQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcmVudE5vZGUuYWRkKG5ld0NoaWxkLCBwYXJlbnROb2RlLmtleSk7XG5cdFx0fVxuXHRcdHRoaXMuX2tleW1hcFtuZXdDaGlsZC5rZXldID0gbmV3Q2hpbGQ7XG5cdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tbJ3RoaXMnXSk7XG5cdFx0cmV0dXJuIG5ld0NoaWxkLmtleTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblxuXG5UcmVlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5fa2V5bWFwKXtcblx0XHRyZXR1cm4gdGhpcy5fa2V5bWFwW2tleV07XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjayl7XG5cdGlmKHRoaXMuX2tleW1hcCl7XG5cdFx0Y29uc3Qgbm9kZVRvUmVtb3ZlID0gdGhpcy5fa2V5bWFwW2tleV07XG5cdFx0Y29uc3QgcGFyZW50S2V5ID0gbm9kZVRvUmVtb3ZlLnBhcmVudEtleTtcblx0XHRpZihwYXJlbnRLZXkgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fa2V5bWFwW3BhcmVudEtleV07XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZShrZXkpO1xuXHRcdH1cblx0XHRkZWxldGUgdGhpcy5fa2V5bWFwW2tleV07XG5cdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tbJ3RoaXMnXSk7XG5cdH1cbn07XG5cblxuVHJlZS5wcm90b3R5cGUuYXNKU09OID0gZnVuY3Rpb24gKGlnbm9yZUtleSl7XG5cdHJldHVybiB0aGlzLnJvb3QuYXNKc29uKGlnbm9yZUtleSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi90cmVlL2luZGV4LmpzIiwiaW1wb3J0IExlYWYgZnJvbSAnLi9sZWFmJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZSBleHRlbmRzIExlYWYge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSwga2V5LCBtYXhDaGlsZHJlbil7XG5cdFx0c3VwZXIodmFsdWUsIGtleSk7XG5cdFx0dGhpcy5jaGlsZENvdW50ID0gMDtcblx0XHR0aGlzLm1heENoaWxkcmVuO1xuXHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlO1xuXHRcdGlmKG1heENoaWxkcmVuICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0dGhpcy5tYXhDaGlsZHJlbiA9IG1heENoaWxkcmVuO1xuXHRcdFx0dGhpcy5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5sZW5ndGggPSB0aGlzLm1heENoaWxkcmVuO1xuXHRcdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPSAnYXJyYXknO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0ge307XG5cdFx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9ICdvYmplY3QnO1xuXHRcdH1cblxuXHRcdHRoaXMucGFyZW50S2V5O1xuXHR9XG59XG5cbk5vZGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50S2V5LCBpbmRleCl7XG5cdGlmKGNoaWxkLmtleSl7XG5cdFx0aWYodGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPT09ICdhcnJheScgJiYgaW5kZXggIT09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aGlzLmNoaWxkcmVuW2luZGV4XSA9IGNoaWxkXG5cdFx0fSBlbHNlIGlmICh0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0aWYoIXRoaXMuY2hpbGRyZW5bY2hpbGQua2V5XSl7XG5cdFx0XHRcdGlmKHRoaXMubWF4Q2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLm1heENoaWxkcmVuID09PSB0aGlzLmNoaWxkQ291bnQpe1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJNYXggQ2hpbGRyZW4gY291bnQgcmVhY2hlZFwiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGlsZC5wYXJlbnRLZXkgPSBwYXJlbnRLZXk7XG5cdFx0XHRcdFx0dGhpcy5jaGlsZHJlbltjaGlsZC5rZXldID0gY2hpbGQ7XG5cdFx0XHRcdFx0dGhpcy5jaGlsZENvdW50ID0gdGhpcy5jaGlsZENvdW50ICsgMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmVycm9yKFwiS2V5IGlzIHJlcXVpcmVkIHRvIGFkZCBjaGlsZCB0byBub2RlXCIpXG5cdH1cblxufTtcblxuTm9kZS5wcm90b3R5cGUuaGFzQ2hpbGRBdCA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLmNoaWxkcmVuW2tleV0pe1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZVxufTtcblxuTm9kZS5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uKGtleSl7XG5cdHJldHVybiB0aGlzLmNoaWxkcmVuW2tleV07XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5jaGlsZHJlbltrZXldKXtcblx0XHRkZWxldGUgdGhpcy5jaGlsZHJlbltrZXldO1xuXHRcdHRoaXMuY2hpbGRDb3VudCA9IHRoaXMuY2hpbGRDb3VudCAtIDE7XG5cdH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmFzSnNvbiA9IGZ1bmN0aW9uIChpZ25vcmVLZXkpe1xuXHRjb25zdCBqc29uID0ge1xuXHRcdHZhbHVlOiB0aGlzLnZhbHVlLFxuXHRcdGNoaWxkcmVuOiBudWxsXG5cdH07XG5cdGlmKCFpZ25vcmVLZXkpe1xuXHRcdGpzb24ua2V5ID0gdGhpcy5rZXlcblx0fVxuXG5cdGNvbnN0IGNvbnRhaW5zQ2hpbGRyZW4gPSAodGhpcy5jaGlsZHJlbikgJiYgKE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pLmxlbmd0aCA+IDApO1xuXHRpZihjb250YWluc0NoaWxkcmVuKXtcblx0XHRqc29uLmNoaWxkcmVuID0gW107XG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pO1xuXHRcdGZvcihsZXQgaSA9IDAgOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRjb25zdCBrZXkgPSBrZXlzW2ldO1xuXHRcdFx0Y29uc3QgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlbltrZXldO1xuXHRcdFx0aWYoY2hpbGROb2RlKXtcblx0XHRcdFx0Y29uc3QgY2hpbGRBc0pzb24gPSBjaGlsZE5vZGUuYXNKc29uKGlnbm9yZUtleSk7XG5cdFx0XHRcdGpzb24uY2hpbGRyZW5ba2V5XSA9IGNoaWxkQXNKc29uO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cdHJldHVybiBqc29uO1xufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvTm9kZS5qcyIsImltcG9ydCBUcmVlIGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgQmluYXJ5VHJlZSBmcm9tICcuL2JpbmFyeVRyZWUnO1xuXG5leHBvcnQge1xuXHRUcmVlLFxuXHRCaW5hcnlUcmVlXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2luZGV4LmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVhZiB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlLCBrZXkpe1xuXHRcdHRoaXMua2V5ID0ga2V5ICE9PSB1bmRlZmluZWQgPyBrZXkgOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XG5cdFx0dGhpcy5fdmFsdWUgPSB2YWx1ZTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLl92YWx1ZVxuXHR9XG5cblx0c2V0IHZhbHVlKG5ld1ZhbHVlKXtcblx0XHR0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3RyZWUvbGVhZi5qcyIsImltcG9ydCBUcmVlIGZyb20gJy4vLi4vdHJlZSc7XG5pbXBvcnQgTm9kZSBmcm9tICcuLy4uL3RyZWUvTm9kZSc7XG5pbXBvcnQge2luc2VydE5vZGUsIGluT3JkZXJUcmF2ZXJzZU5vZGV9IGZyb20gJy4vaGVscGVyJztcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmluYXJ5VHJlZSBleHRlbmRzIFRyZWUge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCdudW1iZXInLCBmYWxzZSk7XG5cdH1cblxuXHRhc0pTT04oKXtcblx0XHRyZXR1cm4gc3VwZXIuYXNKU09OKHRydWUpO1xuXHR9XG59XG5cblxuQmluYXJ5VHJlZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGNvbnN0IG5ld05vZGUgPSBuZXcgTm9kZSh2YWx1ZSx2YWx1ZSwgMik7XG5cdGlmKHRoaXMucm9vdCl7XG5cdFx0aW5zZXJ0Tm9kZSh0aGlzLnJvb3QsbmV3Tm9kZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5yb290ID0gbmV3Tm9kZTtcblx0fVxufTtcblxuXG4vLyB2aXNpdHMgYWxsIHRoZSBub2RlcyBpbiBhc2NlbmRpbmcgb3JkZXJcbkJpbmFyeVRyZWUucHJvdG90eXBlLmluT3JkZXJUcmF2ZXJzZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcblx0aW5PcmRlclRyYXZlcnNlTm9kZSh0aGlzLnJvb3QsY2FsbGJhY2spO1xufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUucHJlT3JkZXJUcmF2ZXJzZSA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnBvc3RPcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oKXtcblxufTtcblxuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5taW4gPSBmdW5jdGlvbigpe1xuXG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5tYXggPSBmdW5jdGlvbigpe1xuXG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGluc2VydE5vZGUobm9kZSwgbmV3Tm9kZSl7XG5cdGlmKG5ld05vZGUua2V5IDwgbm9kZS5rZXkpe1xuXHRcdGNvbnN0IGxlZnROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDApO1xuXHRcdGlmKGxlZnROb2RlID09PSBudWxsIHx8IGxlZnROb2RlID09PSB1bmRlZmluZWQpe1xuXHRcdFx0bm9kZS5hZGQobmV3Tm9kZSwgbnVsbCwgMCk7XG5cdFx0fSBlbHNle1xuXHRcdFx0aW5zZXJ0Tm9kZShsZWZ0Tm9kZSwgbmV3Tm9kZSk7XG5cdFx0fVxuXHR9IGVsc2V7XG5cdFx0Y29uc3QgcmlnaHROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDEpO1xuXHRcdGlmKHJpZ2h0Tm9kZSA9PT0gbnVsbCB8fCByaWdodE5vZGUgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRub2RlLmFkZChuZXdOb2RlLCBudWxsICwgMSk7XG5cdFx0fSBlbHNle1xuXHRcdFx0aW5zZXJ0Tm9kZShyaWdodE5vZGUsIG5ld05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbk9yZGVyVHJhdmVyc2VOb2RlKG5vZGUsIGNhbGxiYWNrKXtcblx0aWYobm9kZSAhPT0gbnVsbCAmJiBub2RlICE9PSB1bmRlZmluZWQgKXtcblx0XHRjb25zdCBsZWZ0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgwKTtcblx0XHQvLyByZWN1cnNpdmVseSBjYWxsIGFsbCBsZWZ0IHRvIGdldCB0aGUgbWluIHZhbHVlXG5cdFx0aW5PcmRlclRyYXZlcnNlTm9kZShsZWZ0Tm9kZSwgY2FsbGJhY2spO1xuXHRcdGNhbGxiYWNrLmNhbGwoY2FsbGJhY2tbJ3RoaXMnXSwgbm9kZS5rZXkpO1xuXHRcdGNvbnN0IHJpZ2h0Tm9kZSA9IG5vZGUuZ2V0Q2hpbGRBdCgxKTtcblx0XHQvL2FmdGVyIGNhbGxpbmcgYWxsIGxlZnQgblxuXHRcdGluT3JkZXJUcmF2ZXJzZU5vZGUocmlnaHROb2RlLGNhbGxiYWNrKTtcblxuXHR9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JpbmFyeVRyZWUvaGVscGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==