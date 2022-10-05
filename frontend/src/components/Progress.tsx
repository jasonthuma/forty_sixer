import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useHikeState } from "../context/HikeContext";
import { calcProgress } from "../utils/calcProgress";

const Progress: React.FC = () => {
  const { hikes } = useHikeState();
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setProgress(calcProgress(hikes));
  }, [hikes]);

  return (
    <>
      <div className="container text-center mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2>Current Progress to Becoming a 46er:</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <ProgressBar
              className="bg-light"
              variant="success"
              now={progress}
              label={`${progress}%`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
