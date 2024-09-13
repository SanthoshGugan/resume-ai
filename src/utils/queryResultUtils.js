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
