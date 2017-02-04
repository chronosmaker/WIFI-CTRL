
return function (connection, req, args)
    switch(args.id,args.stat)
    local table = cjson.decode(readStat())
    table[args.id] = args.stat
    local json = cjson.encode(table)
    updateStat(json)
    connection:send("HTTP/1.0 200 OK\r\nContent-Type: application/json\r\nCache-Control: private, no-store\r\n\r\n")
    connection:send('{"msg":"200"}')
end
