package com.dalvikstack.infra.handler;

import fi.iki.elonen.NanoHTTPD;
import org.apache.velocity.VelocityContext;
import com.dalvikstack.infra.router.BaseHandler;

public final class SpecsHandler extends BaseHandler {
    @Override
    protected String getView() { return "specs"; }

    @Override
    protected void onLoad(VelocityContext ctx, NanoHTTPD.IHTTPSession session) {
        ctx.put("os_name", System.getProperty("os.name"));
        ctx.put("os_version", System.getProperty("os.version"));
        ctx.put("vm_name", System.getProperty("java.vm.name"));
        ctx.put("mem_usage", (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / 1024 / 1024);
    }
}
