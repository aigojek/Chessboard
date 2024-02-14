const socket = io()

socket.on("start", () =>
{
    if(uzyt == "gracz_2")
    {
        $("#szachownica").css("transform", "translateX(-200px) rotateZ(180deg)")
        $(".figura").css("transform", "rotateX(180deg)")
        $(".bialy_s").css("transform", "rotateZ(180deg)")
        $(".czarny_s").css("transform", "rotateZ(180deg)")
        $("#kordypion").css("flex-direction", "column")
        $("#kordypoziom").css("flex-direction", "row-reverse")
        $("#zegarczarny").css("transform", "translate(600px, -365px)")
        $("#zegarbialy").css("transform", "translate(600px, 365px)")
    }
    if(uzyt == "gracz_1")
    {
        $("#szachownica").css("transform", "translateX(-200px) rotateZ(0deg)")
        $(".figura").css("transform", "rotateX(0deg)")
        $(".bialy_s").css("transform", "rotateZ(0deg)")
        $(".czarny_s").css("transform", "rotateZ(0deg)")
        $("#kordypion").css("flex-direction", "column-reverse")
        $("#kordypoziom").css("flex-direction", "row")
        $("#zegarczarny").css("transform", "translate(600px, 365px)")
        $("#zegarbialy").css("transform", "translate(600px, -365px)")
    }
    start()
})

$("#start").click(() =>
{
    socket.emit("start")
})

socket.on("ruch", (aktualna_szachownica, figura_przeciwnika, transfer_tabela) =>
{

    $("#szachownica").replaceWith(aktualna_szachownica)
    $("#wykonane_ruchy").replaceWith(transfer_tabela)
    if(uzyt == "gracz_2")
    {
        $("#szachownica").css("transform", "translateX(-200px) rotateZ(180deg)")
        $(".figura").css("transform", "rotateX(180deg)")
        $(".bialy_s").css("transform", "rotateZ(180deg)")
        $(".czarny_s").css("transform", "rotateZ(180deg)")
        $("#kordypion").css("flex-direction", "column")
        $("#kordypoziom").css("flex-direction", "row-reverse")
        $("#zegarczarny").css("transform", "translate(600px, -365px)")
        $("#zegarbialy").css("transform", "translate(600px, 365px)")
    }
    if(uzyt == "gracz_1")
    {
        $("#szachownica").css("transform", "translateX(-200px) rotateZ(0deg)")
        $(".figura").css("transform", "rotateX(0deg)")
        $(".bialy_s").css("transform", "rotateZ(0deg)")
        $(".czarny_s").css("transform", "rotateZ(0deg)")
        $("#kordypion").css("flex-direction", "column-reverse")
        $("#kordypoziom").css("flex-direction", "row")
        $("#zegarczarny").css("transform", "translate(600px, 365px)")
        $("#zegarbialy").css("transform", "translate(600px, -365px)")
    }
    obecna_figura = figura_przeciwnika;
    sprawdz()
    szachmat()
    pat()
})

socket.on("polaczenie", (gracz) =>
{
    uzyt = gracz;
})

socket.on("zasada_3_koniec", () =>
{
    if(uzyt == "gracz_1")
    {
        $("#szachownica").append('<div id="win"><p>Remis!</p></div>')
    }
    if(uzyt == "gracz_2")
    {
        $("#szachownica").append('<div id="win"><p style="transform: rotateZ(180deg);">Remis!</p></div>')
    }
    koniec()
})

socket.on("zasada_50_koniec", () =>
{
    if(uzyt == "gracz_1")
    {
        $("#szachownica").append('<div id="win"><p>Remis!</p></div>')
    }
    if(uzyt == "gracz_2")
    {
        $("#szachownica").append('<div id="win"><p style="transform: rotateZ(180deg);">Remis!</p></div>')
    }
    koniec()
})

socket.on("zegar", (minuty_b, minuty_cz, sekundy_b, sekundy_cz) =>
{
    let sb, sc, mb, mc;
    $("#zegarbialy").html(minuty_b + ":" + "00")
    $("#zegarczarny").html(minuty_cz + ":" + "00")
    if(sekundy_b < 10)
    {
        sb = "0"
    }else
    {
        sb = ""
    }
    if(minuty_b < 10)
    {
        mb = "0"
    }else
    {
        mb = ""
    }
    
    if(sekundy_cz < 10)
    {
        sc = "0"
    }else
    {
        sc = ""
    }
    if(minuty_cz < 10)
    {
        mc = "0"
    }else
    {
        mc = ""
    }
    $("#zegarbialy").html(mb + minuty_b + ":" + sb + sekundy_b--)
    $("#zegarczarny").html(mc + minuty_cz + ":" + sc + sekundy_cz--)
    if(minuty_cz <= 0 && sekundy_cz < 0)
    {
        if(uzyt == "gracz_1")
        {
            $("#szachownica").append('<div id="win"><p id="cz">Zwycięstwo czarnych!</p></div>')
        }
        if(uzyt == "gracz_2")
        {
            $("#szachownica").append('<div id="win"><p id="cz" style="transform: rotateZ(180deg);">Zwycięstwo czarnych!</p></div>')
        }
        koniec()
    }
    if(minuty_b <= 0 && sekundy_b < 0)
    {
        if(uzyt == "gracz_1")
        {
            $("#szachownica").append('<div id="win"><p id="cz">Zwycięstwo białych!</p></div>')
        }
        if(uzyt == "gracz_2")
        {
            $("#szachownica").append('<div id="win"><p id="cz" style="transform: rotateZ(180deg);">Zwycięstwo białych!</p></div>')
        }
        koniec()
    }
})

let szachownica = 
[
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["9", "10", "11", "12", "13", "14", "15", "16"],
    ["17", "18", "19", "20", "21", "22", "23", "24"],
    ["25", "26", "27", "28", "29", "30", "31", "32"],
    ["33", "34", "35", "36", "37", "38", "39", "40"],
    ["41", "42", "43", "44", "45", "46", "47", "48"],
    ["49", "50", "51", "52", "53", "54", "55", "56"],
    ["57", "58", "59", "60", "61", "62", "63", "64"]
]

