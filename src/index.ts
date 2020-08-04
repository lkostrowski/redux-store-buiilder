import {
	AnyAction,
	applyMiddleware,
	createStore,
	Middleware,
	Reducer,
	Store,
	StoreEnhancer,
} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

export type State = {}
export type Action = AnyAction;

export class ReduxStoreBuilder<S extends {} = State, A extends AnyAction = Action> {
	private middlewares: Middleware[] = [];
	private enhancers: StoreEnhancer[] = [];
	private endCallbacks: Array<() => unknown> = [];


	constructor() {
	}

	/**
	 * addMiddleware and addEnhancer are core methods for this builder
	 */
	addMiddleware(middleware: Middleware) {
		this.middlewares.push(middleware);

		return this;
	}

	addEnhancer(enhancer: StoreEnhancer) {
		this.enhancers.push(enhancer);

		return this;
	}

	build(reducers: Reducer<S>): Store<S, A> {
		const enhancers = composeWithDevTools(applyMiddleware(...this.middlewares), ...this.enhancers);

		const store = createStore<S, A, any, any>(reducers, enhancers);

		this.endCallbacks.forEach((fn) => fn());

		return store;
	}
}
