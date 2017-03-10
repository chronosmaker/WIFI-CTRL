
return function (connection, req, args)
    local data = readStat()
    for i = 1,data[1].node do
        if data[i+1].id == args.id then
            switch(data[i+1].pin,args.stat)
            data[i+1].status = args.stat
            break
        end
    end
    updateStat(data)
    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    connection:send('{"msg":"200"}')
end