let notacja_ruchow =
[
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
]

let uzyt, bialy_w_lewa, bialy_w_prawa, bialy_krol, czarny_w_lewa, czarny_w_prawa, czarny_krol, figura, sprawdzony_mat = 0, sprawdzony_pat = 1, obecna_figura = "inna", t1, t2, aktualna_szachownica, transfer_tabela, figura_przeciwnika, oz_cz, oz_b;
let aktualny_ruch = 1, klikniete_pole, klikniete_pole_pionek, klikniete_pole_figura, klikniete_pole_numer, kliknieta_figura, kliknieta_figura_sprawdz, zbita_figura, notacja_szach, figura_pion = "", figura_poziom = "", poprzednia_figura = 1;
let ostatni_ruch_b = 0, ostatni_ruch_cz = 0, czy_bicie_b = 0, czy_bicie_cz = 0, sprawdz_b, sprawdz_cz;

function start()
{
    obecna_figura = "bialy"
    $("#start").css("pointer-events", "none")
}

function koniec()
{
    socket.emit("stop_czas")
    $("[name='bialy']").css("pointer-events", "none")
    $("[name='czarny']").css("pointer-events", "none")
}

function szachmat()
{
    if(sprawdzony_mat == 0)
    {
        if($(".pole").hasClass("szach"))
        {
            for(let i = 1; i <= 64; i++)
            {
                if(document.getElementById(i).hasChildNodes())
                {
                    $("#" + i).children().toggleClass("figura")
                    figura = '.' + $("#" + i).children().attr("class")
                    $("#" + i).children().toggleClass("figura klikniete")
                    wybrana_figura()
                    $("#" + i).children().toggleClass("klikniete")
                    if($(".pole").hasClass("dpole"))
                    {
                        $(".pole").removeClass("dpole biciewp")
                        sprawdzony_mat = 1;
                        return;
                    }
                }
            }
            sprawdzony_mat = 1;
            if($(".szach").children().hasClass("bialy_k"))
            {
                if(uzyt == "gracz_1")
                {
                    $("#szachownica").append('<div id="win"><p id="cz">Zwycięstwo czarnych!</p></div>')
                }
                if(uzyt == "gracz_2")
                {
                    $("#szachownica").append('<div id="win"><p id="cz" style="transform: rotateZ(180deg);">Zwycięstwo czarnych!</p></div>')
                }
                let zmiana = $(".aktualna_tabela .ruch_czarny p").text().replace("+", "#")
                $(".aktualna_tabela .ruch_czarny p").text(zmiana)
                koniec()
            }
            if($(".szach").children().hasClass("czarny_k"))
            {
                if(uzyt == "gracz_1")
                {
                    $("#szachownica").append('<div id="win"><p id="bi">Zwycięstwo białych!</p></div>')
                }
                if(uzyt == "gracz_2")
                {
                    $("#szachownica").append('<div id="win"><p id="bi" style="transform: rotateZ(180deg);">Zwycięstwo białych!</p></div>')
                }
                let zmiana = $(".aktualna_tabela .ruch_bialy").children("p").eq(1).text().replace("+", "#")
                $(".aktualna_tabela .ruch_bialy").children("p").eq(1).text(zmiana)
                koniec()
            }
        }
    }
}

function pat()
{
    if(sprawdzony_pat == 0)
    {
        if(!$(".pole").hasClass("szach"))
        {
            for(let i = 1; i <= 64; i++)
            {
                if(document.getElementById(i).hasChildNodes())
                {
                    $("#" + i).children().toggleClass("figura")
                    figura = '.' + $("#" + i).children().attr("class")
                    $("#" + i).children().toggleClass("figura klikniete")
                    wybrana_figura()
                    $("#" + i).children().toggleClass("klikniete")
                    if($(".pole").hasClass("dpole"))
                    {
                        $(".pole").removeClass("dpole biciewp")
                        sprawdzony_pat = 1;
                        return;
                    }
                }
            }
            sprawdzony_pat = 1;
            if(uzyt == "gracz_1")
            {
                $("#szachownica").append('<div id="win"><p>Remis!</p></div>')
            }
            if(uzyt == "gracz_2")
            {
                $("#szachownica").append('<div id="win"><p style="transform: rotateZ(180deg);">Remis!</p></div>')
            }
            koniec()
        }
    }
}

function zasada_50_ruchow()
{
    if(ostatni_ruch_b == 0 && czy_bicie_b == 0)
    {
        sprawdz_b = 0;
    }else
    {
        sprawdz_b = 1;
    }

    if(ostatni_ruch_cz == 0 && czy_bicie_cz == 0)
    {
        sprawdz_cz = 0;
    }else
    {
        sprawdz_cz = 1;
    }
    socket.emit("zasada_50", sprawdz_b, sprawdz_cz)
}

function zasada_3_powtorzen()
{
    socket.emit("zasada_3_powtorzen", aktualna_szachownica)
}

