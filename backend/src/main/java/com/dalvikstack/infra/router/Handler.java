package com.dalvikstack.infra.router;

import fi.iki.elonen.NanoHTTPD;

public interface Handler {
    NanoHTTPD.Response handle(NanoHTTPD.IHTTPSession session);
}
