/**
 * Created by vyt on 2015-07-28.
 */
import md5 from 'md5';

/**
 * Returns object with adata about text
 * @param textString
 * @param hashId
 * @return {{textString: *, textLength: *, textLengthInWords: Number, textWords: Array, currentWord: number, gameId: string}}
 */
export default function makeTextObject ({text: textString, hashId: hashId}) {
  return {
        textString: textString,
        textLength: textString.length,
        textLengthInWords: textString.split(" ").length,
        textWords: textString.split(" ").map((word, index, ar) => {return index !== (ar.length - 1) ? word + " " : word})

  }
}