function notacja_2_figury(pozycja_x, pozycja_y, miejsce_f, pozycja_fy)
{
    if($(event.target).attr("id") <= 8)
    {
        miejsce_f = 0;
    }else if($(event.target).attr("id") > 8 && $(event.target).attr("id") <= 16)
    {
        miejsce_f = 1;
    }else if($(event.target).attr("id") > 16 && $(event.target).attr("id") <= 24)
    {
        miejsce_f = 2;
    }else if($(event.target).attr("id") > 24 && $(event.target).attr("id") <= 32)
    {
        miejsce_f = 3;
    }else if($(event.target).attr("id") > 32 && $(event.target).attr("id") <= 40)
    {
        miejsce_f = 4;
    }else if($(event.target).attr("id") > 40 && $(event.target).attr("id") <= 48)
    {
        miejsce_f = 5;
    }else if($(event.target).attr("id") > 48 && $(event.target).attr("id") <= 56)
    {
        miejsce_f = 6;
    }else if($(event.target).attr("id") > 56)
    {
        miejsce_f = 7;  
    }
    pozycja_y = miejsce_f;
    pozycja_x = szachownica[miejsce_f].indexOf($(event.target).attr("id"));

    if(klikniete_pole_figura + 1 <= 8)
    {
        pozycja_fy = 0;
    }else if(klikniete_pole_figura + 1 > 8 && klikniete_pole_figura + 1 <= 16)
    {
        pozycja_fy = 1;
    }else if(klikniete_pole_figura + 1 > 16 && klikniete_pole_figura + 1 <= 24)
    {
        pozycja_fy = 2;
    }else if(klikniete_pole_figura + 1 > 24 && klikniete_pole_figura + 1 <= 32)
    {
        pozycja_fy = 3;
    }else if(klikniete_pole_figura + 1 > 32 && klikniete_pole_figura + 1 <= 40)
    {
        pozycja_fy = 4;
    }else if(klikniete_pole_figura + 1 > 40 && klikniete_pole_figura + 1 <= 48)
    {
        pozycja_fy = 5;
    }else if(klikniete_pole_figura + 1 > 48 && klikniete_pole_figura + 1 <= 56)
    {
        pozycja_fy = 6;
    }else if(klikniete_pole_figura + 1 > 56)
    {
        pozycja_fy = 7;  
    }
    pozycja_fx = szachownica[pozycja_fy].indexOf(String(klikniete_pole_figura + 1));

    let ppy = pozycja_y
    let ppx = pozycja_x
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        if($("#" + szachownica[pozycja_y += 1][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_w"))
            {
                figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0)
                klikniete_pole_numer = $("#" + szachownica[ppy][ppx]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = "";
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_y + 1 <= 7)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        if($("#" + szachownica[pozycja_y -= 1][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_w"))
            {
                figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0)
                klikniete_pole_numer = $("#" + szachownica[ppy][ppx]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = "";
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_y - 1 >= 0)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppx + 1); i++)
    {
        if($("#" + szachownica[pozycja_y][pozycja_x += 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_w"))
            {
                figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0)
                klikniete_pole_numer = $("#" + szachownica[pozycja_y][pozycja_x]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_x + 1 <= 7)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppx; i++)
    {
        if($("#" + szachownica[pozycja_y][pozycja_x -= 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_w"))
            {
                figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0)
                klikniete_pole_numer = $("#" + szachownica[pozycja_y][pozycja_x]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_x - 1 >= 0)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        if($("#" + szachownica[pozycja_y += 1][pozycja_x += 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_g"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y][pozycja_x]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_y + 1 <= 7)
        if(pozycja_x + 1 <= 7)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        if($("#" + szachownica[pozycja_y += 1][pozycja_x -= 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_g"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y][pozycja_x]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_y + 1 <= 7)
        if(pozycja_x - 1 >= 0)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        if($("#" + szachownica[pozycja_y -= 1][pozycja_x += 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_g"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y][pozycja_x]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_y - 1 >= 0)
        if(pozycja_x + 1 <= 7)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        if($("#" + szachownica[pozycja_y -= 1][pozycja_x -= 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_h") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_g"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y][pozycja_x]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
        if(pozycja_y - 1 >= 0)
        if(pozycja_x - 1 >= 0)
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes() && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    if(pozycja_y + 2 < 8 && pozycja_x - 1 >= 0)
    {
        if($("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
    }
    if(pozycja_y + 1 < 8 && pozycja_x - 2 >= 0)
    {
        if($("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
    }
    if(pozycja_y - 2 >= 0 && pozycja_x - 1 >= 0)
    {
        if($("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
    }
    if(pozycja_y - 1 >= 0 && pozycja_x - 2 >= 0)
    {
        if($("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                klikniete_pole_numer = $("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).attr("id")
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                }
                if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                {
                    figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                }
            }
        }
    }
    if(pozycja_x + 1 < 8)
    {
        if(pozycja_y + 2 < 8 && pozycja_x + 1 >= 0)
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                if($("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
                {
                    klikniete_pole_numer = $("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).attr("id")
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                    }
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                    }
                }
            }
        }
    }
    if(pozycja_x + 2 < 8)
    {
        if(pozycja_y + 1 < 8 && pozycja_x + 2 >= 0)
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                if($("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
                {
                    klikniete_pole_numer = $("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).attr("id")
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                    }
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                    }
                }
            }
        }
    }
    if(pozycja_x + 1 < 8)
    {
        if(pozycja_y - 2 >= 0 && pozycja_x + 1 < 8)
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                if($("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
                {
                    klikniete_pole_numer = $("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).attr("id")
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                    }
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                    }
                }
            }
        }
    }
    if(pozycja_x + 2 < 8)
    {
        if(pozycja_y - 1 >= 0 && pozycja_x + 2 < 8)
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_s"))
            {
                if($("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).children().hasClass(kliknieta_figura_sprawdz.attr("class").split(' ')[0]))
                {
                    klikniete_pole_numer = $("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).attr("id")
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) !== notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_pion = notacja_ruchow[klikniete_pole_figura].charAt(0);
                    }
                    if(notacja_ruchow[klikniete_pole_figura].charAt(0) == notacja_ruchow[klikniete_pole_numer - 1].charAt(0))
                    {
                        figura_poziom = notacja_ruchow[klikniete_pole_figura].charAt(1);
                    }
                }
            }
        }
    }
}

function notacja(klikniete_pole, kliknieta_figura)
{
    if(kliknieta_figura == "krotkaroszada")
    {
        kliknieta_figura = "O-O"
    }else if(kliknieta_figura == "dlugaroszada")
    {
        kliknieta_figura = "O-O-O"
    }else if(kliknieta_figura.hasClass("bialy_s") || kliknieta_figura.hasClass("czarny_s"))
    {
        kliknieta_figura_sprawdz = kliknieta_figura
        kliknieta_figura = "S"
    }else if(kliknieta_figura.hasClass("bialy_w") || kliknieta_figura.hasClass("czarny_w"))
    {
        kliknieta_figura_sprawdz = kliknieta_figura
        kliknieta_figura = "W"
    }else if(kliknieta_figura.hasClass("bialy_h") || kliknieta_figura.hasClass("czarny_h"))
    {
        kliknieta_figura_sprawdz = kliknieta_figura
        kliknieta_figura = "H"
    }else if(kliknieta_figura.hasClass("bialy_k") || kliknieta_figura.hasClass("czarny_k"))
    {
        kliknieta_figura_sprawdz = kliknieta_figura
        kliknieta_figura = "K"
    }else if(kliknieta_figura.hasClass("bialy_g") || kliknieta_figura.hasClass("czarny_g"))
    {
        kliknieta_figura_sprawdz = kliknieta_figura
        kliknieta_figura = "G"
    }else if(kliknieta_figura.hasClass("bialy_p") || kliknieta_figura.hasClass("czarny_p"))
    {
        kliknieta_figura = ""
    }

    if(kliknieta_figura === "" && zbita_figura == "x")
    {
        figura_pion = notacja_ruchow[klikniete_pole_pionek].charAt(0)
    }
    if(kliknieta_figura !== "O-O" && kliknieta_figura !== "O-O-O" && kliknieta_figura !== "" && kliknieta_figura !== "K")
    {
        notacja_2_figury(kliknieta_figura_sprawdz)
    }

    if(obecna_figura == "bialy" && kliknieta_figura !== "O-O" && kliknieta_figura !== "O-O-O")
    {
        $(".aktualna_tabela").removeClass("aktualna_tabela")
        $("#wykonane_ruchy").append('<div class="tabela aktualna_tabela"><div class="ruch_bialy"><p>' + aktualny_ruch + "." + '</p> <p>' + kliknieta_figura + figura_pion + figura_poziom + zbita_figura + notacja_ruchow[klikniete_pole] +'</p></div>')
        document.getElementById("wykonane_ruchy").scrollTop = document.getElementById("wykonane_ruchy").scrollHeight - document.getElementById("wykonane_ruchy").clientHeight;
        figura_pion = "";
        figura_poziom = "";
        poprzednia_figura = 1;
        return;
    }
    if(obecna_figura == "bialy" && (kliknieta_figura == "O-O" || kliknieta_figura == "O-O-O"))
    {
        $(".aktualna_tabela").removeClass("aktualna_tabela")
        $("#wykonane_ruchy").append('<div class="tabela aktualna_tabela"><div class="ruch_bialy"><p>' + aktualny_ruch + "." + '</p> <p>' + kliknieta_figura +'</p></div>')
        figura_pion = "";
        figura_poziom = "";
        return;
    }
    if(obecna_figura == "czarny" && kliknieta_figura !== "O-O" && kliknieta_figura !== "O-O-O")
    {
        $(".aktualna_tabela").append('<div class="ruch_czarny"><p>' + kliknieta_figura + figura_pion + figura_poziom + zbita_figura + notacja_ruchow[klikniete_pole] +'</p></div>')
        document.getElementById("wykonane_ruchy").scrollTop = document.getElementById("wykonane_ruchy").scrollHeight - document.getElementById("wykonane_ruchy").clientHeight;
        figura_pion = "";
        figura_poziom = "";
        poprzednia_figura = 1;
        return;
    }
    if(obecna_figura == "czarny" && (kliknieta_figura == "O-O" || kliknieta_figura == "O-O-O"))
    {
        $(".aktualna_tabela").append('<div class="ruch_czarny"><p>' + kliknieta_figura + '</p></div>')
        figura_pion = "";
        figura_poziom = "";
        return;
    }
}

function bicie()
{
    if($(event.target).hasClass("dpole") || $(event.target).hasClass("biciewp") || $(event.target).hasClass("droszada"))
    {
        let wybrana = $(".klikniete")
        zbita_figura = $(event.target).children().attr("class")
        if($(event.target).hasClass("biciewp"))
        {
            zbita_figura = "x"
        }
        if(typeof zbita_figura !== "undefined")
        {
            zbita_figura = "x"
        }else
        {
            zbita_figura = ""
        }
        if($(event.target).children().hasClass("figura") || $(event.target).hasClass("biciewp"))
        {
            if(obecna_figura == "bialy")
            {
                czy_bicie_b = 1;
            }
            if(obecna_figura == "czarny")
            {
                czy_bicie_cz = 1;
            }
        }else
        {
            if(obecna_figura == "bialy")
            {
                czy_bicie_b = 0;
            }
            if(obecna_figura == "czarny")
            {
                czy_bicie_cz = 0;
            }
        }
        $(event.target).empty()
        kliknieta_figura = wybrana;
        klikniete_pole = $(event.target).attr("id")
        klikniete_pole--;
        if($(event.target).hasClass("biciewp"))
        {
            $(".bicie_w_przelocie_b").remove()
            $(".bicie_w_przelocie_cz").remove()
        }
        if($(".bicie_w_przelocie_b").attr("name") !== obecna_figura)
        {
            $(".figura").removeClass("bicie_w_przelocie_b")
        }
        if($(".bicie_w_przelocie_cz").attr("name") !== obecna_figura)
        {
            $(".figura").removeClass("bicie_w_przelocie_cz")
        }
        if($(wybrana).hasClass(obecna_figura + "_p"))
        {
            if(obecna_figura == "bialy")
            {
                ostatni_ruch_b = 1;
            }
            if(obecna_figura == "czarny")
            {
                ostatni_ruch_cz = 1;
            }
        }else
        {
            if(obecna_figura == "bialy")
            {
                ostatni_ruch_b = 0;
            }
            if(obecna_figura == "czarny")
            {
                ostatni_ruch_cz = 0;
            }
        }
        $(event.target).append(wybrana)
        promocja()
        $(wybrana).removeClass("klikniete")
        $("[name='bialy']").css("pointer-events", "visible")
        $("[name='czarny']").css("pointer-events", "visible")

        if($(event.target).hasClass("droszada"))
        {
            if($(event.target).attr("id") == 63)
            {
                let wieza = $("#64").children()
                $("#64").empty()
                $("#62").append(wieza)
                kliknieta_figura = "krotkaroszada"
            }
            if($(event.target).attr("id") == 59)
            {
                let wieza = $("#57").children()
                $("#60").empty()
                $("#60").append(wieza)
                kliknieta_figura = "dlugaroszada"
            }
            if($(event.target).attr("id") == 7)
            {
                let wieza = $("#8").children()
                $("#8").empty()
                $("#6").append(wieza)
                kliknieta_figura = "krotkaroszada"
            }
            if($(event.target).attr("id") == 3)
            {
                let wieza = $("#1").children()
                $("#1").empty()
                $("#4").append(wieza)
                kliknieta_figura = "dlugaroszada"
            }
        }

        if($(".pole").children().hasClass("promocjabiala") || $(".pole").children().hasClass("promocjaczarna"))
        {
            return;
        }
        if(obecna_figura == "bialy")
        {
            notacja(klikniete_pole, kliknieta_figura)
            $("[name='bialy']").css("pointer-events", "none")
            obecna_figura = "czarny";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            aktualny_ruch++;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela)
            zasada_3_powtorzen()
            zasada_50_ruchow()
            return;
        }
        if(obecna_figura == "czarny")
        {
            notacja(klikniete_pole, kliknieta_figura)
            $("[name='czarny']").css("pointer-events", "none")
            obecna_figura = "bialy";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela)
            zasada_3_powtorzen()
            zasada_50_ruchow()
            return;
        }
    }else
    {
        poprzednia_figura = 1; 
    }
}

function sprawdz(miejsce_f, pozycja_x, pozycja_y)
{
    if(obecna_figura == "bialy" && uzyt == "gracz_2")
    {
        $(".figura").removeClass("klikniete")
        $(".pole").removeClass("dpole biciewp droszada zwiazanie")
        return;
    }
    if(obecna_figura == "czarny" && uzyt == "gracz_1")
    {
        $(".figura").removeClass("klikniete")
        $(".pole").removeClass("dpole biciewp droszada zwiazanie")
        return;
    }
    if(obecna_figura == "inna")
    {
        return;
    }
    if($(".pole").children().hasClass("promocjabiala") || $(".pole").children().hasClass("promocjaczarna"))
    {
        return;
    }
    if(poprzednia_figura == 1)
    {
        if($(event.target).hasClass(obecna_figura + "_p"))
        {
            klikniete_pole_pionek = $(event.target).parent().attr("id")
            klikniete_pole_pionek--;
        }
        if($(event.target).hasClass(obecna_figura + "_h") || $(event.target).hasClass(obecna_figura + "_w") || $(event.target).hasClass(obecna_figura + "_g") || $(event.target).hasClass(obecna_figura + "_s"))
        {
            klikniete_pole_figura = $(event.target).parent().attr("id")
            klikniete_pole_figura--;
        }
        poprzednia_figura = 0;
    }

    roszada()
    bicie_w_przelocie()
    bicie()
    szach()

    $(".figura").removeClass("klikniete")
    $(".pole").removeClass("dpole biciewp droszada zwiazanie")

    if($(event.target).hasClass("figura"))
    {  
        $(event.target).removeClass("figura")
        figura = '.' + $(event.target).attr("class")
        $(event.target).addClass("figura klikniete")
    }else
    {
        return;
    }
    wybrana_figura(miejsce_f, pozycja_x, pozycja_y)
}

function wybrana_figura(miejsce_f, pozycja_x, pozycja_y)
{
    if($(".klikniete").parent().attr("id") <= 8)
    {
        miejsce_f = 0;
    }else if($(".klikniete").parent().attr("id") > 8 && $(".klikniete").parent().attr("id") <= 16)
    {
        miejsce_f = 1;
    }else if($(".klikniete").parent().attr("id") > 16 && $(".klikniete").parent().attr("id") <= 24)
    {
        miejsce_f = 2;
    }else if($(".klikniete").parent().attr("id") > 24 && $(".klikniete").parent().attr("id") <= 32)
    {
        miejsce_f = 3;
    }else if($(".klikniete").parent().attr("id") > 32 && $(".klikniete").parent().attr("id") <= 40)
    {
        miejsce_f = 4;
    }else if($(".klikniete").parent().attr("id") > 40 && $(".klikniete").parent().attr("id") <= 48)
    {
        miejsce_f = 5;
    }else if($(".klikniete").parent().attr("id") > 48 && $(".klikniete").parent().attr("id") <= 56)
    {
        miejsce_f = 6;
    }else if($(".klikniete").parent().attr("id") > 56)
    {
        miejsce_f = 7;  
    }

    pozycja_y = miejsce_f;
    pozycja_x = szachownica[miejsce_f].indexOf($(".klikniete").parent().attr("id"));

    zwiazanie(pozycja_y, pozycja_x)
    
    if(figura == "." + obecna_figura + "_h")
    {
        ruch_h(pozycja_x, pozycja_y)
    }
    if(figura == "." + obecna_figura + "_w")
    {
        ruch_w(pozycja_x, pozycja_y)
    }
    if(figura == "." + obecna_figura + "_g")
    {
        ruch_g(pozycja_x, pozycja_y)
    }
    if(figura == "." + obecna_figura + "_s")
    {
        ruch_s(pozycja_x, pozycja_y)
    }
    if(figura == "." + obecna_figura + "_k")
    {
        ruch_k(pozycja_x, pozycja_y)
    }
    if(figura == ".czarny_p" && obecna_figura == "czarny")
    {
        ruch_czarny_p(pozycja_x, pozycja_y)
    }
    if(figura == ".bialy_p" && obecna_figura == "bialy")
    {
        ruch_bialy_p(pozycja_x, pozycja_y)
    }
}

function bicie_w_przelocie()
{
    if($(".bicie_w_przelocie_b").parent().attr("id") > 40 && $(".bicie_w_przelocie_b").parent().attr("id") <= 48 || 
        $(".bicie_w_przelocie_b").parent().attr("id") > 48 && $(".bicie_w_przelocie_b").parent().attr("id") <= 56)
    {
        $(".bicie_w_przelocie_b").removeClass("bicie_w_przelocie_b")
        return;
    }
    if($(".bicie_w_przelocie_cz").parent().attr("id") > 16 && $(".bicie_w_przelocie_cz").parent().attr("id") <= 24 ||
        $(".bicie_w_przelocie_cz").parent().attr("id") > 9 && $(".bicie_w_przelocie_cz").parent().attr("id") <= 16)
    {
        $(".bicie_w_przelocie_cz").removeClass("bicie_w_przelocie_cz")
        return;
    }
    if(obecna_figura == "bialy")
    {
        if($(".klikniete").hasClass("bialy_p"))
        {
            if($(".klikniete").parent().attr("id") > 48 && $(".klikniete").parent().attr("id") <= 56 && !$(".bialy_p").hasClass("bicie_w_przelocie_b"))
            {
                $(".klikniete").addClass("bicie_w_przelocie_b")
            }
        }
    }

    if(obecna_figura == "czarny")
    {
        if($(".klikniete").hasClass("czarny_p"))
        {
            if($(".klikniete").parent().attr("id") > 9 && $(".klikniete").parent().attr("id") <= 16 && !$(".czarny_p").hasClass("bicie_w_przelocie_cz"))
            {
                $(".klikniete").addClass("bicie_w_przelocie_cz")
            }
        }
    }
}

function roszada()
{
    if(!$("#57").children().hasClass("bialy_w") && bialy_w_lewa !== 1)
    {
        bialy_w_lewa = 1
    }
    if(!$("#64").children().hasClass("bialy_w") && bialy_w_prawa !== 1)
    {
        bialy_w_prawa = 1
    }
    if(!$("#61").children().hasClass("bialy_k") && bialy_krol !== 1)
    {
        bialy_krol = 1
    }
    if(!$("#1").children().hasClass("czarny_w") && czarny_w_lewa !== 1)
    {
        czarny_w_lewa = 1
    }
    if(!$("#8").children().hasClass("czarny_w") && czarny_w_prawa !== 1)
    {
        czarny_w_prawa = 1
    }
    if(!$("#5").children().hasClass("czarny_k") && czarny_krol !== 1)
    {
        czarny_krol = 1
    }
}

function promocja()
{
    let i;
    if($(".bialy_p").hasClass("klikniete"))
    {
        for(i = 0; i <= 7; i++)
        {
            if($(event.target).attr("id") == szachownica[0][i])
            {
                $("#" + szachownica[0][i]).append(
                    '<div class="promocjabiala"><div class="bialy_h" id="h1"></div><div class="bialy_w" id="w1"></div><div class="bialy_g"id="g1"></div><div class="bialy_s" id="s1"></div></div>')
                notacja(klikniete_pole, kliknieta_figura)
                aktualny_ruch++;
                break;
            }
        }
        $("#h1").on("click", function()
        {
            $("#" + szachownica[0][i]).empty()
            $("#" + szachownica[0][i]).append('<div class="bialy_h figura" name="bialy" style="pointer-events: none;"></div>')
            $("[name='bialy']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append(' = H')
            obecna_figura = "czarny";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
        $("#w1").on("click", function()
        {
            $("#" + szachownica[0][i]).empty()
            $("#" + szachownica[0][i]).append('<div class="bialy_w figura" name="bialy" style="pointer-events: none;"></div>')
            $("[name='bialy']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append(' = W')
            obecna_figura = "czarny";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
        $("#g1").on("click", function()
        {
            $("#" + szachownica[0][i]).empty()
            $("#" + szachownica[0][i]).append('<div class="bialy_g figura" name="bialy" style="pointer-events: none;"></div>')
            $("[name='bialy']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append(' = G')
            obecna_figura = "czarny";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
        $("#s1").on("click", function()
        {
            $("#" + szachownica[0][i]).empty()
            $("#" + szachownica[0][i]).append('<div class="bialy_s figura" name="bialy" style="pointer-events: none;"></div>')
            $("[name='bialy']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append(' = S')
            obecna_figura = "czarny";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
    }
    if($(".czarny_p").hasClass("klikniete"))
    {
        for(i = 0; i <= 7; i++)
        {
            if($(event.target).attr("id") == szachownica[7][i])
            {
                $("#" + szachownica[7][i]).append(
                    '<div class="promocjaczarna" style="transform: translateY(-400px) rotateZ(180deg);"><div class="czarny_s" id="s2"></div><div class="czarny_g" id="g2"></div><div class="czarny_w" id="w2"></div><div class="czarny_h" id="h2"></div></div>')
                notacja(klikniete_pole, kliknieta_figura)
                break;
            }
        }
        $("#h2").on("click", function()
        {
            $("#" + szachownica[7][i]).empty()
            $("#" + szachownica[7][i]).append('<div class="czarny_h figura" name="czarny" style="pointer-events: none; transform: rotateZ(180deg);"></div>')
            $("[name='czarny']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_czarny p").append(' = H')
            obecna_figura = "bialy";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
        $("#w2").on("click", function()
        {
            $("#" + szachownica[7][i]).empty()
            $("#" + szachownica[7][i]).append('<div class="czarny_w figura" name="czarny" style="pointer-events: none; transform: rotateZ(180deg);"></div>')
            $("[name='czarny']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_czarny p").append(' = W')
            obecna_figura = "bialy";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
        $("#g2").on("click", function()
        {
            $("#" + szachownica[7][i]).empty()
            $("#" + szachownica[7][i]).append('<div class="czarny_g figura" name="czarny" style="pointer-events: none; transform: rotateZ(180deg);"></div>')
            $("[name='czarny']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_czarny p").append(' = G')
            obecna_figura = "bialy";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
        $("#s2").on("click", function()
        {
            $("#" + szachownica[7][i]).empty()
            $("#" + szachownica[7][i]).append('<div class="czarny_s figura" name="czarny" style="pointer-events: none; transform: rotateZ(180deg);"></div>')
            $("[name='czarny']").css("pointer-events", "none")
            $(".aktualna_tabela .ruch_czarny p").append(' = S')
            obecna_figura = "bialy";
            sprawdzony_mat = 0;
            sprawdzony_pat = 0;
            notacja_szach = 0;
            figura_przeciwnika = obecna_figura;
            aktualna_szachownica = document.getElementById("szachownica").outerHTML
            transfer_tabela = document.getElementById("wykonane_ruchy").outerHTML
            oz_b = document.getElementById("zegarbialy").outerHTML
            oz_cz = document.getElementById("zegarczarny").outerHTML
            socket.emit("ruch", aktualna_szachownica, figura_przeciwnika, uzyt, transfer_tabela, oz_b, oz_cz)
            return;
        })
    }
}

function ruch_k(pozycja_x, pozycja_y)
{
    if(pozycja_y > 0 && $("#" + szachownica[pozycja_y - 1][pozycja_x]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x]).addClass("dpole")
        pole_szachowane_g()
    }
    if(pozycja_y > 0 && pozycja_x + 1 < 8 && $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).addClass("dpole")
        pole_szachowane_pg()
    }
    if(pozycja_y > 0 && pozycja_x > 0 && $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).addClass("dpole") 
        pole_szachowane_lg()
    }
    if(pozycja_y + 1 < 8 && $("#" + szachownica[pozycja_y + 1][pozycja_x]).children().attr("name") !== obecna_figura)
    {  
        $("#" + szachownica[pozycja_y + 1][pozycja_x]).addClass("dpole")
        pole_szachowane_d()
    }
    if(pozycja_y + 1 < 8 && pozycja_x  + 1 < 8 && $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).addClass("dpole")
        pole_szachowane_pd()
    }
    if(pozycja_y + 1 < 8 && pozycja_x > 0 && $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).addClass("dpole")
        pole_szachowane_ld()
    }
    if(pozycja_x > 0 && $("#" + szachownica[pozycja_y][pozycja_x - 1]).children().attr("name") !== obecna_figura)
    {
       $("#" + szachownica[pozycja_y][pozycja_x - 1]).addClass("dpole")
       pole_szachowane_l()
       if($("#" + szachownica[pozycja_y][pozycja_x - 1]).is(":empty") && $("#" + szachownica[pozycja_y][pozycja_x - 2]).is(":empty") && 
          $("#" + szachownica[pozycja_y][pozycja_x - 3]).is(":empty"))
        {
            if(eval(obecna_figura + "_w_lewa") !== 1 && eval(obecna_figura + "_krol") !== 1)
            {
                if(!$(".pole").hasClass("szach"))
                {
                    $("#" + szachownica[pozycja_y][pozycja_x - 2]).addClass("droszada")
                    if(!$("#" + szachownica[pozycja_y][pozycja_x - 1]).hasClass("dpole"))
                    {
                        $("#" + szachownica[pozycja_y][pozycja_x - 2]).removeClass("droszada")
                    }
                    pole_szachowane_roszada_l()
                }
            }
        }
    }
    if(pozycja_x + 1 < 8 && $("#" + szachownica[pozycja_y][pozycja_x + 1]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y][pozycja_x + 1]).addClass("dpole")
        pole_szachowane_p()
        if($("#" + szachownica[pozycja_y][pozycja_x + 1]).is(":empty") && $("#" + szachownica[pozycja_y][pozycja_x + 2]).is(":empty"))
        {
            if(eval(obecna_figura + "_w_prawa") !== 1 && eval(obecna_figura + "_krol") !== 1)
            {
                if(!$(".pole").hasClass("szach"))
                {
                    $("#" + szachownica[pozycja_y][pozycja_x + 2]).addClass("droszada")
                    if(!$("#" + szachownica[pozycja_y][pozycja_x + 1]).hasClass("dpole"))
                    {
                        $("#" + szachownica[pozycja_y][pozycja_x + 2]).removeClass("droszada")
                    }
                    pole_szachowane_roszada_p()
                }
            }
         }
    }
}

function ruch_czarny_p(pozycja_x, pozycja_y)
{
    if(pozycja_y == 1)
    {
        if(!document.getElementById(szachownica[pozycja_y + 1][pozycja_x]).hasChildNodes())
        {
            $("#" + szachownica[pozycja_y + 1][pozycja_x]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y + 1][pozycja_x]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y + 1][pozycja_x]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y + 1][pozycja_x]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y + 1][pozycja_x]).removeClass("dpole")
                }
            }
        }
        if(!document.getElementById(szachownica[pozycja_y + 2][pozycja_x]).hasChildNodes() && !document.getElementById(szachownica[pozycja_y + 1][pozycja_x]).hasChildNodes())
        {
            $("#" + szachownica[pozycja_y + 2][pozycja_x]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y + 2][pozycja_x]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y + 2][pozycja_x]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y + 2][pozycja_x]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y + 2][pozycja_x]).removeClass("dpole")
                }
            }
        }
    }
    if($("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).children().attr("name") == "bialy")
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).removeClass("dpole")
            }
        }
    }
    if($("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).children().attr("name") == "bialy")
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).removeClass("dpole")
            }
        }
    }
    if($("#" + szachownica[pozycja_y][pozycja_x - 1]).children().hasClass("bicie_w_przelocie_b") )
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).addClass("biciewp")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).removeClass("biciewp")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).removeClass("biciewp")
            }
        }
    }
    if($("#" + szachownica[pozycja_y][pozycja_x + 1]).children().hasClass("bicie_w_przelocie_b") )
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).addClass("biciewp")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).removeClass("biciewp")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).removeClass("biciewp")
            }
        }
    }

    if(pozycja_y + 1 < 8 && !document.getElementById(szachownica[pozycja_y + 1][pozycja_x]).hasChildNodes())
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x]).removeClass("dpole")
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y + 1][pozycja_x]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y + 1][pozycja_x]).removeClass("dpole")
                }
            }
        }
    }
}

