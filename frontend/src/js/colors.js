export const CATEGORY_COLORS = {
    1: '#af0000',
    97: '#ff8000',
    13:'#ff0000',
    35: '#007e00',
    18: '#00ffff',
    55: '#00f600',
    63: '#8000ff',
    80: '#ff00ff',
    84: '#eaa500',
    96: '#ff0000',
    54: '#00a200',
    79: '#ffff00',
};

export const CATEGORY_NAMES = {
       1:"NÁSILNÁ TRESTNÁ ČINNOST",
        97:"Přestupky",
        13:"POŽÁRY VÝBUCHY ŽIVELNÉ POHROMY",
        35:"KRÁDEŽE",
        18:"KRÁDEŽE VLOUPÁNÍM",
        55:"OSTATNÍ MAJETKOVÁ TRESTNÁ ČINNOST",
        63:"OBECNĚ NEBEZPEČNÁ TRESTNÁ ČINNOST",
        80:"TOXIKOMÁNIE",
        84:"TRESTNÁ ČINNOST SE ZBRANÍ",
        96:"EXTREMISMUS",
        54:"PODVODY",
        79:"DOPRAVNÍ NEHODY",
};

export const CATEGORY_COLORS_NAMES = {
    "NÁSILNÁ TRESTNÁ ČINNOST": '#af0000',
    "Přestupky": '#ff8000',
    "POŽÁRY VÝBUCHY ŽIVELNÉ POHROMY":'#ff0000',
    "KRÁDEŽE": '#007e00',
    "KRÁDEŽE VLOUPÁNÍM": '#00ffff',
    "OSTATNÍ MAJETKOVÁ TRESTNÁ ČINNOST": '#00f600',
    "OBECNĚ NEBEZPEČNÁ TRESTNÁ ČINNOST": '#8000ff',
    "TOXIKOMÁNIE": '#ff00ff',
    "TRESTNÁ ČINNOST SE ZBRANÍ": '#eaa500',
    "EXTREMISMUS": '#ff0000',
    "PODVODY": '#00a200',
    "DOPRAVNÍ NEHODY": '#ffff00',
};


export const findParent = (id1, id2)=>{
    //check if id1 or id2 is in the category names if so return its id
    if (CATEGORY_NAMES[id1] || CATEGORY_NAMES[id2]){
        return CATEGORY_NAMES[id1] ? id1 : id2;
    }
}