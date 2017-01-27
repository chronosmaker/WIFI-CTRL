print('Setting up WIFI...')

wifi.setmode(wifi.STATION)
cfg = {
    ip = "192.168.1.7",
    netmask = "255.255.255.0",
    gateway = "192.168.1.1"
}
wifi.sta.setip(cfg); cfg = nil
wifi.sta.config('ITC', '8506923298')
-- wifi.sta.config('CHRONOS', '8506923298')
wifi.sta.connect()

tmr.alarm(1, 1000, tmr.ALARM_AUTO, function()
    if wifi.sta.getip() == nil then
        print('Waiting for IP ...')
    else
        print('IP is ' .. wifi.sta.getip())
        tmr.stop(1)
    end
end)

-- 开关引脚定义
pin = {
    s21 = 1,
    s22 = 2,
    s11 = 3,
    s12 = 4
}

-- 开关控制
function switch(pos, stat)
    gpio.mode(pin[pos],gpio.OUTPUT)
    if stat == "1" then
        gpio.write(pin[pos],gpio.LOW)
    else
        gpio.write(pin[pos],gpio.HIGH)
    end
end

-- 获取系统状态
function readStat()
    fd = file.open("dataStatus.lua", "r")
    if fd then
        local json = fd:readline()
        fd:close(); fd = nil
        return json
    end
    return ""
end

-- 更新系统状态
function updateStat(json)
    fd = file.open("dataStatus.lua", "w+")
    if fd then
        fd:write(json)
        fd:close(); fd = nil
    end
end

-- 系统初始化
function initSys()
    local stat = readStat()
    local table = cjson.decode(stat)
    switch("s21",table.s21)
    switch("s22",table.s22)
    switch("s11",table.s11)
    switch("s12",table.s12)
end

-- 执行初始化
initSys()

-- Serving static files
dofile('httpServer.lua')
httpServer:listen(66)

-- 页面初始化
httpServer:use('/init', function(req, res)
    res:type('application/json')
    res:send(readStat())
end)

-- 开关控制
httpServer:use('/switch', function(req, res)
    switch(req.query.id,req.query.stat)
    local table = cjson.decode(readStat())
    table[req.query.id] = req.query.stat
    local json = cjson.encode(table)
    updateStat(json)
    print(json)
    res:type('application/json')
    res:send('{"msg": "200"}')
end)

-- Get text/html
httpServer:use('/welcome', function(req, res)
    res:send('Hello ' .. req.query.name) -- /welcome?name=doge
end)

-- Get file
httpServer:use('/doge', function(req, res)
    res:sendFile('doge.jpg')
end)

-- Redirect
httpServer:use('/redirect', function(req, res)
    res:redirect('doge.jpg')
end)
