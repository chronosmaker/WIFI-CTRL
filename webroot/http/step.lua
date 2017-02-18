
return function (connection, req, args)
    local data = {}
    data = cjson.decode(args.data)
    runStep[data[1].m].s = data[1].s
    runStep[data[2].m].s = data[2].s
    runStep[data[3].m].s = data[3].s
    runStep[data[4].m].s = data[4].s
    runStep[data[5].m].s = data[5].s
    runStep[data[1].m].r = tonumber(data[1].r)
    runStep[data[2].m].r = tonumber(data[2].r)
    runStep[data[3].m].r = tonumber(data[3].r)
    runStep[data[4].m].r = tonumber(data[4].r)
    runStep[data[5].m].r = tonumber(data[5].r)
    pwm.setup(runStep[data[1].m].p, 1000, 512)
    pwm.setup(runStep[data[2].m].p, 1000, 512)
    pwm.setup(runStep[data[3].m].p, 1000, 512)
    pwm.setup(runStep[data[4].m].p, 1000, 512)
    pwm.setup(runStep[data[5].m].p, 1000, 512)
    pwm.start(runStep[data[1].m].p)
    pwm.start(runStep[data[2].m].p)
    pwm.start(runStep[data[3].m].p)
    pwm.start(runStep[data[4].m].p)
    pwm.start(runStep[data[5].m].p)
    local sTimer1 = tmr.create()
    sTimer1:register(runStep[data[1].m].r * 800, tmr.ALARM_SINGLE, function (t) pwm.stop(runStep[data[1].m].p); t:unregister() end)
    sTimer1:start()
    local sTimer2 = tmr.create()
    sTimer2:register(runStep[data[2].m].r * 800, tmr.ALARM_SINGLE, function (t) pwm.stop(runStep[data[2].m].p); t:unregister() end)
    sTimer2:start()
    local sTimer3 = tmr.create()
    sTimer3:register(runStep[data[3].m].r * 800, tmr.ALARM_SINGLE, function (t) pwm.stop(runStep[data[3].m].p); t:unregister() end)
    sTimer3:start()
    local sTimer4 = tmr.create()
    sTimer4:register(runStep[data[4].m].r * 800, tmr.ALARM_SINGLE, function (t) pwm.stop(runStep[data[4].m].p); t:unregister() end)
    sTimer4:start()
    local sTimer5 = tmr.create()
    sTimer5:register(runStep[data[5].m].r * 800, tmr.ALARM_SINGLE, function (t) pwm.stop(runStep[data[5].m].p); t:unregister() end)
    sTimer5:start()

    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    connection:send('{"msg":"ok"}')
end
