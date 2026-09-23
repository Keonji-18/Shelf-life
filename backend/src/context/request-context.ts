import {AsyncLocalStorage} from "node:async_hooks";

interface RequestContext {

    requestId: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export function getRequestId(){

    return requestContext.getStore()?.requestId;
}