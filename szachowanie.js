let pozycja_yk, pozycja_xk, przeciwna_figura, ppyk, ppxk;
function pozycja_krola()
{
    if($("." + obecna_figura + "_k").parent().attr("id") <= 8)
    {
        pozycja_yk = 0;
    }else if($("." + obecna_figura + "_k").parent().attr("id") > 8 && $("." + obecna_figura + "_k").parent().attr("id") <= 16)
    {
        pozycja_yk = 1;
    }else if($("." + obecna_figura + "_k").parent().attr("id") > 16 && $("." + obecna_figura + "_k").parent().attr("id") <= 24)
    {
        pozycja_yk = 2;
    }else if($("." + obecna_figura + "_k").parent().attr("id") > 24 && $("." + obecna_figura + "_k").parent().attr("id") <= 32)
    {
        pozycja_yk = 3;
    }else if($("." + obecna_figura + "_k").parent().attr("id") > 32 && $("." + obecna_figura + "_k").parent().attr("id") <= 40)
    {
        pozycja_yk = 4;
    }else if($("." + obecna_figura + "_k").parent().attr("id") > 40 && $("." + obecna_figura + "_k").parent().attr("id") <= 48)
    {
        pozycja_yk = 5;
    }else if($("." + obecna_figura + "_k").parent().attr("id") > 48 && $("." + obecna_figura + "_k").parent().attr("id") <= 56)
    {
        pozycja_yk = 6;
    }else if($("." + obecna_figura + "_k").parent().attr("id") > 56)
    {
        pozycja_yk = 7;
    }
    pozycja_xk = szachownica[pozycja_yk].indexOf($("." + obecna_figura + "_k").parent().attr("id"));

    przeciwna_figura = "czarny"
    if(obecna_figura == "bialy")
    {
        przeciwna_figura = "czarny"
    }else if(obecna_figura == "czarny")
    {
        przeciwna_figura = "bialy"
    }
}