function ruch_bialy_p(pozycja_x, pozycja_y)
{
    if(pozycja_y == 6)
    {
        if(!document.getElementById(szachownica[pozycja_y - 1][pozycja_x]).hasChildNodes())
        {
            $("#" + szachownica[pozycja_y - 1][pozycja_x]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y - 1][pozycja_x]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y - 1][pozycja_x]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y - 1][pozycja_x]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y - 1][pozycja_x]).removeClass("dpole")
                }
            }
        }
        if(!document.getElementById(szachownica[pozycja_y - 2][pozycja_x]).hasChildNodes() && !document.getElementById(szachownica[pozycja_y - 1][pozycja_x]).hasChildNodes())
        {
            $("#" + szachownica[pozycja_y - 2][pozycja_x]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y - 2][pozycja_x]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y - 2][pozycja_x]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y - 2][pozycja_x]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y - 2][pozycja_x]).removeClass("dpole")
                }
            }
        }
    }
    if($("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).children().attr("name") == "czarny")
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).removeClass("dpole")
            }
        }
    }
    if($("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).children().attr("name") == "czarny")
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).removeClass("dpole")
            }
        }
    }
    if($("#" + szachownica[pozycja_y][pozycja_x - 1]).children().hasClass("bicie_w_przelocie_cz") )
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).addClass("biciewp")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).removeClass("biciewp")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).removeClass("biciewp")
            }
        }
    }
    if($("#" + szachownica[pozycja_y][pozycja_x + 1]).children().hasClass("bicie_w_przelocie_cz") )
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).addClass("biciewp")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).removeClass("biciewp")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).removeClass("biciewp")
            }
        }
    }

    if(pozycja_y >= 0 && !document.getElementById(szachownica[pozycja_y - 1][pozycja_x]).hasChildNodes())
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x]).removeClass("dpole")
            }
        }
    }
}

