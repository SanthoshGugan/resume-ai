// PromptActions.js
import React, { useEffect, useState } from 'react';
import './PromptActions.css';
import { FaUser, FaUserCheck, FaStar, FaLock } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";
import { onQuerySelectThunk } from '../../store/thunks/queryButtonThunks';
import { useDispatch, useSelector } from 'react-redux';
import { longPollQueries } from '../../store/thunks/queryThunks';
import { selectJdKey } from '../../store/selectors/jdSelector';
import { domainsQueryEnabledSelector, fetchInProgressQueries, isFetchInProgressByQueryId, remainingQueriesSelector, selectQueryResultsById, selectQueryResultsByIds } from '../../store/selectors/queryResultsByIdsSelector';
import { Button, Spinner } from 'react-bootstrap';

const prompts = [
  { id: "jd_resume_similarity", label: "Show resumes with over 80% match in front-end skills", category: 'Skills Match', accessibility: 'guest' },
  { id: "label", label: "Add Labels to Candidates", category: 'Skills Match', accessibility: 'signup' },
  // { id: 3, label: "Filter candidates with 5+ years of experience in full stack development", category: 'Experience and Companies', accessibility: 'early-access' },
  { id: "companies", label: "Show resumes of candidates who have worked at top tech companies like Google, Amazon, or Facebook", category: 'Experience and Companies', accessibility: 'premium' },
  { id: "label", label: "Show Front End Skill Percentages ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "front_end" },
  { id: "label", label: "Show Back End Skill Percentages ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "back_end" },
  // { id: "label", label: "Show Database Skill Percentages ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "database" },
  { id: "label", label: "Show Cloud Skill Percentages ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "cloud" },
  { id: "label", label: "Show Dev Ops Skill Percentages ", category: 'Location-Based Filtering', accessibility: 'guest', domain: "devops" },
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
  const handleCategoryChange = (category) => {
    setSelectedCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  useEffect(() => {
    if (remainingQueries.length > 0) {
      dispatch(longPollQueries(jd_key));
      //   console.log(`triggering long pollling`);
    }
  }, [remainingQueries.length]);

  const isDisabled = (prompt) => {
    const { domain, id } = prompt;
    if (!domain) return isActiveList.includes(prompt.id) || queryBySelectorId[prompt.id] !== undefined;
    return domainQueryEnabled.includes(domain) || isActiveList.includes(prompt.id);
  }

  const isComplete = (prompt) => {
    const { domain, id } = prompt;
    if (!domain) return queryBySelectorId[id] !== undefined;
    return domainQueryEnabled.includes(domain);
  }

  const renderPromptBadge = (prompt) => {
    return (
      <Button
        key={prompt.id}
        className={`prompt-badge ${prompt.accessibility}`}
        onClick={() => dispatch(onQuerySelectThunk({ id: prompt.id, domain: prompt?.domain }))}
        title={prompt.accessibility === 'premium' ? 'Available on Premium' : ''}
        disabled={isDisabled(prompt)} // Disable button while query fetch is in progress
        style={{
          backgroundColor: 'transparent',
          // border: 'none',
          // padding: '0',
          display: 'inline-flex',
          alignItems: 'center',
          // cursor: prompt.accessibility === 'premium' ? 'not-allowed' : 'pointer',
          fontSize: 'inherit',
          color: 'inherit'
        }}
      >
        {getIcon(prompt.accessibility)}
        {prompt.label}
        {isActiveList.includes(prompt.id) && (<Spinner />)}
        {isComplete(prompt) && (<TiTick color='green'/>)}
      </Button>
    );
  };

  return (
    <div className="prompt-actions-container">
      {/* <div className="filter-box">
        {categories.map(category => (
          <label key={category}>
            <input
              type="checkbox"
              checked={selectedCategories[category]}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div> */}
      <div className="prompt-actions">
        {prompts.filter(prompt => selectedCategories[prompt.category]).map(prompt => renderPromptBadge(prompt))}
      </div>
    </div>
  );
};

export default PromptActions;