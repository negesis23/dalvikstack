package com.dalvikstack.infra.handler;

import fi.iki.elonen.NanoHTTPD;
import org.apache.velocity.VelocityContext;
import com.dalvikstack.core.ProjectMetadata;
import com.dalvikstack.infra.router.BaseHandler;

public final class HomeHandler extends BaseHandler {
    @Override
    protected String getView() { return "home"; }

    @Override
    protected void onLoad(VelocityContext ctx, NanoHTTPD.IHTTPSession session) {
        ProjectMetadata meta = new ProjectMetadata();
        ctx.put("heading", "System Implementation");
        ctx.put("items", meta.getStack());
    }
}
