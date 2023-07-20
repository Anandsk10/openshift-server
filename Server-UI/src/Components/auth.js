// let loggedPerson;
// const useAuth = () => {
//   const user = localStorage.getItem("Role");
//   if (user) {
//     // loggedPerson = JSON.parse(user);
//     // console.log(loggedPerson.role, "user.role");
//     // loggedPerson = JSON.parse(user);
//     loggedPerson = user;
//     return loggedPerson;
//   } else {
//     return false;
//   }
// };

let loggedPerson;
const useAuth = () => {
  const user = localStorage.getItem("loggedInUserDetails");
  if (user) {
    loggedPerson = JSON.parse(user);
    // console.log(loggedPerson.Role, "user.role");
    // loggedPerson = JSON.parse(user);
    return loggedPerson;
  } else {
    return false;
  }
};

// let loggedPerson;
// const useAuth = () => {
//   const user = localStorage.getItem("user");
//   if (user) {
//     loggedPerson = JSON.parse(user);
//     console.log(loggedPerson.role, "user.role");
//     // loggedPerson = JSON.parse(user);
//     return loggedPerson;
//   } else {
//     return false;
//   }
// };

export default useAuth;
