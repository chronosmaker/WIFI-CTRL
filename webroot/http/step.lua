
return function (connection, req, args)
    local pin = { 5, 6, 7, 8 }
    local round = args.round
    local step = {
        { gpio.HIGH, gpio.LOW, gpio.LOW, gpio.LOW },
        { gpio.HIGH, gpio.HIGH, gpio.LOW, gpio.LOW },
        { gpio.LOW, gpio.HIGH, gpio.LOW, gpio.LOW },
        { gpio.LOW, gpio.HIGH, gpio.HIGH, gpio.LOW },
        { gpio.LOW, gpio.LOW, gpio.HIGH, gpio.LOW },
        { gpio.LOW, gpio.LOW, gpio.HIGH, gpio.HIGH },
        { gpio.LOW, gpio.LOW, gpio.LOW, gpio.HIGH },
        { gpio.HIGH, gpio.LOW, gpio.LOW, gpio.HIGH }
    }
    local pinInit = function()
        for i = 1, 4 do
            gpio.mode(pin[i],gpio.OUTPUT)
        end
    end
    local pinAction = function(index)
        for i = 1, 4 do
            gpio.write(pin[i],step[index][i])
        end
    end
    local move = function(r)
        for r = 1, r do
            for j = 1, 512 do
                for i = 1, 8 do
                    pinAction(i)
                    tmr.delay(300)
                end
            end
        end
    end
    pinInit()
    move(round)
    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    local res = '{"msg":"' .. round ..'"}'
    connection:send(res)
end
