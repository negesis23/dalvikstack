package com.dalvikstack.infra.handler;

import fi.iki.elonen.NanoHTTPD;
import com.dalvikstack.core.Config;
import com.dalvikstack.infra.router.Handler;
import java.io.InputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Map;

public final class AssetHandler implements Handler {
    @Override
    public NanoHTTPD.Response handle(NanoHTTPD.IHTTPSession session) {
        String uri = session.getUri();
        if (uri == null || uri.equals("/") || uri.isEmpty()) return null;
        
        // Security: Prevent path traversal
        if (uri.contains("..")) return NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.FORBIDDEN, "text/plain", "Forbidden");

        String path = Config.PUB_DIR + (uri.startsWith("/") ? uri : "/" + uri);
        
        try {
            InputStream is = getClass().getResourceAsStream("/" + path);
            long length = 0;
            if (is == null) {
                File file = new File("backend/src/main/resources/" + path);
                if (file.exists() && file.isFile()) {
                    length = file.length();
                    is = new FileInputStream(file);
                }
            } else {
                length = is.available();
            }
            
            if (is == null) return null;
            
            // Determine MIME type
            int dot = uri.lastIndexOf('.');
            String ext = dot > 0 ? uri.substring(dot + 1).toLowerCase() : "";
            String mime = Config.MIME.get(ext);
            if (mime == null) mime = "application/octet-stream";

            // Generate ETag (simple version based on length/path)
            String etag = Integer.toHexString((path + length).hashCode());
            
            // Check If-None-Match
            Map<String, String> headers = session.getHeaders();
            if (etag.equals(headers.get("if-none-match"))) {
                return NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.NOT_MODIFIED, mime, "");
            }

            NanoHTTPD.Response res = NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.OK, mime, is, length);
            res.addHeader("ETag", etag);
            
            // Long-term caching for hashed assets (regex match for hash pattern [name].[hash].js)
            if (uri.matches(".*\\.[a-zA-Z0-9]{8,}\\.(js|css|png|jpg|jpeg|gif|svg)")) {
                res.addHeader("Cache-Control", "public, max-age=" + Config.IMMUTABLE_MAX_AGE + ", immutable");
            } else {
                res.addHeader("Cache-Control", "public, max-age=" + Config.CACHE_MAX_AGE);
            }
            
            return res;
        } catch (Exception e) {
            return null;
        }
    }
}
