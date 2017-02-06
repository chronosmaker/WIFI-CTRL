
return function (connection, req, args)
    local data = readStat()
    local index = 0;
    for i = 1,data[1].node do
        if data[i+1].id == args.id then
            switch(data[i+1].pin,args.stat)
            data[i+1].status = args.stat
            index = i + 1
            break
        end
    end
    updateStat(data,index)
    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    connection:send('{"msg":"200"}')
end
