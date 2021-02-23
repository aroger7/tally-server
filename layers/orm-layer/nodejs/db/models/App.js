module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define('app', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.STRING, allowNull: false },
    current: { type: DataTypes.INTEGER, defaultValue: 0 },
    average: { type: DataTypes.NUMERIC(15,2) },
    average24Hours: { type: DataTypes.NUMERIC(15,2) },
    peak: { type: DataTypes.INTEGER },
    peak24Hours: { type: DataTypes.INTEGER }
  });

  App.associate = (models) => {
    models.App.hasMany(models.PlayerCount, { onDelete: 'CASCADE', allowNull: false });
    models.App.hasMany(models.AppDay, { onDelete: 'CASCADE', allowNull: false });
    models.App.hasMany(models.AppMonth, { onDelete: 'CASCADE', allowNull: false });
    models.App.hasMany(models.AppYear, { onDelete: 'CASCADE', allowNull: false });
  };

  return App;
};