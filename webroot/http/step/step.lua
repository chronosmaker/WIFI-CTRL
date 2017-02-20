local run = function (data)
    for i, v in ipairs(data) do
        pwm.setup(v.io, 1000, 512)
        pwm.start(v.io)
        v.timer = tmr.create()
        v.timer:register(v.r * 800, tmr.ALARM_SINGLE, function (t) pwm.stop(v.io); t:unregister() end)
        v.timer:start()
    end
end
local stop = function (data)
    for i, v in ipairs(data) do
        pwm.stop(v.io)
        tmr.unregister(v.timer)
    end
end
return function (connection, req, args)
    if args.run == "1" then
        data = req.getRequestData()
        run(data)
    else
        if data ~= nil then
            stop(data)
        end
    end
    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    connection:send('{"msg":"ok"}')
end
