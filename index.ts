{
  "version": "5",
  "dialect": "mysql",
  "id": "6a5dd9b9-fdaa-4c36-ab92-fa7c56218dcf",
  "prevId": "5aedca6f-67cf-433d-9cdc-c241b85b3794",
  "tables": {
    "inchise": {
      "name": "inchise",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "client": {
          "name": "client",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "produs": {
          "name": "produs",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "judet": {
          "name": "judet",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "localitate": {
          "name": "localitate",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "feedback": {
          "name": "feedback",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "inchise_id": {
          "name": "inchise_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "service": {
      "name": "service",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "caz_numarul": {
          "name": "caz_numarul",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "client": {
          "name": "client",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "comanda_de_lucru": {
          "name": "comanda_de_lucru",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "raspunsuri_comenzi": {
          "name": "raspunsuri_comenzi",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "produs": {
          "name": "produs",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "serie": {
          "name": "serie",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "problema": {
          "name": "problema",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "data_sesizare": {
          "name": "data_sesizare",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "data_receptie": {
          "name": "data_receptie",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "solutionare": {
          "name": "solutionare",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "motiv_garantie": {
          "name": "motiv_garantie",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "data_iesire": {
          "name": "data_iesire",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "finalizat": {
          "name": "finalizat",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "service_id": {
          "name": "service_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "servicii": {
      "name": "servicii",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "produs": {
          "name": "produs",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "data_control": {
          "name": "data_control",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "vanzator": {
          "name": "vanzator",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "cumparator": {
          "name": "cumparator",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "raspunsuri": {
          "name": "raspunsuri",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "comenzi_de_lucru": {
          "name": "comenzi_de_lucru",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "valoare": {
          "name": "valoare",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "plata": {
          "name": "plata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rata2": {
          "name": "rata2",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rata3": {
          "name": "rata3",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rata4": {
          "name": "rata4",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "bonus": {
          "name": "bonus",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "servicii_suplimentare": {
          "name": "servicii_suplimentare",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "livrare_cf_contract": {
          "name": "livrare_cf_contract",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "data_montaj": {
          "name": "data_montaj",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "pif_cf_contract": {
          "name": "pif_cf_contract",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "judet": {
          "name": "judet",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "localitate": {
          "name": "localitate",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "detalii": {
          "name": "detalii",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "mentiuni": {
          "name": "mentiuni",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "servicii_id": {
          "name": "servicii_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "stoc_real": {
      "name": "stoc_real",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "produs": {
          "name": "produs",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "de_comandat": {
          "name": "de_comandat",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "disponibil_vanzare": {
          "name": "disponibil_vanzare",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "vanzator": {
          "name": "vanzator",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "status": {
          "name": "status",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "cumparator": {
          "name": "cumparator",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "raspunsuri_vanzatori": {
          "name": "raspunsuri_vanzatori",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "comenzi_de_lucru": {
          "name": "comenzi_de_lucru",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "valoare_contract": {
          "name": "valoare_contract",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "plata": {
          "name": "plata",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rata2": {
          "name": "rata2",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rata3": {
          "name": "rata3",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "bonus": {
          "name": "bonus",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "servicii_suplimentare": {
          "name": "servicii_suplimentare",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rata2_livrare_structura": {
          "name": "rata2_livrare_structura",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "data_approx_livrare": {
          "name": "data_approx_livrare",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "rata_finala_pif": {
          "name": "rata_finala_pif",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "judet": {
          "name": "judet",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "localitate": {
          "name": "localitate",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "detalii": {
          "name": "detalii",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "index_nr": {
          "name": "index_nr",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "comentarii_operational": {
          "name": "comentarii_operational",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "stoc_real_id": {
          "name": "stoc_real_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {},
      "checkConstraint": {}
    },
    "users": {
      "name": "users",
      "columns": {
        "id": {
          "name": "id",
          "type": "int",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": true
        },
        "openId": {
          "name": "openId",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "email": {
          "name": "email",
          "type": "varchar(320)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "loginMethod": {
          "name": "loginMethod",
          "type": "varchar(64)",
          "primaryKey": false,
          "notNull": false,
          "autoincrement": false
        },
        "role": {
          "name": "role",
          "type": "enum('user','admin')",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "'user'"
        },
        "createdAt": {
          "name": "createdAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        },
        "updatedAt": {
          "name": "updatedAt",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "onUpdate": true,
          "default": "(now())"
        },
        "lastSignedIn": {
          "name": "lastSignedIn",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "autoincrement": false,
          "default": "(now())"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {
        "users_id": {
          "name": "users_id",
          "columns": [
            "id"
          ]
        }
      },
      "uniqueConstraints": {
        "users_openId_unique": {
          "name": "users_openId_unique",
          "columns": [
            "openId"
          ]
        }
      },
      "checkConstraint": {}
    }
  },
  "views": {},
  "_meta": {
    "schemas": {},
    "tables": {},
    "columns": {}
  },
  "internal": {
    "tables": {},
    "indexes": {}
  }
}