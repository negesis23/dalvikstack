package com.dalvikstack.core;

import java.util.Map;
import java.util.HashMap;

public final class Config {
    public static final String APP_NAME = "DalvikStack";
    public static final String TECH = "SolidJS + NanoHTTPD + DalvikVM";
    public static final int PORT = 8080;
    
    // Asset Configuration
    public static final String PUB_DIR = "public";
    public static final String TPL_DIR = "templates";
    public static final int CACHE_MAX_AGE = 3600; 
    public static final int IMMUTABLE_MAX_AGE = 31536000; 
    
    public static final Map<String, String> MIME = new HashMap<String, String>();
    static {
        MIME.put("js", "application/javascript; charset=utf-8");
        MIME.put("css", "text/css; charset=utf-8");
        MIME.put("html", "text/html; charset=utf-8");
        MIME.put("png", "image/png");
        MIME.put("jpg", "image/jpeg");
        MIME.put("jpeg", "image/jpeg");
        MIME.put("gif", "image/gif");
        MIME.put("svg", "image/svg+xml");
        MIME.put("ico", "image/x-icon");
        MIME.put("json", "application/json; charset=utf-8");
        MIME.put("txt", "text/plain; charset=utf-8");
    }
}
