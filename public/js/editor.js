var editorArea = document.getElementById('editor');

var editor = CodeMirror.fromTextArea(editorArea, {
    lineNumbers: true,
    autoCloseBrackets: true,
    newlineAndIndentContinueMarkdownList: true,
    matchBrackets: true,
    showTrailingSpace: true,
    indentUnit: 4,
    theme: 'monokai',
    mode: 'javascript'
});

var timer, autoRun, log;

autoRun = document.getElementById('auto-run');
log = document.getElementById('log');

editor.addKeyMap({
    'Cmd-Enter': function(editor) {
        babel.run(editor.getValue());
    },
    'Cmd-]': function(editor) {
        log.innerHTML = '';
    },
    'Cmd-[': function(editor) {
        editor.setValue('');
    },
    'Cmd-Backspace': function(editor) {
        log.innerHTML = '';
        editor.setValue('');
    },
    'Cmd-/': function(editor) {
        var commands = [
            'Cmd + Enter --> Run code',
            'Cmd + ] --> Clear log', 
            'Cmd + [ --> Clear code', 
            'Cmd + Backspace --> Clear all',
            'Cmd + / --> Show this box'
        ];

        alert(commands.join('\n\n'));
    }
})

editor.on('inputRead', function() {
    if (!autoRun.checked) return;

    timer && clearTimeout(timer);

    timer = setTimeout(function() {
        babel.run(editor.getValue());
    }, 1000);
});