export function insertNode(node, newNode){
	if(newNode.key < node.key){
		const leftNode = node.getChildAt(0);
		if(leftNode === null || leftNode === undefined){
			node.add(newNode, null, 0);
		} else{
			insertNode(leftNode, newNode);
		}
	} else{
		const rightNode = node.getChildAt(1);
		if(rightNode === null || rightNode === undefined){
			node.add(newNode, null , 1);
		} else{
			insertNode(rightNode, newNode);
		}
	}
}


export function inOrderTraverseNode(node, callback){
	if(node !== null && node !== undefined ){
		const leftNode = node.getChildAt(0);
		// recursively call all left to get the min value
		inOrderTraverseNode(leftNode, callback);
		callback.call(callback['this'], node.key);
		const rightNode = node.getChildAt(1);
		//after calling all left n
		inOrderTraverseNode(rightNode,callback);

	}
}