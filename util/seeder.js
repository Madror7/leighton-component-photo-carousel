/* eslint linebreak-style: ["error", "windows"] */

const Sequelize = require('sequelize');
const faker = require('faker');
const { mysqlUser, mysqlPass } = require('../config');

// TODO: use config file for user/password later
const sequelize = new Sequelize('xillow', mysqlUser, mysqlPass, {
  dialect: 'mysql',
});

const Photo = sequelize.define('photo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  property_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Property = sequelize.define('property', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bed_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bath_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sq_ft: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Property.hasMany(Photo, { foreignKey: 'property_id', sourceKey: 'id' });
Photo.belongsTo(Property, { foreignKey: 'property_id', targetKey: 'id' });

sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(() => sequelize.drop())
  .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
  .then(() => Property.sync({ force: true }))
  .then(() => Photo.sync({ force: true }))
  .then(() => {
    const promises = [];
    for (let i = 0; i < 100; i += 1) {
      promises.push(Property.build({
        name: faker.address.streetAddress(),
        price: faker.random.number({
          min: 500000,
          max: 30000000,
        }),
        bed_count: faker.random.number({
          min: 2,
          max: 30,
        }),
        bath_count: faker.random.number({
          min: 1,
          max: 7,
        }),
        sq_ft: faker.random.number({
          min: 1000,
          max: 30000,
        }),
      }).save());
      const numImages = faker.random.number({
        min: 20,
        max: 50,
      });
      for (let j = 0; j < numImages; j += 1) {
        promises.push(Photo.build({
          url: `https://s3-us-west-1.amazonaws.com/xillow-talk-photos/property_photos/sample${i + 1}.jpg`,
          property_id: i,
        }).save());
      }
    }

    return Promise.all(promises)
      .catch(() => {});
  })
  .then(() => sequelize.close());
