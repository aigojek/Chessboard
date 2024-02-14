const express = require('express');
const { setInterval } = require('timers');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
server.use(express.static(__dirname, + "./"));
const con = []
let minuty_cz = 10, sekundy_cz = 0, minuty_b = 10, sekundy_b = 0, int_b, int_cz, ilosc_ruchow = 0;
let poprzednie_pozycje = [];

io.on('connection', (socket) => 
{
    function czas_b()
    {
        int_b = setInterval(() =>
        {  
            sekundy_b--
            if(sekundy_b < 0)
            {
                minuty_b--;
                sekundy_b = 59;
            }
            io.emit("zegar", minuty_b, minuty_cz, sekundy_b, sekundy_cz)
        }, 1000)
    }

    function czas_cz()
    {
        int_cz = setInterval(() =>
        {  
            sekundy_cz--
            if(sekundy_cz < 0)
            {
                minuty_cz--;
                sekundy_cz = 59;
            }
            io.emit("zegar", minuty_b, minuty_cz, sekundy_b, sekundy_cz)
        }, 1000)
    }

    socket.on('stop_czas', () =>
    {
        clearInterval(int_b)
        clearInterval(int_cz)
    });

    if(typeof con[0] == "undefined")
    {
        con.splice(0, 1, socket.id)
    }else if(typeof con[0] !== "undefined")
    {
        con.splice(1, 2, socket.id)
    }

    if(con[0] == socket.id)
    {
        socket.join("gracz1")
        io.to("gracz1").emit("polaczenie", gracz = "gracz_1")
    }

    if(con[1] == socket.id)
    {
        socket.join("gracz2")
        io.to("gracz2").emit("polaczenie", gracz = "gracz_2")
    }

    socket.on('start', () => 
    {
        io.emit('start');
    });

    socket.on('ruch', (aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz) => 
    {
        if(uzyt == "gracz_1")
        {
            czas_b()
            clearInterval(int_cz)
            io.to("gracz2").emit('ruch', aktualna_szachownica, figura_przeciwnika, transfer_tabela, oz_b, oz_cz);
        }
        if(uzyt == "gracz_2")
        {
            czas_cz()
            clearInterval(int_b)
            io.to("gracz1").emit('ruch', aktualna_szachownica, figura_przeciwnika, transfer_tabela, oz_b, oz_cz);
        }
    });

    socket.on('zasada_50', (sprawdz_b, sprawdz_cz) =>
    {
        if(sprawdz_b == 0 && sprawdz_cz == 0)
        {
            ilosc_ruchow++;
        }else
        {
            ilosc_ruchow = 0;
        }

        if(ilosc_ruchow == 100)
        {
            io.emit("zasada_50_koniec")
        }
    })

    socket.on("zasada_3_powtorzen", (aktualna_szachownica) =>
    {
        poprzednie_pozycje.push(aktualna_szachownica)
        if(poprzednie_pozycje.length >= 9)
        {
            if((poprzednie_pozycje.slice(-1)[0]) == (poprzednie_pozycje.slice(-5)[0]))
            {
                if((poprzednie_pozycje.slice(-5)[0]) == (poprzednie_pozycje.slice(-9)[0]))
                {
                    if((poprzednie_pozycje.slice(-1)[0]) == (poprzednie_pozycje.slice(-9)[0]))
                    {
                        io.emit("zasada_3_koniec")
                    }
                }
            }
        }
    })

    console.log("connected")
    socket.on('disconnect', () => 
    {
        console.log("discoasiohd")
        if(socket.id == con[0])
        {
            delete con[0]
        }else if(socket.id == [con[1]])
        {
            delete con[1]
        }
    });
});

http.listen(3000)