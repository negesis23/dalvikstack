package com.dalvikstack.infra.router;

import fi.iki.elonen.NanoHTTPD;
import org.apache.velocity.VelocityContext;
import com.dalvikstack.core.Config;
import com.dalvikstack.infra.util.TemplateEngine;
import java.util.Properties;
import java.io.InputStream;
import java.util.Arrays;

public abstract class BaseHandler implements Handler {
    private static final Properties assets = new Properties();

    static {
        try {
            InputStream is = BaseHandler.class.getResourceAsStream("/assets.properties");
            if (is != null) {
                assets.load(is);
                is.close();
            }
        } catch (Exception e) {
        }
    }

    protected abstract String getView();
    protected abstract void onLoad(VelocityContext ctx, NanoHTTPD.IHTTPSession session);

    @Override
    public NanoHTTPD.Response handle(NanoHTTPD.IHTTPSession session) {
        String view = getView();
        VelocityContext ctx = new VelocityContext();
        ctx.put("title", Config.APP_NAME);
        
        String scriptsCsv = assets.getProperty(view + ".scripts");
        if (scriptsCsv != null) {
            ctx.put("scripts", Arrays.asList(scriptsCsv.split(",")));
        }

        onLoad(ctx, session);
        
        String tpl = Config.TPL_DIR + "/" + view + ".vm";
        return NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.OK, "text/html", TemplateEngine.render(tpl, ctx));
    }
}
