// PromptActions.js
import React, { useEffect, useState } from 'react';
import './PromptActions.css';
import { FaUser, FaUserCheck, FaStar, FaLock } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";
import { onQuerySelect } from '../../store/thunks/queryButtonThunks';
import { useDispatch, useSelector } from 'react-redux';
import { longPollQueries } from '../../store/thunks/queryThunks';
import { selectJdKey } from '../../store/selectors/jdSelector';
import { domainsQueryEnabledSelector, fetchInProgressQueries, isFetchInProgressByQueryId, remainingQueriesSelector, selectQueryResultsById, selectQueryResultsByIds } from '../../store/selectors/queryResultsByIdsSelector';
import { Button, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { USER_FLAGS } from '../../utils/constants';
import usePermissions from '../../hooks/usePermissions';

const prompts = [
  { id: "jd_resume_similarity", sid: 1, label: "Explore Resumes with Top Similarity Percentages", category: 'Skills Match', accessibility: 'guest' },
  { id: "label", sid: 2, label: "Tagging Skills: Frontend, Backend, Cloud, etc.", category: 'Skills Match', accessibility: 'guest' },
  // { id: 3, sid:3, label: "Filter candidates with 5+ years of experience in full stack development", category: 'Experience and Companies', accessibility: 'early-access' },
  { id: "companies", sid: 4, label: "Find Out Where Candidates Have Worked", category: 'Experience and Companies', accessibility: 'guest' },
  { id: "label", sid: 5, label: "Explore Percentages of Front end Skills ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "front_end" },
  { id: "label", sid: 6, label: "Explore Percentages of Back end Skills ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "back_end" },
  // { id: "label", sid:7,label: "Show Database Skill Percentages ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "database" },
  { id: "label", sid: 8, label: "Explore Percentages of Cloud Skills ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "cloud" },
  { id: "label", sid: 9, label: "Explore Percentages of Dev ops Skills ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "devops" },
  // { id: 6, label: "List candidates within a 50-mile radius of the job location", category: 'Location-Based Filtering', accessibility: 'signup' },
  // { id: 7, label: "Show resumes with degrees from top-tier universities", category: 'Educational Background', accessibility: 'early-access' },
  // { id: 8, label: "Filter candidates with a Master's degree in Computer Science", category: 'Educational Background', accessibility: 'premium' },
  // { id: 9, label: "Find candidates proficient in React, Node.js, and AWS", category: 'Specific Skills and Certifications', accessibility: 'guest' },
  // { id: 10, label: "Show resumes with certifications in AWS, Google Cloud, or Azure", category: 'Specific Skills and Certifications', accessibility: 'signup' },
  // { id: 11, label: "List candidates who have led or significantly contributed to major projects", category: 'Project Experience', accessibility: 'early-access' },
  // { id: 12, label: "Show resumes with experience in e-commerce application development", category: 'Project Experience', accessibility: 'premium' },
  // { id: 13, label: "Find candidates with relevant experience in the last two years", category: 'Recent Experience', accessibility: 'guest' },
  // { id: 14, label: "Show resumes with recent experience in agile development environments", category: 'Recent Experience', accessibility: 'signup' },
  // { id: 15, label: "Filter candidates with demonstrated leadership or team collaboration skills", category: 'Soft Skills and Additional Attributes', accessibility: 'early-access' },
  // { id: 16, label: "Show resumes with excellent communication skills as highlighted in the summary", category: 'Soft Skills and Additional Attributes', accessibility: 'premium' },
  // { id: 17, label: "List resumes highlighting candidates from diverse backgrounds", category: 'Diversity and Inclusion', accessibility: 'guest' },
  // { id: 18, label: "Show resumes with experience in inclusive work environments", category: 'Diversity and Inclusion', accessibility: 'signup' }
];

const categories = [
  'Skills Match', 'Experience and Companies', 'Location-Based Filtering', 'Educational Background',
  'Specific Skills and Certifications', 'Project Experience', 'Recent Experience',
  'Soft Skills and Additional Attributes', 'Diversity and Inclusion'
];

const getIcon = (accessibility) => {
  switch (accessibility) {
    case 'guest':
      return <FaUser />;
    case 'signup':
      return <FaUserCheck />;
    case 'early-access':
      return <FaStar />;
    case 'premium':
      return <FaLock />;
    default:
      return null;
  }
};

const PromptActions = () => {
  const [selectedCategories, setSelectedCategories] = useState(categories.reduce((acc, category) => ({ ...acc, [category]: true }), {}));

  const jd_key = useSelector(state => selectJdKey(state));
  const remainingQueries = useSelector(state => state.queryResults.remainingQueries);
  const queryBySelectorId = useSelector(state => selectQueryResultsById(state));
  const domainQueryEnabled = useSelector(state => domainsQueryEnabledSelector(state));
  const dispatch = useDispatch();
  const isActiveList = useSelector(state => remainingQueriesSelector(state));
  const {
    [USER_FLAGS.ALLOWED_QUERIES]: allowedQueries
  } = usePermissions([{ name: USER_FLAGS.ALLOWED_QUERIES, defaultVal: [] }]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  const isActiveListQueries = (prompt = {}) => {
    if (isActiveList.includes(prompt.id) && prompt.id == "label" && prompt.sid != 2)
      return false;
    return isActiveList.includes(prompt.id);
  }

  useEffect(() => {
    if (remainingQueries.length > 0) {
      dispatch(longPollQueries(jd_key));
      //   console.log(`triggering long pollling`);
    }
  }, [remainingQueries.length]);

  const isDisabled = (prompt) => {
    const { domain, id } = prompt;
    if (!allowedQueries.includes(id)) return true;
    // const cond1 = (!isActiveList.length && !Object.keys(queryBySelectorId).length) || isActiveList.includes(prompt.id) || queryBySelectorId[prompt.id] !== undefined
    // console.log(`domain: ${domain} id: ${id} cond1: ${cond1} isActiveList: ${JSON.stringify(isActiveList)} queryBySelectorId: ${JSON.stringify(queryBySelectorId)}`)
    if (!domain) return (isActiveList.length && isActiveList.includes(prompt.id)) || !Object.keys(queryBySelectorId).length || queryBySelectorId[prompt.id] !== undefined;
    return domainQueryEnabled.includes(domain) || isActiveList.includes(prompt.id);
  }

  const isComplete = (prompt) => {
    const { domain, id } = prompt;
    if (!domain) return queryBySelectorId[id] !== undefined;
    return domainQueryEnabled.includes(domain);
  }

  const renderPromptBadge = (prompt) => {
    const isQueryRestricted = !allowedQueries.includes(prompt?.id);
    console.log(`${prompt.id} : ${isQueryRestricted}, allowedQueries : ${JSON.stringify(allowedQueries)}`);
    if (!isQueryRestricted) {
      return (
        <Button
          key={prompt.sid}
          className={`prompt-badge ${prompt.accessibility}`}
          onClick={() => dispatch(onQuerySelect({ id: prompt.id, domain: prompt?.domain }))}
          title={prompt.accessibility === 'premium' ? 'Available on Premium' : ''}
          disabled={isDisabled(prompt)} // Disable button while query fetch is in progress
          style={{
            backgroundColor: 'transparent',
            // border: 'none',
            // padding: '0',
            display: 'inline-flex',
            alignItems: 'center',
            cursor: (isDisabled(prompt) || isComplete(prompt)) ? 'not-allowed' : 'pointer',
            fontSize: 'inherit',
            color: 'inherit'
          }}
        >
          {getIcon(prompt.accessibility)}
          {prompt.label}
          {isActiveListQueries(prompt) && (<Spinner />)}
          {isComplete(prompt) && (<TiTick color='green' />)}
        </Button>
      )
    }
    return (
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip>Premium Feature</Tooltip>}
        trigger="hover"
      >
        <Button
          key={prompt.sid}
          className={`prompt-badge ${prompt.accessibility}`}
          onClick={() => {}}
          title={prompt.accessibility === 'premium' ? 'Available on Premium' : ''}
          style={{
            backgroundColor: '#D3D3D3',
            // border: 'none',
            // padding: '0',
            display: 'inline-flex',
            alignItems: 'center',
            cursor:  'not-allowed',
            fontSize: 'inherit',
            color: 'inherit',
            opacity: 0.5
          }}
        >
          {getIcon(prompt.accessibility)}
          {prompt.label}
          {isActiveListQueries(prompt) && (<Spinner />)}
        </Button>

      </OverlayTrigger>

    );
  };

  return (
    <div className="prompt-actions-container">
      <div className="prompt-actions">
        {prompts.filter(prompt => selectedCategories[prompt.category]).map(prompt => renderPromptBadge(prompt))}
      </div>
    </div>
  );
};

export default PromptActions;