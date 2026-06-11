package com.dalvikstack.core;

import java.util.Map;
import java.util.HashMap;

public final class Config {
    public static final String APP_NAME = "DalvikStack";
    public static final String TECH = "SolidJS + NanoHTTPD + DalvikVM";
    public static final int PORT = 8080;
    public static final String PUB_DIR = "public";
    public static final String TPL_DIR = "templates";
    
    public static final Map<String, String> MIME = new HashMap<String, String>();
    static {
        MIME.put("js", "application/javascript");
        MIME.put("css", "text/css");
        MIME.put("html", "text/html");
        MIME.put("png", "image/png");
        MIME.put("jpg", "image/jpeg");
    }
}
