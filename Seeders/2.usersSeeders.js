'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash('12345', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: passwordHash,
        role: 'admin',
        status: 'active',
        condition: 'none',
        branch_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SuperAdmin',
        email: 'superadmin@example.com',
        password: passwordHash,
        role: 'superadmin',
        status: 'active',
        condition: 'none',
        branch_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
