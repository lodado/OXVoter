import RAW_COLOR from './variables/color'
import CUSTOM from "./variables/semantic";
import SPACE from './variables/space'

type ColorValue = string
type NestedColorObject = { [key: string]: ColorValue | NestedColorObject }

function capitalizeFirstLetter(input: string): string {
  // 입력받은 문자열을 하이픈을 기준으로 분리합니다.
  const words = input.split("-");

  // 각 단어의 첫 글자를 대문자로 변환하고, 나머지 글자는 그대로 두어서 새로운 배열을 생성합니다.
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // 대문자로 시작하는 단어들을 다시 하이픈으로 연결하여 결과 문자열을 반환합니다.
  return capitalizedWords.join("-");
}

function transformColorsForTailwind(
  data: NestedColorObject,
  result: NestedColorObject = {},
  parentKey: string = ""
): NestedColorObject {
  Object.entries(data).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}-${key}` : key;

    if (typeof value === "object" && value !== null && !(value instanceof Array)) {
      transformColorsForTailwind(value as NestedColorObject, result, newKey);
    } else {
      const strings = newKey.split("-");

      const target = strings[0];
      const color = strings.slice(1).join("-");

      let currentDict = result;

      [target, color].forEach((part, index) => {
        if (index === 1) {
          currentDict[part] = `var(--${capitalizeFirstLetter(part)});`;
        } else {
          if (!(part in currentDict)) {
            currentDict[part] = {};
          }
          currentDict = currentDict[part] as NestedColorObject;
        }
      });

      /* 
      NestedColorObject = {
        [strings[0]]: {
          [strings[1]]: {
            [strings[2]]: strings.slice(2).join("-"),
          },
        },
      };
      */
    }
  });

  return result;
}

const COLOR = transformColorsForTailwind({
  light: {
    ...RAW_COLOR.Light.color,
    ...CUSTOM.Light.colors,
  },
  dark: {
    ...RAW_COLOR.Dark.color,
    ...CUSTOM.Dark.colors,
  },
});
 
const VARIABLES = { COLOR, SPACE }
export default VARIABLES
