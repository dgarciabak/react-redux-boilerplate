import _ from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from '../actions/action-types';


const initialModes = {
  isHomeScreen: true,
  isAddCoursesMode: false,
  isManageCoursesMode: false,
  isDeleteMode: false,
  isDeleteDialogVisible: false,
  isAdminDeleteDialogVisible: false,
  isEditProfileDialogVisible: false,
  isExpanded: false,
  isSendAttendanceMode: false,
  isAttendanceHistoryMode: false,
  isScanMode: false,
  isRequestMode: false,
  isAdmin: true,
  isScanner: true, // TODO: Change
};

const initialState = {
  ...initialModes,

  loading: true,
  title: 'MISTERS',
  currentScreen: null,
  activeCourse: null,
  masterCourses: [],
  coursesToBeDeleted: [],
  attendance: [],
  recentAttendance: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IS_LOADING: {
      return Object.assign({}, state, {
        loading: action.loading,
      });
    }
    case types.SET_TITLE: {
      return Object.assign({}, state, {
        title: action.title,
      });
    }
    case types.SET_MASTER_COURSES: {
      return Object.assign({}, state, {
        masterCourses: action.masterCourses,
      });
    }
    case types.SET_ATTENDANCE: {
      return Object.assign({}, state, {
        attendance: action.attendance,
      });
    }
    case types.SET_RECENT_ATTENDANCE: {
      return Object.assign({}, state, {
        recentAttendance: action.attendance,
      });
    }
    case types.ADD_USER_TO_ATTENDANCE: {
      return Object.assign({}, state, {
        recentAttendance: state.recentAttendance.concat(action.result),
      });
    }
    case types.SET_DELETE_COURSES: {
      return Object.assign({}, state, {
        coursesToBeDeleted: action.courses,
      });
    }
    case types.REMOVE_COURSE_TO_BE_DELETED: {
      const {
        course: {
          professor,
          title,
        },
      } = action;
      const {
        coursesToBeDeleted,
      } = state;
      const courses = _.filter(
        coursesToBeDeleted,
        course => !(course.professor === professor && course.title === title),
      );
      return Object.assign({}, state, {
        coursesToBeDeleted: courses,
      });
    }
    case types.REMOVE_ALL_COURSES_TO_BE_DELETED: {
      return Object.assign({}, state, {
        coursesToBeDeleted: [],
      });
    }
    case types.ADD_COURSE_TO_BE_DELETED: {
      const courses = state.coursesToBeDeleted.concat(action.course);
      return Object.assign({}, state, {
        coursesToBeDeleted: courses,
      });
    }
    case types.SET_ACTIVE_COURSE: {
      const { course } = action;
      const activeCourse = !_.isEqual(state.activeCourse, course) ? course : null;
      return Object.assign({}, state, {
        activeCourse,
      });
    }
    case types.SET_DIALOG_VISIBILITY: {
      const { dialog, visible } = action;
      const updatedState = {};
      if (dialog === 'DELETE') {
        if (updatedState.isDeleteDialogVisible !== visible) {
          updatedState.isDeleteDialogVisible = visible;
        }
      } else if (dialog === 'ADMIN_DELETE') {
        if (updatedState.isAdminDeleteDialogVisible !== visible) {
          updatedState.isAdminDeleteDialogVisible = visible;
        }
      }
      return Object.assign({}, state, updatedState);
    }
    case types.ADD_MASTER_COURSE_TO_STATE: {
      const {
        course: {
          professor,
        },
        course,
      } = action;
      let { masterCourses } = state;
      const existingEntry = _.find(masterCourses, ['professor', course.professor]);
      const existingCourses = _.get(existingEntry, 'courses', []);
      const newEntry = {
        professor,
        courses: [
          ...existingCourses,
          {
            ...course,
          },
        ],
      };
      masterCourses = _.filter(
        masterCourses,
        mCourse => !_.isEqual(mCourse.professor, course.professor),
      );
      masterCourses = masterCourses.concat(newEntry);
      return Object.assign({}, state, {
        masterCourses,
      });
    }
    case types.REMOVE_MASTER_COURSE_FROM_STATE: {
      const { course } = action;
      let { masterCourses } = state;
      masterCourses = _.map(
        masterCourses,
        (masterCourse) => {
          let { courses: mCourses } = masterCourse;
          mCourses = _.filter(mCourses, mCourse => mCourse._id !== course._id); // eslint-disable-line
          return {
            ...masterCourse,
            courses: mCourses,
          };
        },
      );
      return Object.assign({}, state, {
        masterCourses,
      });
    }
    case LOCATION_CHANGE: {
      switch (action.payload.pathname) {
        case '/': {
          return Object.assign({}, state, {
            ...initialModes,
            title: 'MISTERS',
          });
        }
        case '/courses/add': {
          return Object.assign({}, state, {
            ...initialModes,
            isAddCoursesMode: true,
            title: 'MISTERS',
          });
        }
        case '/request': {
          return Object.assign({}, state, {
            ...initialModes,
            isRequestMode: true,
            title: 'MISTERS',
          });
        }
        case '/courses/delete': {
          return Object.assign({}, state, {
            ...initialModes,
            isDeleteMode: true,
            title: 'MISTERS',
          });
        }
        case '/admin/manage': {
          return Object.assign({}, state, {
            ...initialModes,
            isManageCoursesMode: true,
            title: 'MISTERS - Admin',
          });
        }
        case '/admin/attendance': {
          return Object.assign({}, state, {
            ...initialModes,
            isAttendanceHistoryMode: true,
            title: 'MISTERS - Admin',
          });
        }
        case '/scan': {
          return Object.assign({}, state, {
            ...initialModes,
            isScanMode: true,
            title: 'MISTERS - Scanner',
          });
        }
        default: {
          return state;
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
