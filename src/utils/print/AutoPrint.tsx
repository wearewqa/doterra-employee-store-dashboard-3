import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const AutoPrint = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrintPackingList = useReactToPrint({ contentRef });

  useEffect(() => {
    handlePrintPackingList();
  }, []);

  return (
    <div>
      <div style={{ display: "none" }}>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default AutoPrint;
