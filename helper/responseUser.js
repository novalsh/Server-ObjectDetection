const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  
  const validateStatus = (status) => {
    const statusRegex = /active|non-active/;
    return statusRegex.test(status);
  };
  
  const validateCondition = (condition) => {
    const conditionRegex = /none|emergency/;
    return conditionRegex.test(condition);
  };
  
  const validateRole = (role) => {
    const roleRegex = /superadmin|admin|security/;
    return roleRegex.test(role);
  };
  
  const validateBranch = async (branchId) => {
    const branch = await Branch.findByPk(branchId);
    return !!branch;
  };
  
  module.exports = {
    validateEmail,
    validateStatus,
    validateCondition,
    validateRole,
    validateBranch,
  };
  