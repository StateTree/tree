import {Tree, BinaryTree} from './../lib';

var bt = new BinaryTree();
bt.insert(6);
bt.insert(4);
bt.insert(7);
bt.insert(2);


function printNode(val){
	console.log(val)
}

bt.inOrderTraverse(printNode);

const asJson = bt.asJSON();

console.log(asJson);

var tree = new Tree();
let key, key1;
key = tree.insert(4);

tree.insert(2, key);
key1=tree.insert(6, key);
tree.insert(7, key);
tree.remove(key1);

const asJsonTree = tree.asJSON();

console.log(asJsonTree);