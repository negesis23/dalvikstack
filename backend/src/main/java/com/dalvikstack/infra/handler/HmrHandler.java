package com.dalvikstack.infra.handler;

import fi.iki.elonen.NanoHTTPD;
import com.dalvikstack.infra.router.Handler;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public final class HmrHandler implements Handler {
    private static final List<PipedOutputStream> clients = Collections.synchronizedList(new ArrayList<PipedOutputStream>());

    @Override
    public NanoHTTPD.Response handle(NanoHTTPD.IHTTPSession session) {
        String uri = session.getUri();
        if ("/hmr".equals(uri)) {
            try {
                final PipedOutputStream out = new PipedOutputStream();
                PipedInputStream in = new PipedInputStream(out, 8192);
                clients.add(out);
                out.write(": init\n\n".getBytes());
                out.flush();
                NanoHTTPD.Response res = NanoHTTPD.newChunkedResponse(NanoHTTPD.Response.Status.OK, "text/event-stream", in);
                res.addHeader("Connection", "keep-alive");
                res.addHeader("Cache-Control", "no-cache");
                return res;
            } catch (Exception e) {
                return NanoHTTPD.newFixedLengthResponse("ERR");
            }
        }
        if ("/hmr/trigger".equals(uri)) {
            broadcast("data: reload\n\n");
            return NanoHTTPD.newFixedLengthResponse("OK");
        }
        return null;
    }

    private void broadcast(final String msg) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (clients) {
                    List<PipedOutputStream> dead = new ArrayList<PipedOutputStream>();
                    for (PipedOutputStream out : clients) {
                        try {
                            out.write(msg.getBytes());
                            out.flush();
                        } catch (Exception e) {
                            dead.add(out);
                        }
                    }
                    clients.removeAll(dead);
                }
            }
        }).start();
    }
}
