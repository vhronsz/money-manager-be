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
  return db.createTable("expenses",
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
          name: "expenses_user_id_fk",
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
        type: "string",
        defaultValue: Date.now()
      },
      "deleted_at": "string"
    }, createExpensesTransactionsTable);

  function createExpensesTransactionsTable(err) {
    if (err) {
      throw (err);
    } else {

      return db.createTable("expense_transactions",
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
              name: "expense_transactions_user_id_fk",
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
              name: "expense_transactions_fund_id_fk",
              table: "expenses",
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
            type: "string",
            defaultValue: Date.now()
          },
          "deleted_at": "string"
        });
    }
  }
};

exports.down = function (db) {
  return db.dropTable("expense_transactions").then(
    function () {
      db.dropTable("expense");
    }
  );
};

exports._meta = {
  "version": 1
};
