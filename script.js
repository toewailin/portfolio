var Typer = {
    text: '',
    index: 0,
    speed: 3,
    file: 'AboutMe.txt',
    cursor: '<span class="blink-cursor">|</span>',
    init: function () {
        $.ajax({
            url: Typer.file,
            dataType: 'text',
            success: function(data) {
                Typer.text = data;
                Typer.typing();
            },
            error: function() {
                console.error("Could not load file");
            }
        });
    },
    typing: function () {
        if (Typer.index < Typer.text.length) {
            let nextChar = Typer.text.charAt(Typer.index);
            let content = $('#console').html();
    
            // Remove existing cursor
            if (content.endsWith(Typer.cursor)) {
                $('#console').html(content.slice(0, -Typer.cursor.length));
            }
    
            // Special handling for `[Download Resume 📄](...)`
            if (Typer.text.substring(Typer.index).startsWith('[Download Resume 📄](')) {
                let end = Typer.text.indexOf(')', Typer.index);
                let linkText = 'Download Resume 📄';
                let linkUrl = Typer.text.substring(Typer.text.indexOf('(', Typer.index) + 1, end);
                $('#console').append(`<a href="${linkUrl}" target="_blank" style="color:#00d9ff;">${linkText}</a><br/>`);
                Typer.index = end + 1;
            } else {
                $('#console').append(nextChar === '\n' ? '<br/>' : nextChar);
                Typer.index++;
            }
    
            // Add cursor
            $('#console').append(Typer.cursor);
    
            $('#console').scrollTop($('#console')[0].scrollHeight);
            setTimeout(Typer.typing, 30);
        }
    }
};

function replaceUrls(text) {
    var http = text.indexOf('http://');
    var space = text.indexOf('.me ', http);
  
    if (space != -1) {
      var url = text.slice(http, space - 1);
      return text.replace(url, '<a href="' + url + '">' + url + '</a>');
    } else {
      return text;
    }
  }
  
Typer.init();