function ruch_h(pozycja_x, pozycja_y)
{
    let ppy = pozycja_y
    let ppx = pozycja_x
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y += 1][pozycja_x]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            break;
        }
    }
    pozycja_y = ppy
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y -= 1][pozycja_x]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            break;
        }
    }
    pozycja_y = ppy
    for(let i = 0; i < 8 - (ppx + 1); i++)
    {
        $("#" + szachownica[pozycja_y][pozycja_x += 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppx; i++)
    {
        $("#" + szachownica[pozycja_y][pozycja_x -= 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y += 1][pozycja_x += 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x < 8)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y += 1][pozycja_x -= 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x >= 0)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y -= 1][pozycja_x += 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x < 8)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y -= 1][pozycja_x -= 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x >= 0)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
}

function ruch_w(pozycja_x, pozycja_y)
{
    let ppy = pozycja_y
    let ppx = pozycja_x
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y += 1][pozycja_x]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            break;
        }
    }
    pozycja_y = ppy
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y -= 1][pozycja_x]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            break;
        }
    }
    pozycja_y = ppy
    for(let i = 0; i < 8 - (ppx + 1); i++)
    {
        $("#" + szachownica[pozycja_y][pozycja_x += 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            break;
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppx; i++)
    {
        $("#" + szachownica[pozycja_y][pozycja_x -= 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
            
            break;
        }
    }
}

function ruch_g(pozycja_x, pozycja_y)
{
    let ppy = pozycja_y
    let ppx = pozycja_x
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y += 1][pozycja_x += 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x < 8)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y += 1][pozycja_x -= 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x >= 0)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y -= 1][pozycja_x += 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x < 8)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y -= 1][pozycja_x -= 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
            }
        }
        if(pozycja_x >= 0)
        {
            if(document.getElementById(szachownica[pozycja_y][pozycja_x]).hasChildNodes())
            {
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().attr("name") == obecna_figura)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).removeClass("dpole")
                }
                break;
            }
        }
    }
}

