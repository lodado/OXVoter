import LayoutEffectVhContainer from "./LayoutEffectVhContainer";
import { vhCode, viewportCode } from "./utils";

const ScreenVhScript = ({ nonce }: { nonce: string }) => {
  return (
    <>
      <script type="text/javascript" nonce={nonce} dangerouslySetInnerHTML={{ __html: `(${vhCode})();` }} />
      <script type="text/javascript" nonce={nonce} dangerouslySetInnerHTML={{ __html: `(${viewportCode})();` }} />
      <LayoutEffectVhContainer />
    </>
  );
};

export default ScreenVhScript;
