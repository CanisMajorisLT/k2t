/**
 * Keep it simple for now, most likely will need to be remade when implementing multiplayer
 */

import _ from 'lodash';
import md5 from 'md5';


const texts = [{
	text: "The world of typing has changed. In the 1970s, every business had rooms full of secretaries whose job it was to type letters that had been hand-written. They were copying the writing into a more readable format. In the early 1980s, the personal computer became a common office machine.",
	hashId: "1492bd93bed6f1232939673cecccc517"
},
	{
		text: "The ref attribute can be a callback function instead of a name. This callback will be executed immediately after the component is mounted. The referenced component will be passed in as a parameter, and the callback function may use the component immediately, or save the reference for future use (or both).",
		hashId: "af96c061d8b64e3a0556c0371e9f728b"
	},
	{
		text: "Sveiki, kurá TVS rekomenduotumët iðbandyti? Reikia kaþko free ir simple, listint vienintelës kategorijos produktus, ákelti produkto nuotraukà ar porà, informacijà apie já (pagaminimo ðalis, kokybë, kaina, etc..), add to cart, siuntimo iðlaidø skaièiuoklë, kontaktai, laiðko siuntimo forma (optionally), integracija su Paypal.",
		hashId: "0c263155d40777482c11726ca9cefb49"
	}];

export default class TextDataCenter {
	constructor(server) {
		this.server = server;
	}

	getRandomText() {
		let randTxt = _.sample(texts);
		return Object.assign(randTxt, this.makeTextObject(randTxt.text)); // just a retarded temp solution... all texts should have this data already
	}

	getTextById(hashId) {
		let txt = texts[hashId];
		return Object.assign(txt, this.makeTextObject(txt.text)); // just a retarded temp solution... all texts should have this data already
	}

	makeTextObject(textString) {
		return {
			textString: textString,
			textLength: textString.length,
			textLengthInWords: textString.split(" ").length,
			textWords: textString.split(" ").map((word, index, ar) => {
				return index !== (ar.length - 1) ? word + " " : word
			}),
			hashId: md5(textString)
		}
	}

}


