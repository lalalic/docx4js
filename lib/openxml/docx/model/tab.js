export default class tab extends require('./text'){
	static get type(){return 'tab'}

	getText(){
		return String.fromCharCode(0x9)
	}
}
