package com.dalvikstack.infra.util;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.apache.velocity.runtime.resource.loader.FileResourceLoader;
import java.io.StringWriter;
import java.util.Properties;
import java.io.File;

public final class TemplateEngine {
    private static final VelocityEngine engine = new VelocityEngine();

    static {
        Properties p = new Properties();
        String resourcesPath = new File("backend/src/main/resources").getAbsolutePath();
        String templatesPath = new File("backend/src/main/resources/templates").getAbsolutePath();
        
        p.setProperty(RuntimeConstants.RESOURCE_LOADER, "file,class");
        p.setProperty("file.resource.loader.class", FileResourceLoader.class.getName());
        p.setProperty("file.resource.loader.path", resourcesPath + "," + templatesPath);
        p.setProperty("file.resource.loader.cache", "false");
        p.setProperty("file.resource.loader.modificationCheckInterval", "0");
        
        p.setProperty("class.resource.loader.class", ClasspathResourceLoader.class.getName());
        
        engine.init(p);
    }

    public static String render(String path, VelocityContext ctx) {
        try {
            Template t = engine.getTemplate(path);
            StringWriter w = new StringWriter();
            t.merge(ctx, w);
            return w.toString();
        } catch (Exception e) {
            return "Render Error: " + e.getMessage();
        }
    }
}
