/**
 * Checks if all specified queryIds are present in the queryResults object and properly populated.
 *
 * @param {Object} queryResults - The object containing query results, keyed by queryId.
 * @param {Array<string>} queryIds - The array of query IDs to check.
 * @returns {boolean} - Returns true if all queryIds are present and properly populated, otherwise false.
 */
export function areAllQueryIdsPopulated(queryResults, queryIds) {
    return queryIds.every(queryId => {
      const result = queryResults[queryId];
      // Check if the result exists and is not null, undefined, or empty
      return result !== undefined && result !== null && Object.keys(result).length > 0;
    });
};

export function getResumeIdsFromQueryResult(queryResult = {}) {
  let resume_ids = [];
  const { query_id = "" } = queryResult;
  console.log(`queryId in getResumeIdsFromQueryResult:::: ${query_id}   ${JSON.stringify(queryResult)}`);
  switch(query_id) {
    case "jd_resume_similarity":
      console.log(`getResumeIdsFromSimilarityQuery :: ${JSON.stringify(queryResult)}`);
      resume_ids.push(...getResumeIdsFromSimilarityQuery(queryResult));
      break;
    case "label":
      break;
    default:
      break;
  }
  console.log(`ids from query calc ::: ${JSON.stringify(resume_ids)}`);
  return resume_ids;
}

export function getResumeIdsFromSimilarityQuery(queryResult) {
  const { result: { result = []}  = [] } = queryResult;
  return result.map(item => item.resume_id);
}
