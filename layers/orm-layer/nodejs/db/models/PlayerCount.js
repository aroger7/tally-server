module.exports = (sequelize, DataTypes) => {
  const PlayerCount = sequelize.define('playerCount', {
    count: { type: DataTypes.INTEGER() }
  }, 
  {
    indexes: [
      {
        unique: false,
        fields: ['app_id', 'created_at']
      }
    ],
    timestamps: true,
    updatedAt: false
  });

  PlayerCount.associate = models => {
    models.PlayerCount.belongsTo(models.App, { onDelete: 'CASCADE', allowNull: false });
  }

  return PlayerCount;
};