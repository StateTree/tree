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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ZjU4YjVhYmQ4OGUyMWNhMTQ5OCIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9Ob2RlLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdHJlZS9sZWFmLmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9iaW5hcnlUcmVlL2hlbHBlci5qcyJdLCJuYW1lcyI6WyJUcmVlIiwiY2FjaGUiLCJfa2V5bWFwIiwicm9vdCIsInByb3RvdHlwZSIsImluc2VydCIsImNoaWxkVmFsdWUiLCJwYXJlbnRLZXkiLCJjaGlsZEtleSIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiY29uc29sZSIsIndhcm4iLCJwYXJlbnROb2RlIiwibmV3Q2hpbGQiLCJhZGQiLCJrZXkiLCJhcHBseSIsImdldENoaWxkcmVuRm9yTm9kZSIsImdldENoaWxkcmVuIiwic2VhcmNoIiwicmVtb3ZlIiwibm9kZVRvUmVtb3ZlIiwiYXNKU09OIiwiaWdub3JlS2V5IiwiYXNKc29uIiwiTm9kZSIsInZhbHVlIiwibWF4Q2hpbGRyZW4iLCJjaGlsZENvdW50IiwiY2hpbGRyZW5EYXRhU3RydWN0dXJlIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjaGlsZCIsImluZGV4IiwiZXJyb3IiLCJoYXNDaGlsZEF0IiwiZ2V0Q2hpbGRBdCIsImpzb24iLCJjb250YWluc0NoaWxkcmVuIiwiT2JqZWN0Iiwia2V5cyIsImkiLCJjaGlsZE5vZGUiLCJjaGlsZEFzSnNvbiIsIkJpbmFyeVRyZWUiLCJMZWFmIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwiX3ZhbHVlIiwibmV3VmFsdWUiLCJuZXdOb2RlIiwiaW5PcmRlclRyYXZlcnNlIiwicHJlT3JkZXJUcmF2ZXJzZSIsInBvc3RPcmRlclRyYXZlcnNlIiwibWluIiwibWF4IiwiaW5zZXJ0Tm9kZSIsImluT3JkZXJUcmF2ZXJzZU5vZGUiLCJub2RlIiwibGVmdE5vZGUiLCJyaWdodE5vZGUiLCJjYWxsIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7Ozs7SUFHcUJBLEksR0FDcEIsZ0JBQTJCO0FBQUEsS0FBZkMsS0FBZSx1RUFBUCxJQUFPOztBQUFBOztBQUMxQixNQUFLQyxPQUFMLEdBQWVELFFBQVEsRUFBUixHQUFhLElBQTVCO0FBQ0EsTUFBS0UsSUFBTCxHQUFZLElBQVo7QUFDQSxDOztrQkFKbUJILEk7OztBQU9yQkEsS0FBS0ksU0FBTCxDQUFlQyxNQUFmLEdBQXdCLFVBQVdDLFVBQVgsRUFBMkQ7QUFBQSxLQUFwQ0MsU0FBb0MsdUVBQXhCLElBQXdCO0FBQUEsS0FBbEJDLFFBQWtCO0FBQUEsS0FBVEMsUUFBUzs7O0FBRWxGLEtBQUtGLGNBQWNHLFNBQWYsSUFBNkIsT0FBT0gsU0FBUCxLQUFxQixRQUF0RCxFQUErRDtBQUM5REksVUFBUUMsSUFBUixDQUFhLDBDQUFiO0FBQ0E7QUFDQTs7QUFFRCxLQUFLSixhQUFhRSxTQUFkLElBQTRCLE9BQU9GLFFBQVAsS0FBb0IsUUFBcEQsRUFBNkQ7QUFDNURHLFVBQVFDLElBQVIsQ0FBYSwwQ0FBYjtBQUNBO0FBQ0E7O0FBRUQsS0FBRyxLQUFLVixPQUFSLEVBQWdCO0FBQ2YsTUFBSVcsYUFBYSxJQUFqQjtBQUNBLE1BQUdOLGNBQWMsSUFBakIsRUFBc0I7QUFDckJNLGdCQUFhLEtBQUtYLE9BQUwsQ0FBYUssU0FBYixDQUFiO0FBQ0EsT0FBRyxDQUFDTSxVQUFELElBQWUsS0FBS1YsSUFBdkIsRUFBNEI7QUFDM0JRLFlBQVFDLElBQVIsQ0FBYSxvQkFBYixFQUFtQ0wsU0FBbkM7QUFDQTtBQUNBO0FBQ0Q7O0FBRUQsTUFBTU8sV0FBVyxtQkFBU1IsVUFBVCxFQUFxQkUsUUFBckIsQ0FBakI7QUFDQSxNQUFHLENBQUMsS0FBS0wsSUFBVCxFQUFjO0FBQ2IsUUFBS0EsSUFBTCxHQUFZVyxRQUFaO0FBQ0EsR0FGRCxNQUVPO0FBQ05ELGNBQVdFLEdBQVgsQ0FBZUQsUUFBZixFQUF5QkQsV0FBV0csR0FBcEM7QUFDQTtBQUNELE9BQUtkLE9BQUwsQ0FBYVksU0FBU0UsR0FBdEIsSUFBNkJGLFFBQTdCO0FBQ0FMLGNBQVlBLFNBQVNRLEtBQVQsQ0FBZVIsU0FBUyxNQUFULENBQWYsQ0FBWjtBQUNBLFNBQU9LLFNBQVNFLEdBQWhCO0FBQ0E7QUFDRCxRQUFPLElBQVA7QUFDQSxDQWpDRDs7QUFtQ0FoQixLQUFLSSxTQUFMLENBQWVjLGtCQUFmLEdBQW9DLFVBQVVGLEdBQVYsRUFBYztBQUNqRCxLQUFHLEtBQUtkLE9BQVIsRUFBZ0I7QUFDZixNQUFNVyxhQUFjLEtBQUtYLE9BQUwsQ0FBYWMsR0FBYixDQUFwQjtBQUNBLE1BQUdILFVBQUgsRUFBYztBQUNiLFVBQU9BLFdBQVdNLFdBQVgsRUFBUDtBQUNBO0FBQ0QsU0FBTyxJQUFQO0FBQ0E7QUFDRCxRQUFPLElBQVA7QUFDQSxDQVREOztBQVdBbkIsS0FBS0ksU0FBTCxDQUFlZ0IsTUFBZixHQUF3QixVQUFVSixHQUFWLEVBQWM7QUFDckMsS0FBRyxLQUFLZCxPQUFSLEVBQWdCO0FBQ2YsU0FBTyxLQUFLQSxPQUFMLENBQWFjLEdBQWIsQ0FBUDtBQUNBO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FMRDs7QUFPQWhCLEtBQUtJLFNBQUwsQ0FBZWlCLE1BQWYsR0FBd0IsVUFBVUwsR0FBVixFQUFlUCxRQUFmLEVBQXdCO0FBQy9DLEtBQUcsS0FBS1AsT0FBUixFQUFnQjtBQUNmLE1BQU1vQixlQUFlLEtBQUtwQixPQUFMLENBQWFjLEdBQWIsQ0FBckI7QUFDQSxNQUFNVCxZQUFZZSxhQUFhZixTQUEvQjtBQUNBLE1BQUdBLGNBQWNHLFNBQWpCLEVBQTJCO0FBQzFCLE9BQU1HLGFBQWEsS0FBS1gsT0FBTCxDQUFhSyxTQUFiLENBQW5CO0FBQ0FNLGNBQVdRLE1BQVgsQ0FBa0JMLEdBQWxCO0FBQ0E7QUFDRCxTQUFPLEtBQUtkLE9BQUwsQ0FBYWMsR0FBYixDQUFQO0FBQ0FQLGNBQVlBLFNBQVNRLEtBQVQsQ0FBZVIsU0FBUyxNQUFULENBQWYsQ0FBWjtBQUNBO0FBQ0QsQ0FYRDs7QUFjQVQsS0FBS0ksU0FBTCxDQUFlbUIsTUFBZixHQUF3QixVQUFVQyxTQUFWLEVBQW9CO0FBQzNDLFFBQU8sS0FBS3JCLElBQUwsQ0FBVXNCLE1BQVYsQ0FBaUJELFNBQWpCLENBQVA7QUFDQSxDQUZELEM7Ozs7Ozs7Ozs7Ozs7QUM3RUE7Ozs7Ozs7Ozs7OztJQUVxQkUsSTs7O0FBQ3BCLGVBQVlDLEtBQVosRUFBbUJYLEdBQW5CLEVBQXdCWSxXQUF4QixFQUFvQztBQUFBOztBQUFBLDBHQUM3QkQsS0FENkIsRUFDdEJYLEdBRHNCOztBQUVuQyxRQUFLYSxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsUUFBS0QsV0FBTDtBQUNBLFFBQUtFLHFCQUFMO0FBQ0EsTUFBR0YsZ0JBQWdCbEIsU0FBbkIsRUFBNkI7QUFDNUIsU0FBS2tCLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0csUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtBLFFBQUwsQ0FBY0MsTUFBZCxHQUF1QixNQUFLSixXQUE1QjtBQUNBLFNBQUtFLHFCQUFMLEdBQTZCLE9BQTdCO0FBQ0EsR0FMRCxNQUtPO0FBQ04sU0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFNBQUtELHFCQUFMLEdBQTZCLFFBQTdCO0FBQ0E7O0FBRUQsUUFBS3ZCLFNBQUw7QUFmbUM7QUFnQm5DOzs7OztrQkFqQm1CbUIsSTs7O0FBb0JyQkEsS0FBS3RCLFNBQUwsQ0FBZVcsR0FBZixHQUFxQixVQUFVa0IsS0FBVixFQUFpQjFCLFNBQWpCLEVBQTRCMkIsS0FBNUIsRUFBa0M7QUFDdEQsS0FBR0QsTUFBTWpCLEdBQVQsRUFBYTtBQUNaLE1BQUcsS0FBS2MscUJBQUwsS0FBK0IsT0FBL0IsSUFBMENJLFVBQVV4QixTQUF2RCxFQUFpRTtBQUNoRSxRQUFLcUIsUUFBTCxDQUFjRyxLQUFkLElBQXVCRCxLQUF2QjtBQUNBLEdBRkQsTUFFTyxJQUFJLEtBQUtILHFCQUFMLEtBQStCLFFBQW5DLEVBQTRDO0FBQ2xELE9BQUcsQ0FBQyxLQUFLQyxRQUFMLENBQWNFLE1BQU1qQixHQUFwQixDQUFKLEVBQTZCO0FBQzVCLFFBQUcsS0FBS1ksV0FBTCxLQUFxQmxCLFNBQXJCLElBQWtDLEtBQUtrQixXQUFMLEtBQXFCLEtBQUtDLFVBQS9ELEVBQTBFO0FBQ3pFbEIsYUFBUXdCLEtBQVIsQ0FBYyw0QkFBZDtBQUNBLEtBRkQsTUFFTztBQUNORixXQUFNMUIsU0FBTixHQUFrQkEsU0FBbEI7QUFDQSxVQUFLd0IsUUFBTCxDQUFjRSxNQUFNakIsR0FBcEIsSUFBMkJpQixLQUEzQjtBQUNBLFVBQUtKLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxHQUFrQixDQUFwQztBQUNBO0FBQ0Q7QUFDRDtBQUNELEVBZEQsTUFjTztBQUNObEIsVUFBUXdCLEtBQVIsQ0FBYyxzQ0FBZDtBQUNBO0FBRUQsQ0FuQkQ7O0FBcUJBVCxLQUFLdEIsU0FBTCxDQUFlZ0MsVUFBZixHQUE0QixVQUFVcEIsR0FBVixFQUFjO0FBQ3pDLEtBQUcsS0FBS2UsUUFBTCxDQUFjZixHQUFkLENBQUgsRUFBc0I7QUFDckIsU0FBTyxJQUFQO0FBQ0E7QUFDRCxRQUFPLEtBQVA7QUFDQSxDQUxEOztBQU9BVSxLQUFLdEIsU0FBTCxDQUFlaUMsVUFBZixHQUE0QixVQUFTckIsR0FBVCxFQUFhO0FBQ3hDLFFBQU8sS0FBS2UsUUFBTCxDQUFjZixHQUFkLENBQVA7QUFDQSxDQUZEOztBQUlBVSxLQUFLdEIsU0FBTCxDQUFlZSxXQUFmLEdBQTZCLFlBQVU7QUFDdEMsUUFBTyxLQUFLWSxRQUFaO0FBQ0EsQ0FGRDs7QUFJQUwsS0FBS3RCLFNBQUwsQ0FBZWlCLE1BQWYsR0FBd0IsVUFBVUwsR0FBVixFQUFjO0FBQ3JDLEtBQUcsS0FBS2UsUUFBTCxDQUFjZixHQUFkLENBQUgsRUFBc0I7QUFDckIsU0FBTyxLQUFLZSxRQUFMLENBQWNmLEdBQWQsQ0FBUDtBQUNBLE9BQUthLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxHQUFrQixDQUFwQztBQUNBO0FBQ0QsQ0FMRDs7QUFPQUgsS0FBS3RCLFNBQUwsQ0FBZXFCLE1BQWYsR0FBd0IsVUFBVUQsU0FBVixFQUFvQjtBQUMzQyxLQUFNYyxPQUFPO0FBQ1pYLFNBQU8sS0FBS0EsS0FEQTtBQUVaSSxZQUFVO0FBRkUsRUFBYjtBQUlBLEtBQUcsQ0FBQ1AsU0FBSixFQUFjO0FBQ2JjLE9BQUt0QixHQUFMLEdBQVcsS0FBS0EsR0FBaEI7QUFDQTs7QUFFRCxLQUFNdUIsbUJBQW9CLEtBQUtSLFFBQU4sSUFBb0JTLE9BQU9DLElBQVAsQ0FBWSxLQUFLVixRQUFqQixFQUEyQkMsTUFBM0IsR0FBb0MsQ0FBakY7QUFDQSxLQUFHTyxnQkFBSCxFQUFvQjtBQUNuQkQsT0FBS1AsUUFBTCxHQUFnQixFQUFoQjtBQUNBLE1BQU1VLE9BQU9ELE9BQU9DLElBQVAsQ0FBWSxLQUFLVixRQUFqQixDQUFiO0FBQ0EsT0FBSSxJQUFJVyxJQUFJLENBQVosRUFBZ0JBLElBQUlELEtBQUtULE1BQXpCLEVBQWlDVSxHQUFqQyxFQUFxQztBQUNwQyxPQUFNMUIsTUFBTXlCLEtBQUtDLENBQUwsQ0FBWjtBQUNBLE9BQU1DLFlBQVksS0FBS1osUUFBTCxDQUFjZixHQUFkLENBQWxCO0FBQ0EsT0FBRzJCLFNBQUgsRUFBYTtBQUNaLFFBQU1DLGNBQWNELFVBQVVsQixNQUFWLENBQWlCRCxTQUFqQixDQUFwQjtBQUNBYyxTQUFLUCxRQUFMLENBQWNmLEdBQWQsSUFBcUI0QixXQUFyQjtBQUNBO0FBRUQ7QUFDRDtBQUNELFFBQU9OLElBQVA7QUFDQSxDQXhCRCxDOzs7Ozs7Ozs7Ozs7OztBQ2pFQTs7OztBQUNBOzs7Ozs7UUFHQ3RDLEk7UUFDQTZDLFU7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDTG9CQyxJO0FBQ3BCLGVBQVluQixLQUFaLEVBQW1CWCxHQUFuQixFQUF1QjtBQUFBOztBQUN0QixPQUFLQSxHQUFMLEdBQVdBLFFBQVFOLFNBQVIsR0FBb0JNLEdBQXBCLEdBQTBCK0IsS0FBS0MsTUFBTCxHQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxNQUEzQixDQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFyQztBQUNBLE9BQUtDLE1BQUwsR0FBY3hCLEtBQWQ7QUFDQTs7OztzQkFFVTtBQUNWLFVBQU8sS0FBS3dCLE1BQVo7QUFDQSxHO29CQUVTQyxRLEVBQVM7QUFDbEIsUUFBS0QsTUFBTCxHQUFjQyxRQUFkO0FBQ0E7Ozs7OztrQkFabUJOLEk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXJCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUtxQkQsVTs7O0FBQ3BCLHVCQUFhO0FBQUE7O0FBQUEsaUhBQ04sUUFETSxFQUNJLEtBREo7QUFFWjs7OzsyQkFFTztBQUNQLHlIQUFvQixJQUFwQjtBQUNBOzs7Ozs7a0JBUG1CQSxVOzs7QUFXckJBLFdBQVd6QyxTQUFYLENBQXFCQyxNQUFyQixHQUE4QixVQUFVc0IsS0FBVixFQUFpQjtBQUM5QyxLQUFNMEIsVUFBVSxtQkFBUzFCLEtBQVQsRUFBZUEsS0FBZixFQUFzQixDQUF0QixDQUFoQjtBQUNBLEtBQUcsS0FBS3hCLElBQVIsRUFBYTtBQUNaLDBCQUFXLEtBQUtBLElBQWhCLEVBQXFCa0QsT0FBckI7QUFDQSxFQUZELE1BRU87QUFDTixPQUFLbEQsSUFBTCxHQUFZa0QsT0FBWjtBQUNBO0FBQ0QsQ0FQRDs7QUFVQTtBQUNBUixXQUFXekMsU0FBWCxDQUFxQmtELGVBQXJCLEdBQXVDLFVBQVM3QyxRQUFULEVBQWtCO0FBQ3hELGtDQUFvQixLQUFLTixJQUF6QixFQUE4Qk0sUUFBOUI7QUFDQSxDQUZEOztBQUlBb0MsV0FBV3pDLFNBQVgsQ0FBcUJtRCxnQkFBckIsR0FBd0MsWUFBVSxDQUVqRCxDQUZEOztBQUlBVixXQUFXekMsU0FBWCxDQUFxQm9ELGlCQUFyQixHQUF5QyxZQUFVLENBRWxELENBRkQ7O0FBS0FYLFdBQVd6QyxTQUFYLENBQXFCcUQsR0FBckIsR0FBMkIsWUFBVSxDQUVwQyxDQUZEOztBQUlBWixXQUFXekMsU0FBWCxDQUFxQnNELEdBQXJCLEdBQTJCLFlBQVUsQ0FFcEMsQ0FGRDs7QUFJQWIsV0FBV3pDLFNBQVgsQ0FBcUJnQixNQUFyQixHQUE4QixZQUFVLENBRXZDLENBRkQsQzs7Ozs7Ozs7Ozs7O1FDbERnQnVDLFUsR0FBQUEsVTtRQW1CQUMsbUIsR0FBQUEsbUI7QUFuQlQsU0FBU0QsVUFBVCxDQUFvQkUsSUFBcEIsRUFBMEJSLE9BQTFCLEVBQWtDO0FBQ3hDLEtBQUdBLFFBQVFyQyxHQUFSLEdBQWM2QyxLQUFLN0MsR0FBdEIsRUFBMEI7QUFDekIsTUFBTThDLFdBQVdELEtBQUt4QixVQUFMLENBQWdCLENBQWhCLENBQWpCO0FBQ0EsTUFBR3lCLGFBQWEsSUFBYixJQUFxQkEsYUFBYXBELFNBQXJDLEVBQStDO0FBQzlDbUQsUUFBSzlDLEdBQUwsQ0FBU3NDLE9BQVQsRUFBa0IsSUFBbEIsRUFBd0IsQ0FBeEI7QUFDQSxHQUZELE1BRU07QUFDTE0sY0FBV0csUUFBWCxFQUFxQlQsT0FBckI7QUFDQTtBQUNELEVBUEQsTUFPTTtBQUNMLE1BQU1VLFlBQVlGLEtBQUt4QixVQUFMLENBQWdCLENBQWhCLENBQWxCO0FBQ0EsTUFBRzBCLGNBQWMsSUFBZCxJQUFzQkEsY0FBY3JELFNBQXZDLEVBQWlEO0FBQ2hEbUQsUUFBSzlDLEdBQUwsQ0FBU3NDLE9BQVQsRUFBa0IsSUFBbEIsRUFBeUIsQ0FBekI7QUFDQSxHQUZELE1BRU07QUFDTE0sY0FBV0ksU0FBWCxFQUFzQlYsT0FBdEI7QUFDQTtBQUNEO0FBQ0Q7O0FBR00sU0FBU08sbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DcEQsUUFBbkMsRUFBNEM7QUFDbEQsS0FBR29ELFNBQVMsSUFBVCxJQUFpQkEsU0FBU25ELFNBQTdCLEVBQXdDO0FBQ3ZDLE1BQU1vRCxXQUFXRCxLQUFLeEIsVUFBTCxDQUFnQixDQUFoQixDQUFqQjtBQUNBO0FBQ0F1QixzQkFBb0JFLFFBQXBCLEVBQThCckQsUUFBOUI7QUFDQUEsV0FBU3VELElBQVQsQ0FBY3ZELFNBQVMsTUFBVCxDQUFkLEVBQWdDb0QsS0FBSzdDLEdBQXJDO0FBQ0EsTUFBTStDLFlBQVlGLEtBQUt4QixVQUFMLENBQWdCLENBQWhCLENBQWxCO0FBQ0E7QUFDQXVCLHNCQUFvQkcsU0FBcEIsRUFBOEJ0RCxRQUE5QjtBQUVBO0FBQ0QsQyIsImZpbGUiOiJsaWIvdHJlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidHJlZVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0cmVlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRyZWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdmNThiNWFiZDg4ZTIxY2ExNDk4IiwiaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlIHtcblx0Y29uc3RydWN0b3IoY2FjaGUgPSB0cnVlICkge1xuXHRcdHRoaXMuX2tleW1hcCA9IGNhY2hlID8ge30gOiBudWxsO1xuXHRcdHRoaXMucm9vdCA9IG51bGw7XG5cdH1cbn1cblxuVHJlZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKCBjaGlsZFZhbHVlLCBwYXJlbnRLZXkgPSBudWxsLCBjaGlsZEtleSxjYWxsYmFjayl7XG5cblx0aWYoIChwYXJlbnRLZXkgIT09IHVuZGVmaW5lZCkgJiYgdHlwZW9mIHBhcmVudEtleSAhPT0gJ3N0cmluZycpe1xuXHRcdGNvbnNvbGUud2FybigncGFyZW50S2V5IGNhbiBiZSBvbmx5IHN0cmluZyBpZiBwcm92aWRlZCcpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmKCAoY2hpbGRLZXkgIT09IHVuZGVmaW5lZCkgJiYgdHlwZW9mIGNoaWxkS2V5ICE9PSAnc3RyaW5nJyl7XG5cdFx0Y29uc29sZS53YXJuKCdjaGlsZEtleSBjYW4gYmUgb25seSBzdHJpbmcgaWYgcHJvdmlvZGVkJyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYodGhpcy5fa2V5bWFwKXtcblx0XHRsZXQgcGFyZW50Tm9kZSA9IG51bGw7XG5cdFx0aWYocGFyZW50S2V5ICE9PSBudWxsKXtcblx0XHRcdHBhcmVudE5vZGUgPSB0aGlzLl9rZXltYXBbcGFyZW50S2V5XTtcblx0XHRcdGlmKCFwYXJlbnROb2RlICYmIHRoaXMucm9vdCl7XG5cdFx0XHRcdGNvbnNvbGUud2FybigncGFyZW50IG5vdCBmb3VuZDogJywgcGFyZW50S2V5KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IG5ld0NoaWxkID0gbmV3IE5vZGUoY2hpbGRWYWx1ZSwgY2hpbGRLZXkpO1xuXHRcdGlmKCF0aGlzLnJvb3Qpe1xuXHRcdFx0dGhpcy5yb290ID0gbmV3Q2hpbGQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcmVudE5vZGUuYWRkKG5ld0NoaWxkLCBwYXJlbnROb2RlLmtleSk7XG5cdFx0fVxuXHRcdHRoaXMuX2tleW1hcFtuZXdDaGlsZC5rZXldID0gbmV3Q2hpbGQ7XG5cdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tbJ3RoaXMnXSk7XG5cdFx0cmV0dXJuIG5ld0NoaWxkLmtleTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblRyZWUucHJvdG90eXBlLmdldENoaWxkcmVuRm9yTm9kZSA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdGNvbnN0IHBhcmVudE5vZGUgPSAgdGhpcy5fa2V5bWFwW2tleV07XG5cdFx0aWYocGFyZW50Tm9kZSl7XG5cdFx0XHRyZXR1cm4gcGFyZW50Tm9kZS5nZXRDaGlsZHJlbigpXG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVHJlZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGtleSl7XG5cdGlmKHRoaXMuX2tleW1hcCl7XG5cdFx0cmV0dXJuIHRoaXMuX2tleW1hcFtrZXldO1xuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2spe1xuXHRpZih0aGlzLl9rZXltYXApe1xuXHRcdGNvbnN0IG5vZGVUb1JlbW92ZSA9IHRoaXMuX2tleW1hcFtrZXldO1xuXHRcdGNvbnN0IHBhcmVudEtleSA9IG5vZGVUb1JlbW92ZS5wYXJlbnRLZXk7XG5cdFx0aWYocGFyZW50S2V5ICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0Y29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX2tleW1hcFtwYXJlbnRLZXldO1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmUoa2V5KTtcblx0XHR9XG5cdFx0ZGVsZXRlIHRoaXMuX2tleW1hcFtrZXldO1xuXHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrWyd0aGlzJ10pO1xuXHR9XG59O1xuXG5cblRyZWUucHJvdG90eXBlLmFzSlNPTiA9IGZ1bmN0aW9uIChpZ25vcmVLZXkpe1xuXHRyZXR1cm4gdGhpcy5yb290LmFzSnNvbihpZ25vcmVLZXkpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9pbmRleC5qcyIsImltcG9ydCBMZWFmIGZyb20gJy4vbGVhZic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUgZXh0ZW5kcyBMZWFmIHtcblx0Y29uc3RydWN0b3IodmFsdWUsIGtleSwgbWF4Q2hpbGRyZW4pe1xuXHRcdHN1cGVyKHZhbHVlLCBrZXkpO1xuXHRcdHRoaXMuY2hpbGRDb3VudCA9IDA7XG5cdFx0dGhpcy5tYXhDaGlsZHJlbjtcblx0XHR0aGlzLmNoaWxkcmVuRGF0YVN0cnVjdHVyZTtcblx0XHRpZihtYXhDaGlsZHJlbiAhPT0gdW5kZWZpbmVkKXtcblx0XHRcdHRoaXMubWF4Q2hpbGRyZW4gPSBtYXhDaGlsZHJlbjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXTtcblx0XHRcdHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gdGhpcy5tYXhDaGlsZHJlbjtcblx0XHRcdHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID0gJ2FycmF5Jztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jaGlsZHJlbiA9IHt9O1xuXHRcdFx0dGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPSAnb2JqZWN0Jztcblx0XHR9XG5cblx0XHR0aGlzLnBhcmVudEtleTtcblx0fVxufVxuXG5Ob2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2hpbGQsIHBhcmVudEtleSwgaW5kZXgpe1xuXHRpZihjaGlsZC5rZXkpe1xuXHRcdGlmKHRoaXMuY2hpbGRyZW5EYXRhU3RydWN0dXJlID09PSAnYXJyYXknICYmIGluZGV4ICE9PSB1bmRlZmluZWQpe1xuXHRcdFx0dGhpcy5jaGlsZHJlbltpbmRleF0gPSBjaGlsZFxuXHRcdH0gZWxzZSBpZiAodGhpcy5jaGlsZHJlbkRhdGFTdHJ1Y3R1cmUgPT09ICdvYmplY3QnKXtcblx0XHRcdGlmKCF0aGlzLmNoaWxkcmVuW2NoaWxkLmtleV0pe1xuXHRcdFx0XHRpZih0aGlzLm1heENoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tYXhDaGlsZHJlbiA9PT0gdGhpcy5jaGlsZENvdW50KXtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiTWF4IENoaWxkcmVuIGNvdW50IHJlYWNoZWRcIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2hpbGQucGFyZW50S2V5ID0gcGFyZW50S2V5O1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRyZW5bY2hpbGQua2V5XSA9IGNoaWxkO1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRDb3VudCA9IHRoaXMuY2hpbGRDb3VudCArIDE7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5lcnJvcihcIktleSBpcyByZXF1aXJlZCB0byBhZGQgY2hpbGQgdG8gbm9kZVwiKVxuXHR9XG5cbn07XG5cbk5vZGUucHJvdG90eXBlLmhhc0NoaWxkQXQgPSBmdW5jdGlvbiAoa2V5KXtcblx0aWYodGhpcy5jaGlsZHJlbltrZXldKXtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2Vcbn07XG5cbk5vZGUucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbihrZXkpe1xuXHRyZXR1cm4gdGhpcy5jaGlsZHJlbltrZXldO1xufTtcblxuTm9kZS5wcm90b3R5cGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5jaGlsZHJlbjtcbn07XG5cbk5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXkpe1xuXHRpZih0aGlzLmNoaWxkcmVuW2tleV0pe1xuXHRcdGRlbGV0ZSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0dGhpcy5jaGlsZENvdW50ID0gdGhpcy5jaGlsZENvdW50IC0gMTtcblx0fVxufTtcblxuTm9kZS5wcm90b3R5cGUuYXNKc29uID0gZnVuY3Rpb24gKGlnbm9yZUtleSl7XG5cdGNvbnN0IGpzb24gPSB7XG5cdFx0dmFsdWU6IHRoaXMudmFsdWUsXG5cdFx0Y2hpbGRyZW46IG51bGxcblx0fTtcblx0aWYoIWlnbm9yZUtleSl7XG5cdFx0anNvbi5rZXkgPSB0aGlzLmtleVxuXHR9XG5cblx0Y29uc3QgY29udGFpbnNDaGlsZHJlbiA9ICh0aGlzLmNoaWxkcmVuKSAmJiAoT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbikubGVuZ3RoID4gMCk7XG5cdGlmKGNvbnRhaW5zQ2hpbGRyZW4pe1xuXHRcdGpzb24uY2hpbGRyZW4gPSBbXTtcblx0XHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbik7XG5cdFx0Zm9yKGxldCBpID0gMCA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKXtcblx0XHRcdGNvbnN0IGtleSA9IGtleXNbaV07XG5cdFx0XHRjb25zdCBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW2tleV07XG5cdFx0XHRpZihjaGlsZE5vZGUpe1xuXHRcdFx0XHRjb25zdCBjaGlsZEFzSnNvbiA9IGNoaWxkTm9kZS5hc0pzb24oaWdub3JlS2V5KTtcblx0XHRcdFx0anNvbi5jaGlsZHJlbltrZXldID0gY2hpbGRBc0pzb247XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cblx0cmV0dXJuIGpzb247XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9Ob2RlLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi90cmVlJztcbmltcG9ydCBCaW5hcnlUcmVlIGZyb20gJy4vYmluYXJ5VHJlZSc7XG5cbmV4cG9ydCB7XG5cdFRyZWUsXG5cdEJpbmFyeVRyZWVcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFmIHtcblx0Y29uc3RydWN0b3IodmFsdWUsIGtleSl7XG5cdFx0dGhpcy5rZXkgPSBrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcblx0XHR0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IHZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlXG5cdH1cblxuXHRzZXQgdmFsdWUobmV3VmFsdWUpe1xuXHRcdHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdHJlZS9sZWFmLmpzIiwiaW1wb3J0IFRyZWUgZnJvbSAnLi8uLi90cmVlJztcbmltcG9ydCBOb2RlIGZyb20gJy4vLi4vdHJlZS9Ob2RlJztcbmltcG9ydCB7aW5zZXJ0Tm9kZSwgaW5PcmRlclRyYXZlcnNlTm9kZX0gZnJvbSAnLi9oZWxwZXInO1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5hcnlUcmVlIGV4dGVuZHMgVHJlZSB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoJ251bWJlcicsIGZhbHNlKTtcblx0fVxuXG5cdGFzSlNPTigpe1xuXHRcdHJldHVybiBzdXBlci5hc0pTT04odHJ1ZSk7XG5cdH1cbn1cblxuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0Y29uc3QgbmV3Tm9kZSA9IG5ldyBOb2RlKHZhbHVlLHZhbHVlLCAyKTtcblx0aWYodGhpcy5yb290KXtcblx0XHRpbnNlcnROb2RlKHRoaXMucm9vdCxuZXdOb2RlKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJvb3QgPSBuZXdOb2RlO1xuXHR9XG59O1xuXG5cbi8vIHZpc2l0cyBhbGwgdGhlIG5vZGVzIGluIGFzY2VuZGluZyBvcmRlclxuQmluYXJ5VHJlZS5wcm90b3R5cGUuaW5PcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRpbk9yZGVyVHJhdmVyc2VOb2RlKHRoaXMucm9vdCxjYWxsYmFjayk7XG59O1xuXG5CaW5hcnlUcmVlLnByb3RvdHlwZS5wcmVPcmRlclRyYXZlcnNlID0gZnVuY3Rpb24oKXtcblxufTtcblxuQmluYXJ5VHJlZS5wcm90b3R5cGUucG9zdE9yZGVyVHJhdmVyc2UgPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cbkJpbmFyeVRyZWUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2JpbmFyeVRyZWUvaW5kZXguanMiLCJleHBvcnQgZnVuY3Rpb24gaW5zZXJ0Tm9kZShub2RlLCBuZXdOb2RlKXtcblx0aWYobmV3Tm9kZS5rZXkgPCBub2RlLmtleSl7XG5cdFx0Y29uc3QgbGVmdE5vZGUgPSBub2RlLmdldENoaWxkQXQoMCk7XG5cdFx0aWYobGVmdE5vZGUgPT09IG51bGwgfHwgbGVmdE5vZGUgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRub2RlLmFkZChuZXdOb2RlLCBudWxsLCAwKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKGxlZnROb2RlLCBuZXdOb2RlKTtcblx0XHR9XG5cdH0gZWxzZXtcblx0XHRjb25zdCByaWdodE5vZGUgPSBub2RlLmdldENoaWxkQXQoMSk7XG5cdFx0aWYocmlnaHROb2RlID09PSBudWxsIHx8IHJpZ2h0Tm9kZSA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdG5vZGUuYWRkKG5ld05vZGUsIG51bGwgLCAxKTtcblx0XHR9IGVsc2V7XG5cdFx0XHRpbnNlcnROb2RlKHJpZ2h0Tm9kZSwgbmV3Tm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluT3JkZXJUcmF2ZXJzZU5vZGUobm9kZSwgY2FsbGJhY2spe1xuXHRpZihub2RlICE9PSBudWxsICYmIG5vZGUgIT09IHVuZGVmaW5lZCApe1xuXHRcdGNvbnN0IGxlZnROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDApO1xuXHRcdC8vIHJlY3Vyc2l2ZWx5IGNhbGwgYWxsIGxlZnQgdG8gZ2V0IHRoZSBtaW4gdmFsdWVcblx0XHRpbk9yZGVyVHJhdmVyc2VOb2RlKGxlZnROb2RlLCBjYWxsYmFjayk7XG5cdFx0Y2FsbGJhY2suY2FsbChjYWxsYmFja1sndGhpcyddLCBub2RlLmtleSk7XG5cdFx0Y29uc3QgcmlnaHROb2RlID0gbm9kZS5nZXRDaGlsZEF0KDEpO1xuXHRcdC8vYWZ0ZXIgY2FsbGluZyBhbGwgbGVmdCBuXG5cdFx0aW5PcmRlclRyYXZlcnNlTm9kZShyaWdodE5vZGUsY2FsbGJhY2spO1xuXG5cdH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYmluYXJ5VHJlZS9oZWxwZXIuanMiXSwic291cmNlUm9vdCI6IiJ9