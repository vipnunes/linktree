function CheckIsValidDomain(domain) {
  var re = new RegExp(
    /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
  );
  return domain.match(re);
}

function data(data) {
  return new Date(data.replace("T", " ").slice(0, 16))
    .toLocaleString()
    .slice(0, 10);
}

function getValue(name, txt, posicao = 1) {
  let arr = txt.split(name)[posicao];
  let arr_end = "";
  if (arr == undefined) {
    arr = txt.split(name)[1];
  }
  if (arr == undefined) {
    arr_end = "";
  } else {
    arr_end = arr.split(/\n/)[0];
  }
  return arr_end;
}

function printWhoIs(txt) {
  var conteudo = "";
  var dominio = {
    "Nome do domínio": getValue("Domain Name: ", txt),
    "Data de registro": data(getValue("Creation Date: ", txt)),
    "Data de alteração": data(getValue("Updated Date: ", txt)),
    "Data de vencimento": data(getValue("Registry Expiry Date: ", txt))
  };
  conteudo += tablesTemplate("Domínio", "dark", dominio);

  var dns = {
    Nameserver: getValue("Name Server: ", txt),
    " Nameserver": getValue("Name Server: ", txt, 2),
    DNSSEC: getValue("DNSSEC: ", txt)
  };
  conteudo += tablesTemplate("DNS (Nameservers)", "", dns);

  var inclui_dados_pessoais = 2;
  var titular = {
    "Nome do titular": getValue(
      "Registrant Name: ",
      txt,
      inclui_dados_pessoais
    ),
    Organização: getValue(
      "Registrant Organization: ",
      txt,
      inclui_dados_pessoais
    ),
    Endereço: getValue("Registrant Street: ", txt, inclui_dados_pessoais),
    Cidade: getValue("Registrant City: ", txt, inclui_dados_pessoais),
    "Estado/Provincia": getValue(
      "Registrant State/Province: ",
      txt,
      inclui_dados_pessoais
    ),
    "Código Postal": getValue(
      "Registrant Postal Code: ",
      txt,
      inclui_dados_pessoais
    ),
    País: getValue("Registrant Country: ", txt, inclui_dados_pessoais),
    Telefone: getValue("Registrant Phone: ", txt, inclui_dados_pessoais),
    "Telefone Ext": getValue(
      "Registrant Phone Ext: ",
      txt,
      inclui_dados_pessoais
    ),
    Email: getValue("Registrant Email: ", txt, inclui_dados_pessoais)
  };
  conteudo += tablesTemplate("Titular", "danger", titular);

  var registrante = {
    "Entidade registrante": getValue("Registrar: ", txt),
    URL: getValue("Registrar URL: ", txt, 2),
    "IANA ID": getValue("Registrar IANA ID: ", txt)
  };
  conteudo += tablesTemplate("Registrante", "info", registrante);

  document.getElementById("whois_result").innerHTML = conteudo;
}

function tablesTemplate(titulo, bg, array) {
  var table =
    '\n\t<table class="styled-table">\n\t\t<thead>\n\t\t\t<tr class="bg-' +
    bg +
    '">\n\t\t\t\t<th colspan="3">' +
    titulo +
    " </th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n";
  var active = "";
  var total_dados = 0;
  for (var chave in array) {
    let valor = array[chave];
    if (
      valor == "" ||
      valor == undefined ||
      valor == " " ||
      valor == "Invalid Da"
    )
      continue;
    if (chave.includes("vencimento") || chave.includes("Nameserver")) {
      active = ' class="active-row"';
    } else {
      active = "";
    }
    table +=
      "\t\t\t<tr" +
      active +
      ">\n\t\t\t\t<td>" +
      chave +
      ": </td>\n\t\t\t\t<td>" +
      valor +
      " </td>\n\t\t\t</tr>\n";
    total_dados++;
  }
  if (total_dados == 0) {
    table +=
      "\t\t\t<tr" +
      active +
      '>\n\t\t\t\t<td colspan="3" align="center">Nenhuma informação encontrada. <br>Tente outra extensão.</td>\n\t\t\t</tr>\n';
  }

  table += "\t\t</tbody>\n\t</table>\n";
  return table;
}

function searchWhoIs() {
  let dominio = document.getElementById("searchQueryInput").value;
  if (CheckIsValidDomain(dominio)) {
    document.getElementById("whois_result").innerHTML =
      '<div class="loading-pulse"></div>';

    const xhttp = new XMLHttpRequest();
    (xhttp.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        printWhoIs(this.responseText);
        document
          .getElementById("busca_whois")
          .classList.remove("center_search");
        //document.getElementById("whois").innerHTML = '<pre>' + this.responseText + '</pre>';
      } else {
        document.getElementById("whois_result").innerHTML =
          '<div class="alert alert-danger mt-5" role="alert"><strong>Ocorreu um erro:</strong> ' +
          this.responseText +
          "</div>";
      }
    }),
      (xhttp.error = function () {
        document.getElementById("whois").innerHTML =
          '<div class="alert alert-info alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Ocorreu um erro:</strong> verifique sua conexão!</div>';
      });
    xhttp.open(
      "GET",
      "//cors-anywhere.herokuapp.com/https://king.host/wiki/cabecalho-email/whois?q=" +
        dominio
    );
    xhttp.send();
  } else {
    document.getElementById("whois").innerHTML =
      '<div class="alert alert-warning alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Atenção:</strong> digite um domínio válido!</div>';
  }
}

document
  .getElementById("searchWhoIs")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    searchWhoIs();
  });