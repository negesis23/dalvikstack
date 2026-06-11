package com.dalvikstack.infra.handler;

import fi.iki.elonen.NanoHTTPD;
import com.dalvikstack.core.Config;
import com.dalvikstack.infra.router.Handler;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;

public final class AssetHandler implements Handler {
    @Override
    public NanoHTTPD.Response handle(NanoHTTPD.IHTTPSession session) {
        String uri = session.getUri();
        if (uri == null || uri.equals("/") || uri.isEmpty()) return null;
        
        String path = Config.PUB_DIR + (uri.startsWith("/") ? uri : "/" + uri);
        
        try {
            InputStream is = getClass().getResourceAsStream("/" + path);
            if (is == null) {
                File file = new File("backend/src/main/resources/" + path);
                if (file.exists()) is = new FileInputStream(file);
            }
            if (is == null) return null;
            
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[16384];
            int n;
            while ((n = is.read(buf)) != -1) out.write(buf, 0, n);
            is.close();
            
            byte[] data = out.toByteArray();
            int dot = uri.lastIndexOf('.');
            String ext = dot > 0 ? uri.substring(dot + 1).toLowerCase() : "";
            
            String mime = Config.MIME.get(ext);
            if (mime == null) mime = "application/octet-stream";
            
            return NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.OK, mime, new ByteArrayInputStream(data), (long) data.length);
        } catch (Exception e) {
            return null;
        }
    }
}
