import { createSlice } from '@reduxjs/toolkit';
import { addSkillToJobDescription, removeSkillFromJobDescription } from './reducerUtil/jobDescriptionReducerUtil';

const initialState = {
  key: { s3_key: '', s3_bucket: ''},
  jd: {id: ''},
  skills: {
    byCategory: {},
    newSkills: []
  },
  isSkillUpdated: false,
  isJDUploaded: false,
  isJDAdded: false
};

const jobDescriptionSlice = createSlice({
  name: 'jobDescription',
  initialState,
  reducers: {
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
      }
    },
    initSkill: (state, action) => {
      const skills  = action.payload;
      state.skills.byCategory = {...skills};
    },
    addSkill: (state, action) => {
      const { skill, categoryName } = action.payload;
      state.jd = addSkillToJobDescription(state, state.jd.dimensions?.domains[0].roles[0].skills, skill, categoryName, "core");
      state.skills.newSkills = [...state.skills?.newSkills, { skill, categoryName}];
    },
    removeSkill: (state, action) => {
      // const { skill, categoryName,  } = action.payload;
      // state.jd = removeSkillFromJobDescription(state, state.jd.dimensions?.domains[0].roles[0].skills, skill, skillName, categoryName);
      // state.skills.newSkills = state.skills?.newSkills.filter(newSkill => newSkill.skill !== skill) || [];
    },
    setIsSkillUpdated: (state, action) => {
      state.isSkillUpdated = action.payload;
      state.skills.newSkills = [];
    },
    setIsJDUploaded: (state, action) => {
      state.isJDUploaded = action.payload;
    },
    setIsJDAdded: (state, action) => {
      state.isJDAdded = action.payload
    }
  },
});

export const {
  initSkill,
  addKey,
  addJd,
  addSkill,
  updatedJD,
  setIsSkillUpdated,
  setIsJDUploaded,
  setIsJDAdded  
} = jobDescriptionSlice.actions;

export default jobDescriptionSlice.reducer;