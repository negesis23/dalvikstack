package com.dalvikstack.infra;

import fi.iki.elonen.NanoHTTPD;
import com.dalvikstack.core.Config;
import com.dalvikstack.infra.router.Router;
import com.dalvikstack.infra.handler.HomeHandler;
import com.dalvikstack.infra.handler.SpecsHandler;
import com.dalvikstack.infra.handler.AssetHandler;
import com.dalvikstack.infra.handler.HmrHandler;

public final class Application extends NanoHTTPD {
    private final Router router;

    public Application() {
        super(Config.PORT);
        this.router = new Router();
        this.router.addRoute("/", new HomeHandler());
        this.router.addRoute("/specs", new SpecsHandler());
        
        if (Config.DEV_MODE) {
            HmrHandler hmr = new HmrHandler();
            this.router.addRoute("/hmr", hmr);
            this.router.addRoute("/hmr/trigger", hmr);
            System.out.println("[DalvikStack] HMR endpoint active");
        }
        
        this.router.setAssetHandler(new AssetHandler());
    }

    @Override
    public Response serve(IHTTPSession session) {
        Response res = router.dispatch(session);
        return res != null ? res : newFixedLengthResponse(Response.Status.NOT_FOUND, MIME_PLAINTEXT, "404");
    }

    public static void main(String[] args) {
        try {
            Application app = new Application();
            app.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
            System.out.println("[DalvikStack] Service up: http://localhost:" + Config.PORT);
            Thread.currentThread().join();
        } catch (Exception e) {
            System.exit(1);
        }
    }
}
