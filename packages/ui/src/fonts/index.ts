import { asul } from "./google/asul";
import { geist } from "./google/geist";
import { commitMonoVazen } from "./local/commitmono-vazen";

const fonts = [geist, asul, commitMonoVazen];
const fontsVariable = fonts.map((font) => font.variable).join(" ");

export { asul, commitMonoVazen, fontsVariable, geist };
