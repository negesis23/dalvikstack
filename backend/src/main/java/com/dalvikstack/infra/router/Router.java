package com.dalvikstack.infra.router;

import fi.iki.elonen.NanoHTTPD;
import java.util.Map;
import java.util.HashMap;

public final class Router {
    private final Map<String, Handler> routes = new HashMap<String, Handler>();
    private Handler assetHandler;

    public void addRoute(String path, Handler handler) {
        routes.put(path, handler);
    }

    public void setAssetHandler(Handler handler) {
        this.assetHandler = handler;
    }

    public NanoHTTPD.Response dispatch(NanoHTTPD.IHTTPSession session) {
        String uri = session.getUri();
        if (uri == null) return null;
        
        Handler h = routes.get(uri);
        if (h != null) return h.handle(session);
        
        if (assetHandler != null) return assetHandler.handle(session);
        
        return null;
    }
}
