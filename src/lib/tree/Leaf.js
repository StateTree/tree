export default class Leaf {
	constructor(value, key){
		this.key = key !== undefined ? key : Math.random().toString(36).substr(2, 9);
		this._value = value;
	}

	get value(){
		return this._value
	}

	set value(newValue){
		this._value = newValue;
	}
}