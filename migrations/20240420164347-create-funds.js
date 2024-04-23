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
  return db.createTable("funds",
    {
      "id": {
        type: "bigint",
        primaryKey: true,
        autoIncrement: true
      },
      "user_id": {
        type: "bigint",
        notNull: true,
        foreignKey: {
          name: "funds_user_id_fk",
          table: "users",
          rules: {
            onUpdate: "cascade",
            onDelete: "cascade"
          },
          mapping: "id"
        }
      },
      "name": {
        type: "string",
        notNull: true
      },
      "total": {
        type: "decimal",
        notNull: true
      },
      "created_at": {
        type: "datetime",
        defaultValue: Date.now()
      },
      "deleted_at": {
        type: "datetime",
        defaultValue: Date.now()
      }
    }, createFundTransactionsTable);

  function createFundTransactionsTable(err) {
    if (err) {
      throw (err);
    } else {

      return db.createTable("fund_transactions",
        {
          "id": {
            type: "bigint",
            primaryKey: true,
            autoIncrement: true
          },
          "user_id": {
            type: "bigint",
            notNull: true,
            foreignKey: {
              name: "fund_transactions_user_id_fk",
              table: "users",
              rules: {
                onUpdate: "cascade",
                onDelete: "cascade"
              },
              mapping: "id"
            }
          },
          "fund_id": {
            type: "bigint",
            notNull: true,
            foreignKey: {
              name: "fund_transactions_fund_id_fk",
              table: "funds",
              rules: {
                onUpdate: "cascade",
                onDelete: "cascade"
              },
              mapping: "id"
            }
          },
          "description": "string",
          "total": {
            type: "decimal",
            notNull: true
          },
          "created_at": {
            type: "datetime",
            defaultValue: Date.now()
          },
          "deleted_at": {
            type: "datetime",
            defaultValue: Date.now()
          }
        })
    }
  }
};

exports.down = function (db) {
  return db.dropTable("fund_transactions").then(
    function () {
      db.dropTable("funds");
    }
  );
};

exports._meta = {
  "version": 1
};
