'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("users", {
    id: {
      type: "bigint",
      primaryKey: {
        value: true,
        multipleColumn: true
      },
      autoIncrement: true
    },
    auth_user_id: {
      type: "bigint",
      primaryKey: {
        value: true,
        multipleColumn: true
      }
    },
    name: {
      type: "string",
      notNull: true
    },
    email: {
      type: "string",
      notNull: true
    },
    fund_count: {
      type: "int",
      defaultValue: 1
    },
    expense_count: {
      type: "int",
      defaultValue: 1
    },
  });
};

exports.down = function (db) {
  return db.dropTable("users");
};

exports._meta = {
  "version": 1
};
