export const DBConfig = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'people',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'uuid', keypath: 'uuid', options: { unique: true } }
        ]
      }
    ]
  };