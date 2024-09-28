import { useEffect } from "react";
import PromptActions from "../match-list/PromptActions";
import JDResumeSimilarityWidget from "../Widget/JdResumeSimilarityWidget";
import { useDispatch } from "react-redux";
import { onQuerySelectThunk } from "../../store/thunks/queryButtonThunks";

const QueryBoard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(onQuerySelectThunk({ id: 'jd_resume_similarity'}));
    }, []);
    return (
        <>
            <JDResumeSimilarityWidget/>
            <PromptActions/>
        </>
    );
};

export default QueryBoard;