function szach()
{
    $(".poleb").removeClass("szach")
    $(".polecz").removeClass("szach")
    pozycja_krola()
    ppyk = pozycja_yk
    ppxk = pozycja_xk

    if(pozycja_yk + 2 <= 7 && pozycja_xk - 1 >= 0 && $("#" + szachownica[pozycja_yk + 2][pozycja_xk - 1]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
        if(obecna_figura == "czarny" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
            notacja_szach = 1;
        }else if(obecna_figura == "bialy" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_czarny p").append("+")
            notacja_szach = 1;
        }
        $("#" + szachownica[pozycja_yk + 2][pozycja_xk - 1]).addClass("pole_szachowane")
        return;
    }
    if(pozycja_yk + 1 <= 7 && pozycja_xk - 2 >= 0 && $("#" + szachownica[pozycja_yk + 1][pozycja_xk - 2]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
        if(obecna_figura == "czarny" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
            notacja_szach = 1;
        }else if(obecna_figura == "bialy" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_czarny p").append("+")
            notacja_szach = 1;
        }
        $("#" + szachownica[pozycja_yk + 1][pozycja_xk - 2]).addClass("pole_szachowane")
        return;
    }
    if(pozycja_yk - 2 >= 0 && pozycja_xk - 1 >= 0 && $("#" + szachownica[pozycja_yk - 2][pozycja_xk - 1]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
        if(obecna_figura == "czarny" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
            notacja_szach = 1;
        }else if(obecna_figura == "bialy" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_czarny p").append("+")
            notacja_szach = 1;
        }
        $("#" + szachownica[pozycja_yk - 2][pozycja_xk - 1]).addClass("pole_szachowane")
        return;
    }
    if(pozycja_yk - 1 >= 0 && pozycja_xk - 2 >= 0 && $("#" + szachownica[pozycja_yk - 1][pozycja_xk - 2]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
        if(obecna_figura == "czarny" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
            notacja_szach = 1;
        }else if(obecna_figura == "bialy" && notacja_szach == 0)
        {
            $(".aktualna_tabela .ruch_czarny p").append("+")
            notacja_szach = 1;
        }
        $("#" + szachownica[pozycja_yk - 1][pozycja_xk - 2]).addClass("pole_szachowane")
        return;
    }
    if(pozycja_xk + 1 <= 7)
    {
        if(pozycja_yk + 2 < 8 && pozycja_xk + 1 >= 0 && $("#" + szachownica[pozycja_yk + 2][pozycja_xk + 1]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
            if(obecna_figura == "czarny" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                notacja_szach = 1;
            }else if(obecna_figura == "bialy" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_czarny p").append("+")
                notacja_szach = 1;
            }
            $("#" + szachownica[pozycja_yk + 2][pozycja_xk + 1]).addClass("pole_szachowane")
            return;
        }
    }
    if(pozycja_xk + 2 <= 7)
    {
        if(pozycja_yk + 1 < 8 && pozycja_xk + 2 >= 0 && $("#" + szachownica[pozycja_yk + 1][pozycja_xk + 2]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
            if(obecna_figura == "czarny" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                notacja_szach = 1;
            }else if(obecna_figura == "bialy" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_czarny p").append("+")
                notacja_szach = 1;
            }
            $("#" + szachownica[pozycja_yk + 1][pozycja_xk + 2]).addClass("pole_szachowane")
            return;
        }
    }
    if(pozycja_xk + 1 <= 7)
    {
        if(pozycja_yk - 2 >= 0 && pozycja_xk + 1 < 8 && $("#" + szachownica[pozycja_yk - 2][pozycja_xk + 1]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
            if(obecna_figura == "czarny" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                notacja_szach = 1;
            }else if(obecna_figura == "bialy" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_czarny p").append("+")
                notacja_szach = 1;
            }
            $("#" + szachownica[pozycja_yk - 2][pozycja_xk + 1]).addClass("pole_szachowane")
            return;
        }
    }
    if(pozycja_xk + 2 <= 7)
    {
        if(pozycja_yk - 1 >= 0 && pozycja_xk + 2 < 8 && $("#" + szachownica[pozycja_yk - 1][pozycja_xk + 2]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("szach")
            if(obecna_figura == "czarny" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                notacja_szach = 1;
            }else if(obecna_figura == "bialy" && notacja_szach == 0)
            {
                $(".aktualna_tabela .ruch_czarny p").append("+")
                notacja_szach = 1;
            }
            $("#" + szachownica[pozycja_yk - 1][pozycja_xk + 2]).addClass("pole_szachowane")
            return;
        }
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk
    
    for(let i = 0; i < ppyk; i++)
    {
        $("#" + szachownica[pozycja_yk - 1][pozycja_xk]).addClass("pole_szachowane")
        if(document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                return;
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
    
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppyk + 1); i++)
    {
        $("#" + szachownica[pozycja_yk + 1][pozycja_xk]).addClass("pole_szachowane")
        if(document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                return;
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppxk + 1); i++)
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk + 1]).addClass("pole_szachowane")
        if(document.getElementById(szachownica[pozycja_yk][pozycja_xk += 1]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                return;
            }
            
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < ppxk; i++)
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk - 1]).addClass("pole_szachowane")
        if(document.getElementById(szachownica[pozycja_yk][pozycja_xk -= 1]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                return;
            }
            
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppyk + 1); i++)
    {
        $("#" + szachownica[pozycja_yk + 1][pozycja_xk + 1]).addClass("pole_szachowane")
        if(pozycja_xk < 7)
        {
            if(document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk += 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                    if(obecna_figura == "czarny" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                        notacja_szach = 1;
                    }else if(obecna_figura == "bialy" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_czarny p").append("+")
                        notacja_szach = 1;
                    }
                    return;
                }
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppyk + 1); i++)
    {
        $("#" + szachownica[pozycja_yk + 1][pozycja_xk - 1]).addClass("pole_szachowane")
        if(pozycja_xk > 0)
        {
            if(document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk -= 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                    if(obecna_figura == "czarny" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                        notacja_szach = 1;
                    }else if(obecna_figura == "bialy" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_czarny p").append("+")
                        notacja_szach = 1;
                    }
                    return;
                }
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < ppyk; i++)
    {
        $("#" + szachownica[pozycja_yk - 1][pozycja_xk + 1]).addClass("pole_szachowane")
        if(pozycja_xk < 7)
        {
            if(document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk += 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                    if(obecna_figura == "czarny" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                        notacja_szach = 1;
                    }else if(obecna_figura == "bialy" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_czarny p").append("+")
                        notacja_szach = 1;
                    }
                    return;
                }
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < ppyk; i++)
    {
        $("#" + szachownica[pozycja_yk - 1][pozycja_xk - 1]).addClass("pole_szachowane")
        if(pozycja_xk >= 1)
        {
            if(document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk -= 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                    if(obecna_figura == "czarny" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                        notacja_szach = 1;
                    }else if(obecna_figura == "bialy" && notacja_szach == 0)
                    {
                        $(".aktualna_tabela .ruch_czarny p").append("+")
                        notacja_szach = 1;
                    }
                    return;
                }
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk >= 1 && pozycja_xk >= 1)
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
        if(obecna_figura == "bialy" && document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk -= 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("czarny_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk >= 1 &&  pozycja_xk <= 6)
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
        if(obecna_figura == "bialy" && document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk += 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("czarny_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk <= 6 && pozycja_xk >= 1)
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
        if(obecna_figura == "czarny" && document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk -= 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("bialy_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk <= 6 && pozycja_xk <= 6)
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
        if(obecna_figura == "czarny" && document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk += 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("bialy_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).addClass("szach")
                if(obecna_figura == "czarny" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_bialy").children("p").eq(1).append('+')
                    notacja_szach = 1;
                }else if(obecna_figura == "bialy" && notacja_szach == 0)
                {
                    $(".aktualna_tabela .ruch_czarny p").append("+")
                    notacja_szach = 1;
                }
                $("#" + szachownica[pozycja_yk][pozycja_xk]).addClass("pole_szachowane")
            }
        }
    }
    if(!$(".pole").hasClass("szach"))
    {
        $(".pole").removeClass("pole_szachowane")
    }
}

function zwiazanie(pozycja_y, pozycja_x)
{
    ppy = pozycja_y
    ppx = pozycja_x
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x]).addClass("pole_zwiazane")
        if(document.getElementById(szachownica[pozycja_y -= 1][pozycja_x]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                pozycja_y = ppy
                for(let i = 0; i < 8 - (ppy + 1); i++)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                    if(document.getElementById(szachownica[pozycja_y += 1][pozycja_x]).hasChildNodes())
                    {
                        if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            break;
                        }
                        if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                            return;
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x]).addClass("pole_zwiazane")
        if(document.getElementById(szachownica[pozycja_y += 1][pozycja_x]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                pozycja_y = ppy
                for(let i = 0; i < ppy; i++)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                    if(document.getElementById(szachownica[pozycja_y -= 1][pozycja_x]).hasChildNodes())
                    {
                        if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            break;
                        }
                        if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                            return;
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppx; i++)
    {
        $("#" + szachownica[pozycja_y][pozycja_x - 1]).addClass("pole_zwiazane")
        if(document.getElementById(szachownica[pozycja_y][pozycja_x -= 1]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                pozycja_x = ppx
                for(let i = 0; i < 8 - (ppx + 1); i++)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                    if(document.getElementById(szachownica[pozycja_y][pozycja_x += 1]).hasChildNodes())
                    {
                        if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            break;
                        }
                        if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                            return;
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppx + 1); i++)
    {
        $("#" + szachownica[pozycja_y][pozycja_x + 1]).addClass("pole_zwiazane")
        if(document.getElementById(szachownica[pozycja_y][pozycja_x += 1]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
            {
                pozycja_x = ppx
                for(let i = 0; i < ppx; i++)
                {
                    $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                    if(document.getElementById(szachownica[pozycja_y][pozycja_x -= 1]).hasChildNodes())
                    {
                        if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            break;
                        }
                        if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                        {
                            $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                            return;
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x - 1]).addClass("pole_zwiazane")
        if(pozycja_x >= 1)
        {
            if(document.getElementById(szachownica[pozycja_y -= 1][pozycja_x -= 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    pozycja_y = ppy
                    pozycja_x = ppx
                    for(let i = 0; i < 8 - (ppy + 1); i++)
                    {
                        $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                        if(pozycja_x <= 6)
                        {
                            if(document.getElementById(szachownica[pozycja_y += 1][pozycja_x += 1]).hasChildNodes())
                            {
                                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    break;
                                }
                                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < ppy; i++)
    {
        $("#" + szachownica[pozycja_y - 1][pozycja_x + 1]).addClass("pole_zwiazane")
        if(pozycja_x <= 6)
        {
            if(document.getElementById(szachownica[pozycja_y -= 1][pozycja_x += 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    pozycja_y = ppy
                    pozycja_x = ppx
                    for(let i = 0; i < 8 - (ppy + 1); i++)
                    {
                        $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                        if(pozycja_x >= 1)
                        {
                            if(document.getElementById(szachownica[pozycja_y += 1][pozycja_x -= 1]).hasChildNodes())
                            {
                                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    break;
                                }
                                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x - 1]).addClass("pole_zwiazane")
        if(pozycja_x >= 1)
        {
            if(document.getElementById(szachownica[pozycja_y += 1][pozycja_x -= 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    pozycja_y = ppy
                    pozycja_x = ppx
                    for(let i = 0; i < ppy; i++)
                    {
                        $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                        if(pozycja_x <= 6)
                        {
                            if(document.getElementById(szachownica[pozycja_y -= 1][pozycja_x += 1]).hasChildNodes())
                            {
                                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    break;
                                }
                                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
    pozycja_y = ppy
    pozycja_x = ppx
    for(let i = 0; i < 8 - (ppy + 1); i++)
    {
        $("#" + szachownica[pozycja_y + 1][pozycja_x + 1]).addClass("pole_zwiazane")
        if(pozycja_x <= 6)
        {
            if(document.getElementById(szachownica[pozycja_y += 1][pozycja_x += 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(przeciwna_figura + "_h"))
                {
                    pozycja_y = ppy
                    pozycja_x = ppx
                    for(let i = 0; i < ppy; i++)
                    {
                        $("#" + szachownica[pozycja_y][pozycja_x]).addClass("pole_zwiazane")
                        if(pozycja_x >= 1)
                        {
                            if(document.getElementById(szachownica[pozycja_y -= 1][pozycja_x -= 1]).hasChildNodes())
                            {
                                if(!$("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    break;
                                }
                                if($("#" + szachownica[pozycja_y][pozycja_x]).children().hasClass(obecna_figura + "_k"))
                                {
                                    $("#" + szachownica[ppy][ppx]).addClass("zwiazanie")
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(!$(".pole").hasClass("zwiazanie"))
    {
        $(".pole").removeClass("pole_zwiazane")
    }
}

function pole_szachowane_zero()
{
    if(pozycja_yk + 2 < 8 && pozycja_xk - 1 >= 0 && $("#" + szachownica[pozycja_yk + 2][pozycja_xk - 1]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
    }
    if(pozycja_yk + 1 < 8 && pozycja_xk - 2 >= 0 && $("#" + szachownica[pozycja_yk + 1][pozycja_xk - 2]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
    }
    if(pozycja_yk - 2 >= 0 && pozycja_xk - 1 >= 0 && $("#" + szachownica[pozycja_yk - 2][pozycja_xk - 1]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
    }
    if(pozycja_yk - 1 >= 0 && pozycja_xk - 2 >= 0 && $("#" + szachownica[pozycja_yk - 1][pozycja_xk - 2]).children().hasClass(przeciwna_figura + "_s"))
    {
        $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
    }
    if(pozycja_xk + 1 < 8)
    {
        if(pozycja_yk + 2 < 8 && pozycja_xk + 1 >= 0 && $("#" + szachownica[pozycja_yk + 2][pozycja_xk + 1]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_xk + 2 < 8)
    {
        if(pozycja_yk + 1 < 8 && pozycja_xk + 2 >= 0 && $("#" + szachownica[pozycja_yk + 1][pozycja_xk + 2]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_xk + 1 < 8)
    {
        if(pozycja_yk - 2 >= 0 && pozycja_xk + 1 < 8 && $("#" + szachownica[pozycja_yk - 2][pozycja_xk + 1]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_xk + 2 < 8)
    {
        if(pozycja_yk - 1 >= 0 && pozycja_xk + 2 < 8 && $("#" + szachownica[pozycja_yk - 1][pozycja_xk + 2]).children().hasClass(przeciwna_figura + "_s"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk - 1 >= 0 && pozycja_xk - 1 >= 0)
    {
        if($("#" + szachownica[pozycja_yk - 1][pozycja_xk - 1]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_yk - 1 >= 0)
    {
        if($("#" + szachownica[pozycja_yk - 1][pozycja_xk]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_yk - 1 >= 0 && pozycja_xk + 1 <= 7)
    {
        if($("#" + szachownica[pozycja_yk - 1][pozycja_xk + 1]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_yk + 1 <= 7 && pozycja_xk - 1 >= 0)
    {
        if($("#" + szachownica[pozycja_yk + 1][pozycja_xk - 1]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_yk + 1 <= 7)
    {
        if($("#" + szachownica[pozycja_yk + 1][pozycja_xk]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_yk + 1 <= 7 && pozycja_xk + 1 <= 7)
    {
        if($("#" + szachownica[pozycja_yk + 1][pozycja_xk + 1]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    
    if(pozycja_xk - 1 >= 0)
    {
        if($("#" + szachownica[pozycja_yk][pozycja_xk - 1]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }
    if(pozycja_xk + 1 <= 7)
    {
        if($("#" + szachownica[pozycja_yk][pozycja_xk + 1]).children().hasClass(przeciwna_figura + "_k"))
        {
            $("#" + szachownica[pozycja_yk][pozycja_xk]).removeClass("dpole droszada")
        }
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    for(let i = 0; i < ppyk; i++)
    {
        if(document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppyk + 1); i++)
    {
        if(document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppxk + 1); i++)
    {
        if(document.getElementById(szachownica[pozycja_yk][pozycja_xk += 1]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < ppxk; i++)
    {
        if(document.getElementById(szachownica[pozycja_yk][pozycja_xk -= 1]).hasChildNodes())
        {
            if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
            {
                break;
            }
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_w") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
            {
                
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppyk + 1); i++)
    {
        if(pozycja_xk < 7)
        {
            if(document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk += 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
                }
            }
        }
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < 8 - (ppyk + 1); i++)
    {
        if(pozycja_xk > 0)
        {
            if(document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk -= 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
                }
            }
        }
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < ppyk; i++)
    {
        if(pozycja_xk < 7)
        {
            if(document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk += 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
                }
            }
        }
    }
    pozycja_yk = ppyk
    pozycja_xk = ppxk
    for(let i = 0; i < ppyk; i++)
    {
        if(pozycja_yk <= 7 && pozycja_xk >= 1)
        {
            if(document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk -= 1]).hasChildNodes())
            {
                if(!$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h") && !$("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(obecna_figura + "_k"))
                {
                    break;
                }
                if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_g") || $("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass(przeciwna_figura + "_h"))
                {
                    $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
                }
            }
        }
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk >= 1 && pozycja_xk >= 1)
    {
        if(obecna_figura == "bialy" && document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk -= 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("czarny_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk >= 1 &&  pozycja_xk <= 6)
    {
        if(obecna_figura == "bialy" && document.getElementById(szachownica[pozycja_yk -= 1][pozycja_xk += 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("czarny_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk <= 6 && pozycja_xk >= 1) 
    {
        if(obecna_figura == "czarny" && document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk -= 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("bialy_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }

    pozycja_yk = ppyk
    pozycja_xk = ppxk

    if(pozycja_yk <= 6 && pozycja_xk <= 6)
    {
        if(obecna_figura == "czarny" && document.getElementById(szachownica[pozycja_yk += 1][pozycja_xk += 1]).hasChildNodes())
        {
            if($("#" + szachownica[pozycja_yk][pozycja_xk]).children().hasClass("bialy_p"))
            {
                $("#" + szachownica[ppyk][ppxk]).removeClass("dpole droszada")
            }
        }
    }
}


function pole_szachowane_lg()
{
    pozycja_krola()
    pozycja_yk -= 1;
    pozycja_xk -= 1;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_g()
{
    pozycja_krola()
    pozycja_yk -= 1;
    pozycja_xk = pozycja_xk;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_pg()
{
    pozycja_krola()
    pozycja_yk -= 1;
    pozycja_xk += 1;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_p()
{
    pozycja_krola()
    pozycja_yk = pozycja_yk;
    pozycja_xk += 1;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_pd()
{
    pozycja_krola()
    pozycja_yk += 1;
    pozycja_xk += 1;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_d()
{
    pozycja_krola()
    pozycja_yk += 1;
    pozycja_xk = pozycja_xk;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_ld()
{
    pozycja_krola()
    pozycja_yk += 1;
    pozycja_xk -= 1;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_l()
{
    pozycja_krola()
    pozycja_xk -= 1;
    pozycja_yk = pozycja_yk;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_roszada_l()
{
    pozycja_krola()
    pozycja_xk -= 2;
    pozycja_yk = pozycja_yk;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}

function pole_szachowane_roszada_p()
{
    pozycja_krola()
    pozycja_xk += 2;
    pozycja_yk = pozycja_yk;
    ppyk = pozycja_yk
    ppxk = pozycja_xk
    pole_szachowane_zero()
}