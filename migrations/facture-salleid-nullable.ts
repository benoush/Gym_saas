import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(
      "factures",
      "salle_id",
      {
        type: DataTypes.UUID,
        allowNull: true,
      }
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn(
      "factures",
      "salle_id",
      {
        type: DataTypes.UUID,
        allowNull: false,
      }
    );
  },
};