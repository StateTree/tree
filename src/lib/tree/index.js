import Node from './Node';


export default class Tree {
	constructor() {
		this._keymap = {};
		this.root;
		this.rootKey;
	}
}

const protoType = Tree.prototype;

protoType.insert = function(element, elementId, parentId){

	if( (elementId !== undefined) && typeof elementId !== 'string'){
		console.warn('elementId can be only string if provided');
		return;
	}

	if( (parentId !== undefined) && typeof parentId !== 'string'){
		console.warn('parentId can be only string if provided');
		return;
	}

	if(!this.root){ // first insert will become the rootNode
		this.root = new Node(element, elementId);
		this.rootKey = this.root.key;
	}

	// check if given parent exist
	let parentNode = null;
	if(parentId){
		parentNode = this._keymap[parentId];
		if(!parentNode){
			console.warn('parent not found: ', parentId);
			return;
		}
	} else {
		parentId = this.rootKey;
		parentNode = this.root;
	}

	let childNode = null;
	if(elementId){
		childNode = this._keymap[elementId];
		if(!childNode){
			childNode = new Node(element, elementId);
			parentNode.add(childNode, parentNode.key);
			this._keymap[childNode.key] = childNode;
		}
	}

	return childNode.key;
};

Tree.prototype.getChildrenForNode = function (key){
	const parentNode =  this._keymap[key];
	if(parentNode){
		return parentNode.getChildren()
	}
	return null;
};

Tree.prototype.search = function (key){
	return this._keymap[key];
};

Tree.prototype.remove = function (key){
	const nodeToRemove = this._keymap[key];
	const parentKey = nodeToRemove.parentKey;
	if(parentKey !== undefined){
		const parentNode = this._keymap[parentKey];
		parentNode.remove(key);
	}
	delete this._keymap[key];
};


Tree.prototype.asJSON = function (ignoreKey){
	return this.root.asJson(ignoreKey);
}

