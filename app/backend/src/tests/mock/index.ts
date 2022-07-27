const Users = require('./userMock');

const mockCreate = (Instance: any, data: any) => {
  if(!data){
    return;
  }

  const newData = data;
  if(!!Instance[0].id) {
    newData.id = Date.now();
  }
  Instance.push(newData);
  return newData;
};

const User = {
  // create: async (data) => createMock(Users, data),
  findAll: /* async */ () => Users,
};

export  {
  User,
};