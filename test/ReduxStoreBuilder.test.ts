import {ReduxStoreBuilder} from "../src";
import {Middleware, StoreEnhancer} from "redux";


describe('ReduxStoreBuilder', () => {
	it('Build store without extras', () => {
		const onDispatch = jest.fn();

		const store = new ReduxStoreBuilder<number>().build((state = 1) => state);
		const unsub = store.subscribe(onDispatch);

		expect(store.getState()).toBe(1);

		store.dispatch(({
			type: '',
		}));

		expect(onDispatch).toBeCalled();

		unsub();
	});

	it('Build store with Middlewares', () => {
		const middlewareFun1 = jest.fn();
		const middlewareFun2 = jest.fn();

		const middleware1: Middleware = (_) => (next) => (action) => {
			middlewareFun1();
			next(action);
		};

		const middleware2: Middleware = (_) => (next) => (action) => {
			middlewareFun2();
			next(action);
		};

		const store = new ReduxStoreBuilder<number>()
			.addMiddleware(middleware1)
			.addMiddleware(middleware2)
			.build((state = 1) => state);

		store.dispatch(({type: 'Any'}));

		expect(middlewareFun1).toHaveBeenCalled();
		expect(middlewareFun2).toHaveBeenCalled();
	});

	it('Build store with Enhancers', () => {
		const onEnhancerApplied = jest.fn();

		const enhancer: StoreEnhancer = (creator) => {
			onEnhancerApplied();
			return creator;
		};

		new ReduxStoreBuilder<number>().addEnhancer(enhancer).build((state = 1) => state);

		expect(onEnhancerApplied).toHaveBeenCalled();
	});


});
