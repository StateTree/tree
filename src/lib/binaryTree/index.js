import Tree from './../tree';
import Node from './../tree/Node';
import {insertNode, inOrderTraverseNode} from './helper';




export default class BinaryTree extends Tree {
	constructor(){
		super('number', false);
	}

	asJSON(){
		return super.asJSON(true);
	}
}


BinaryTree.prototype.insert = function (value) {
	const newNode = new Node(value,value, 2);
	if(this.root){
		insertNode(this.root,newNode);
	} else {
		this.root = newNode;
	}
};


// visits all the nodes in ascending order
BinaryTree.prototype.inOrderTraverse = function(callback){
	inOrderTraverseNode(this.root,callback);
};

BinaryTree.prototype.preOrderTraverse = function(){

};

BinaryTree.prototype.postOrderTraverse = function(){

};


BinaryTree.prototype.min = function(){

};

BinaryTree.prototype.max = function(){

};

BinaryTree.prototype.search = function(){

};