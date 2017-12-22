import Node from './Node';


export default class Tree {
	constructor(cache = true ) {
		this._keymap = cache ? {} : null;
		this.root = null;
	}
}

Tree.prototype.insert = function ( childValue, parentKey, childKey,callback){

	if( (parentKey !== undefined) && typeof parentKey !== 'string'){
		console.warn('parentKey can be only string if provided');
		return;
	}

	if( (childKey !== undefined) && typeof childKey !== 'string'){
		console.warn('childKey can be only string if provioded');
		return;
	}

	if(this._keymap){
		let parentNode = null;
		if(parentKey !== undefined || parentKey !== null){
			parentNode = this._keymap[parentKey];
			if(!parentNode && this.root){
				console.warn('parent not found: ', parentKey);
				return;
			}
		}

		const newChild = new Node(childValue, childKey);
		if(!this.root){
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

Tree.prototype.getChildrenForNode = function (key){
	if(this._keymap){
		const parentNode =  this._keymap[key];
		if(parentNode){
			return parentNode.getChildren()
		}
		return null;
	}
	return null;
};

Tree.prototype.search = function (key){
	if(this._keymap){
		return this._keymap[key];
	}
	return null;
};

Tree.prototype.remove = function (key, callback){
	if(this._keymap){
		const nodeToRemove = this._keymap[key];
		const parentKey = nodeToRemove.parentKey;
		if(parentKey !== undefined){
			const parentNode = this._keymap[parentKey];
			parentNode.remove(key);
		}
		delete this._keymap[key];
		callback && callback.apply(callback['this']);
	}
};


Tree.prototype.asJSON = function (ignoreKey){
	return this.root.asJson(ignoreKey);
}

