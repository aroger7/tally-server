module.exports = async ({ sequelize }) => {  
  console.log('updating all time stats');
  await sequelize.query(`
    UPDATE apps
    SET (average, peak) = (
      SELECT
        AVG(average) AS average,
        MAX(peak) AS peak
      FROM app_years
      WHERE app_years.app_id=apps.id
      GROUP BY app_years.app_id
    )
  `);
  console.log('all time stats successfully updated');
}