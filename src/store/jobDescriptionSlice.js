import { createSlice } from '@reduxjs/toolkit';
import { addSkillToJobDescription, removeSkillFromJobDescription } from './reducerUtil/jobDescriptionReducerUtil';
import { JD_UPDATE_SKILL_STATUS, JD_UPLOAD_STATUS } from '../utils/constants';

const initialState = {
  key: '',
  jd: {id: ''},
  initialDimensions: {},
  skills: {
    byCategory: {},
    newSkills: [],
    categories: []
  },
  isSkillUpdated: false,
  isJDAdded: false,
  jdUploadStatus: JD_UPLOAD_STATUS.JD_WORKFLOW_IDLE,
  jdSkillUpdateSkill: '',
  jdUpdateSkillStatus: JD_UPDATE_SKILL_STATUS.IDLE,
  jdFetchRetries: 0,
  maxAllowedJdRetries: 18
};

const jobDescriptionSlice = createSlice({
  name: 'jobDescription',
  initialState,
  reducers: {
    jdReset: state => initialState,
    addKey: (state, action) => {
      console.log(`key ${JSON.stringify(action.payload)}`);
      state.key = action.payload;
    },
    updatedJD: (state, action) => {
      const { summary, dimensions: str, status, text, id } = action.payload;
      const dimensions = JSON.parse(str);
      state.jd = {
        ...state.jd,
        summary,
        dimensions,
        status,
        text,
        id
      };
      state.initialDimensions = {
        ...dimensions
      };
    },
    initSkill: (state, action) => {
      const skills  = action.payload;
      state.skills.byCategory = {...skills};
      for (const skill in skills) {
        if (!state.skills?.categories.includes(skill))
          state.skills.categories = [...state.skills?.categories, skill];
      }
    },
    addSkill: (state, action) => {
      const { skill, categoryName } = action.payload;
      state.jd = addSkillToJobDescription(state, state.jd.dimensions?.domains[0].roles[0].skills, skill, categoryName, "core");
      state.skills.newSkills = [...state.skills?.newSkills, { skill, categoryName}];
    },
    removeSkill: (state, action) => {
      const { skill, categoryName  } = action.payload;
      state.jd = removeSkillFromJobDescription(state, state.jd.dimensions?.domains[0].roles[0].skills, skill, categoryName, "core");
      state.skills.newSkills = state.skills?.newSkills.filter(newSkill => newSkill.skill !== skill) || [];
    },
    setIsSkillUpdated: (state, action) => {
      state.isSkillUpdated = action.payload;
      state.skills.newSkills = [];
    },
    setIsJDAdded: (state, action) => {
      state.isJDAdded = action.payload
    },
    setJDUploadStatus: (state, action) => {
      state.jdUploadStatus = action.payload;
    },
    setJDSkillUpdateSkill: (state, action) => {
      state.jdSkillUpdateSkill = action.payload;
    },
    setJDUpdateSkillStatus: (state, action) => {
      state.jdUpdateSkillStatus = action.payload;
    },
    setJdFetchFailed: (state, action) => {
      state.jdUploadStatus = JD_UPLOAD_STATUS.JD_WORKFLOW_FAILED;
    },
    setJdSkillUpdateFailed: (state, action) => {
      state.jdSkillUpdateSkill = JD_UPDATE_SKILL_STATUS.FAILED;
    },
    setJdRetries: (state, action) => {
      const retries = action.payload;
      state.jdFetchRetries = retries;
    }
  },
});

export const {
  jdReset,
  initSkill,
  addKey,
  addJd,
  addSkill,
  removeSkill,
  updatedJD,
  setIsSkillUpdated,
  setIsJDAdded,
  setJDUploadStatus,
  setJDSkillUpdateSkill,
  setJDUpdateSkillStatus,
  setJdFetchFailed,
  setJdSkillUpdateFailed,
  setJdRetries
} = jobDescriptionSlice.actions;

export default jobDescriptionSlice.reducer;