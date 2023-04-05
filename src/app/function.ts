export let users = [];

export const addUser = (userData, socketId) => {
  !users.some((user) => user.id === userData.id) &&
    users.push({ ...userData, socketId });
};

export const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId) => {
  return users.find((user) => user.id === userId);
};
