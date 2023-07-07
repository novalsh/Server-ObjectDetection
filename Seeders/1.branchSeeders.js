'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('branch', [
      {
        name: 'Malang',
        city: 'Malang',
        from_active_time: '09:00:00',
        to_active_time: '17:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kemanggisan',
        city: 'Kemanggisan',
        from_active_time: '08:30:00',
        to_active_time: '16:30:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('branch', null, {});
  }
};