function ruch_s(pozycja_x, pozycja_y)
{
    if(pozycja_y + 2 < 8 && pozycja_x - 1 >= 0 && $("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y + 2][pozycja_x - 1]).removeClass("dpole")
            }
        }
    }
    if(pozycja_y + 1 < 8 && pozycja_x - 2 >= 0 && $("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y + 1][pozycja_x - 2]).removeClass("dpole")
            }
        }
    }
    if(pozycja_y - 2 >= 0 && pozycja_x - 1 >= 0 && $("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y - 2][pozycja_x - 1]).removeClass("dpole")
            }
        }
    }
    if(pozycja_y - 1 >= 0 && pozycja_x - 2 >= 0 && $("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).children().attr("name") !== obecna_figura)
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).addClass("dpole")
        if($(".pole").hasClass("szach"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).hasClass("pole_szachowane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).removeClass("dpole")
            }
        }
        if($(".pole").hasClass("zwiazanie"))
        {
            if(!$("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).hasClass("pole_zwiazane"))
            {
                $("#" + szachownica[pozycja_y - 1][pozycja_x - 2]).removeClass("dpole")
            }
        }
    }
    if(pozycja_x + 1 < 8)
    {
        if(pozycja_y + 2 < 8 && pozycja_x + 1 >= 0 && $("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).children().attr("name") !== obecna_figura)
        {
            $("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y + 2][pozycja_x + 1]).removeClass("dpole")
                }
            }
        }
    }
    if(pozycja_x + 2 < 8)
    {
        if(pozycja_y + 1 < 8 && pozycja_x + 2 >= 0 && $("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).children().attr("name") !== obecna_figura)
        {
            $("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y + 1][pozycja_x + 2]).removeClass("dpole")
                }
            }
        }
    }
    if(pozycja_x + 1 < 8)
    {
        if(pozycja_y - 2 >= 0 && pozycja_x + 1 < 8 && $("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).children().attr("name") !== obecna_figura)
        {
            $("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y - 2][pozycja_x + 1]).removeClass("dpole")
                }
            }
        }
    }
    if(pozycja_x + 2 < 8)
    {
        if(pozycja_y - 1 >= 0 && pozycja_x + 2 < 8 && $("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).children().attr("name") !== obecna_figura)
        {
            $("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).addClass("dpole")
            if($(".pole").hasClass("szach"))
            {
                if(!$("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).hasClass("pole_szachowane"))
                {
                    $("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).removeClass("dpole")
                }
            }
            if($(".pole").hasClass("zwiazanie"))
            {
                if(!$("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).hasClass("pole_zwiazane"))
                {
                    $("#" + szachownica[pozycja_y - 1][pozycja_x + 2]).removeClass("dpole")
                }
            }
        }
    }
}