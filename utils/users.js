var useArray = [];

function userJoin(id, name, branch_id) {
    const user = { id, name, branch_id };
    useArray.push(user);
    return user;
}

function getUser(id){
    return useArray.find(user => user.id === id);
}

function userLeave(id){
    const index = useArray.findIndex(user => user.id === id);
    if(index !== -1){
        return useArray.splice(index, 1)[0];
    }
}

function getBranchUsers(branch_id){
    return useArray.filter(user => user.branch_id === branch_id);
}

module.exports = {
    userJoin,
    getUser,
    userLeave,
    getBranchUsers
}

