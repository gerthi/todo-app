import React from "react";
import { Skeleton } from "@material-ui/lab";

const Spinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column py-5">
        <Skeleton width={"40vw"} />
        <Skeleton width={"40vw"} />
        <Skeleton width={"35vw"} />
      </div>
    </div>
  );
};

export default Spinner;
