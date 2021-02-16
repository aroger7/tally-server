module.exports = (sequelize, DataTypes) => {
  const AppDay = sequelize.define('appDay', {
    year: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER },
    day: { type: DataTypes.INTEGER },
    peak: { type: DataTypes.INTEGER },
    average: { type: DataTypes.NUMERIC(15, 2) },
    gain: { type: DataTypes.NUMERIC(15, 2) },
    percentGain: { type: DataTypes.NUMERIC(10, 2) }
  },
  {
    indexes: [
      { 
        unique: true,
        fields: ['app_id', 'year', 'month', 'day']
      }
    ]
  });

  AppDay.associate = (models) => {
    models.AppDay.belongsTo(models.App, { onDelete: 'CASCADE', allowNull: false });
  };

  return AppDay;
}