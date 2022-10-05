import { useAuthState } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MountainList from "../components/MountainList";
import Progress from "../components/Progress";

const MountainJournal: React.FC = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="app-body">
      <div className="container py-5">
        <div className="text-center">
          <h1>{user?.username}'s Hiking Journal</h1>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-8">
            <MountainList />
          </div>
        </div>
        <div className="row justify-content-center">
          <Progress />
        </div>
      </div>
    </div>
  );
};

export default MountainJournal;
