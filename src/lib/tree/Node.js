import Leaf from './leaf';

export default class Node extends Leaf {
	constructor(value, key, maxChildren){
		super(value, key);
		this.childCount = 0;
		this.maxChildren;
		this.childrenDataStructure;
		if(maxChildren !== undefined){
			this.maxChildren = maxChildren;
			this.children = [];
			this.children.length = this.maxChildren;
			this.childrenDataStructure = 'array';
		} else {
			this.children = {};
			this.childrenDataStructure = 'object';
		}

		this.parentKey;
	}
}

Node.prototype.add = function (child, parentKey, index){
	if(child.key){
		if(this.childrenDataStructure === 'array' && index !== undefined){
			this.children[index] = child
		} else if (this.childrenDataStructure === 'object'){
			if(!this.children[child.key]){
				if(this.maxChildren !== undefined && this.maxChildren === this.childCount){
					console.error("Max Children count reached");
				} else {
					child.parentKey = parentKey;
					this.children[child.key] = child;
					this.childCount = this.childCount + 1;
				}
			}
		}
	} else {
		console.error("Key is required to add child to node")
	}

};

Node.prototype.hasChildAt = function (key){
	if(this.children[key]){
		return true;
	}
	return false
};

Node.prototype.getChildAt = function(key){
	return this.children[key];
};

Node.prototype.remove = function (key){
	if(this.children[key]){
		delete this.children[key];
		this.childCount = this.childCount - 1;
	}
};

Node.prototype.asJson = function (ignoreKey){
	const json = {
		value: this.value,
		children: null
	};
	if(!ignoreKey){
		json.key = this.key
	}

	const containsChildren = (this.children) && (Object.keys(this.children).length > 0);
	if(containsChildren){
		json.children = [];
		const keys = Object.keys(this.children);
		for(let i = 0 ; i < keys.length; i++){
			const key = keys[i];
			const childNode = this.children[key];
			if(childNode){
				const childAsJson = childNode.asJson(ignoreKey);
				json.children[key] = childAsJson;
			}

		}
	}
	return json;
};

