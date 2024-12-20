import { useEffect } from "react";
import PromptActions from "../match-list/PromptActions";
import JDResumeSimilarityWidget from "../Widget/JdResumeSimilarityWidget";
import { useDispatch, useSelector } from "react-redux";
import { onQuerySelectThunk } from "../../store/thunks/queryButtonThunks";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateStatusForStep, updateStepToActive } from "../../store/timelineSlice";
import { totalMatchesSelector } from "../../store/selectors/userSelector";
import { setTotalMatches } from "../../store/userSlice";
import { URLs } from "../../utils/urls";

const QueryBoard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const totalMatches = useSelector(state => totalMatchesSelector(state));
    
    useEffect(() => {
      dispatch(onQuerySelectThunk({ ids: ['jd_resume_similarity'] }));
    }, [dispatch]);


    const handleProceed = () => {
      // Add your logic to proceed to the next step
      console.log("Proceed to the next step");
      dispatch(updateStatusForStep({ id: "match", status: "completed"}));
      dispatch(updateStatusForStep({ id: "reports", status: "enabled"}));
      dispatch(updateStepToActive({ id: "reports"}));    
      navigate(URLs.REPORTS);
    };

    return (
        <>
            <JDResumeSimilarityWidget />
            <div className="mt-4"><PromptActions/></div>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" onClick={handleProceed}>
              <span className="fw-semibold">Continue to Export</span>
              </Button>
            </div>
        </>
    );
};

export default QueryBoard;
