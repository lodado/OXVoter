import React from "react";

import { Button } from "../../Button";
import { Card } from "../../Card";

const InfoPage = ({
  title = "에러 ",
  description = "잠시 이후 다시 시도해주세요",
  onResetErrorBoundary,
}: {
  title?: string;
  description?: string;
  onResetErrorBoundary?: () => void;
}) => {
  return (
    <div className="flex min-w-[300px] min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-white">
      <Card className="p-8 text-center bg-slate-800/80 shadow-xl backdrop-blur">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-slate-300">{description}</p>

        {onResetErrorBoundary && (
          <Card.Footer className="w-full h-[3.5rem] my-2 justify-center items-center">
            <Button type="button" variant="errorSolid" className="w-[130px] h-[3rem]" onClick={onResetErrorBoundary}>
              다시 시도
            </Button>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default InfoPage;
