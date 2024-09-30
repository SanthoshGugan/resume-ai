import { useEffect } from "react";
import PromptActions from "../match-list/PromptActions";
import JDResumeSimilarityWidget from "../Widget/JdResumeSimilarityWidget";
import { useDispatch } from "react-redux";
import { onQuerySelectThunk } from "../../store/thunks/queryButtonThunks";

const QueryBoard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(onQuerySelectThunk({ ids: ['jd_resume_similarity','label']}));
    }, []);
    return (
        <>
            <JDResumeSimilarityWidget/>
            <PromptActions/>
        </>
    );
};

export default QueryBoard;