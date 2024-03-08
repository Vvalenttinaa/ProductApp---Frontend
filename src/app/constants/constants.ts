export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
  };

  const apiurl = 'http://localhost:5094/api';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/Auth/login`,
    logout: `${apiurl}/logout`,
    loggedUser: `${apiurl}/user`,
    register: `${apiurl}/Auth/register`
  },
  TodoEndpoint: {
    getAllTodo: `${apiurl}/todo`,
    addTodo: `${apiurl}/todo`,
    updateTodo: `${apiurl}/todo`,
  },
  AttributeNameEndpoint: {
    addAttributeName: `${apiurl}/AttributeName`,
    getAllAttributes: `${apiurl}/AttributeName`
  },
  UnitEndpoint: {
    findIdByName : `${apiurl}/Unit/findIdByName`,
    exist: `${apiurl}/Unit/exist`,
    save: `${apiurl}/Unit`
  },
  ProductEndpoint:{
    addProduct: `${apiurl}/Products`,
    getAll: `${apiurl}/Products`
  },
  TypeEndpoint: {
    findIdByName : `${apiurl}/Type/findIdByName`,
    exist: `${apiurl}/Type/exist`,
    save: `${apiurl}/Type`
  },



};