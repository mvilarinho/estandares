
var data = [];
var html;

function preload() {

    var url = 'estandares.json';
    data = loadJSON(url);

}

function setup() {

    noCanvas();
    
    var cursos = select("#curso");
    var listaCursos = _.keys(_.countBy(data, function (data) { return data.curso; }));
    html = "";
    for (var i = 0; i < listaCursos.length; i++) {
        html = html + "<option value='" + listaCursos[i] + "'>" + listaCursos[i] + "</option>" + "\n";
    }
    cursos.html(html);

}

function cargaMaterias(curso) {

    listaMateriasCurso = _.where(data, { "curso": curso })
    html = "";
    for (var i = 0; i < listaMateriasCurso.length; i++) {
        html = html + "<option value='" + listaMateriasCurso[i].nome + "'>" + listaMateriasCurso[i].nome + "</option>" + "\n";
    }
    var materias = select("#materia");
    materias.html(html)
    return;
}

function cargaEstandares(curso,materia) {

    listaEstandares = _.where(data, { "curso": curso,"nome":materia})
    html = "";
    var html2 = "";
    var j=0;
    for (var i = 0; i < listaEstandares[0].estandares.length; i++) {
        j=i+1;
        html = html + "<option value='" + j.toString() + "'>" + listaEstandares[0].estandares[i] + "</option>" + "\n";
        html2 = html2 + "<option value='" + j.toString() + "'></option>" + "\n";
    }
    var s1 = select("#s1");
    s1.html(html)
    var s2 = select("#s2");
    s2.html(html2)
    return;
}

function pasaValor(sel) {

    if (sel.options[sel.selectedIndex].text != "") {
        if (sel.id == 's1') {
            var s2 = document.getElementById('s2');
            s2.options[sel.selectedIndex].text = sel.options[sel.selectedIndex].text;
            sel.options[sel.selectedIndex].text = "";
        }
        else {
            var s1 = document.getElementById('s1');
            s1.options[sel.selectedIndex].text = sel.options[sel.selectedIndex].text;
            sel.options[sel.selectedIndex].text = "";
        }
    }
    sel.selectedIndex = -1;
}
function botonPasaValor(sel) {

    var a1 = sel.getElementsByTagName('option');
    for (var i = 0; i < a1.length; i++) {
        if (a1[i].selected && a1[i].text != "")
            if (sel.id == 's1') {
                var s2 = document.getElementById('s2');
                s2.options[i].text = a1[i].text;
                a1[i].text = "";
            }
            else {
                var s1 = document.getElementById('s1');
                s1.options[i].text = a1[i].text;
                a1[i].text = "";
            }
    }
    sel.selectedIndex = -1;
}

function copiar(boton, check) {
    var chk = document.getElementById(check)
    if (chk.checked == true)
        copiarCodigo(boton)
    else
        copiarTodo(boton)
}

function copiarTodo(boton) {
    var texto = "";
    if (boton.name == 'b1') {
        var s1 = document.getElementById('s1');
        for (var i = 0; i < s1.options.length; ++i) {
            if (s1.options[i].text != "") {
                texto = texto + s1.options[i].text + "\n";
            }
        }
    }
    else {
        var s2 = document.getElementById('s2');
        for (var i = 0; i < s2.options.length; ++i) {
            if (s2.options[i].text != "") {
                texto = texto + s2.options[i].text + "\n";
            }
        }
    }
    navigator.clipboard.writeText(texto);
}


function borrar(s) {

    var sel = document.getElementById(s);
    for (var i = 0; i < sel.options.length; ++i) {
        if (sel.options[i].selected && sel.options[i].text != "") {
            sel.options[i].text = "";
        }
    }
}

function copiarCodigo(boton) {
    var texto = "";
    if (boton.name == 'b1') {
        var s1 = document.getElementById('s1');
        for (var i = 0; i < s1.options.length; ++i) {
            if (s1.options[i].text != "") {
                texto = texto + getCodigo(s1.options[i].text) + ", ";
            }
        }
    }
    else {
        var s2 = document.getElementById('s2');
        for (var i = 0; i < s2.options.length; ++i) {
            if (s2.options[i].text != "") {
                texto = texto + getCodigo(s2.options[i].text) + ", ";
            }
        }
    }
    texto = texto.substring(0, texto.length - 2)
    navigator.clipboard.writeText(texto);
}

function getCodigo(est) {

    var res = est.split(".", 3)[0] + "." + est.split(".", 3)[1] + "." + est.split(".", 3)[2];
    return res;
}
 