Usage

```
const store = new ReduxStoreBuilder()
  .addMiddleware(routerMiddleware)
  .addMiddleware(sagaMiddleware)
  .addEnhancer(someEnhancer)
  .build(combineReducers(...))
```