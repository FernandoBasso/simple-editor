//
// NOTE: If you choose to use this version of the javascript file
// you don't need jQuery.
//


var l = console.log.bind(console);

var simpleEditor = (function () {

    var textareas = [],
        editors = [],
        btnsB = [],
        btnsI = [],
        btnsU = [];

    var template = " \
        <div class='simpledit wrapper'> \
            <div class='buttons'> \
                <i class='btn bold'>b</i> \
                <i class='btn italic'>i</i> \
                <i class='btn underline'>u</i> \
            </div> \
            <div class='text' contentEditable='true' spellcheck='false'></div> \
        </div> \
    ";

    /**
     * Remove formatting upon pasting text into the editable area.
     */
    function plainTextOnPaste() {
        editors.forEach(function (editor) {
            editor.querySelector('.text').addEventListener('paste', function () {
                var _self = this;
                setTimeout(function () {
                    // Set textContent with the result of textContent, which effectively
                    // removes any formatting (textContent is plain text, unlike innerHTML).
                    _self.textContent = _self.textContent;
                }, 3);
            });
        });
    }

    /**
     * Apply bold and italic when ‘b’ and ‘i’ buttons are clicked.
     *
     * In some browsers, ^b and ^i shortcuts just work. Sadly, some browsers
     * already use those shortcuts for themselves (^b bookmarks, ^i page info).
     */
    function formatText() {

        // Prevent loosing text selection when clicking the buttons.
        //$(document).on('mousedown', '.simpledit .buttons i.bold, .simpledit .buttons i.italic, .simpledit .buttons i.underline', function (evt) {
        //    evt.preventDefault();
        //});

        btnsB.forEach(function (item) {
            item.addEventListener('mousedown', function (evt) {
                evt.preventDefault();
            });

            item.addEventListener('click', function () {
                document.execCommand('bold');
            }, false);
        });

        btnsI.forEach(function (item) {
            item.addEventListener('mousedown', function (evt) {
                evt.preventDefault();
            });

            item.addEventListener('click', function () {
                document.execCommand('italic');
            }, false);
        });

        btnsU.forEach(function (item) {
            item.addEventListener('mousedown', function (evt) {
                evt.preventDefault();
            });

            item.addEventListener('click', function () {
                document.execCommand('underline');
            }, false);
        });
    }

    function setup(opts) {
        textareas = [].slice.call(document.querySelectorAll(opts.selector));

        // Add rich editors in place of the original textareas.
        textareas.forEach(function (item) {
            item.style.display = 'none';

            // We have to create a new object everytime otherwise
            // all editors are actually the same and that will give us problems.
            var tmpdiv = document.createElement('div');
            tmpdiv.innerHTML = template;
            editors.push(tmpdiv.firstElementChild);
            item.parentNode.insertBefore(tmpdiv.firstElementChild, item);
        });

        // Retrieve all buttons (b, i, u) from the available editors.
        editors.forEach(function (item) {
            btnsB.push(item.querySelector('.buttons i.bold'));
            btnsI.push(item.querySelector('.buttons i.italic'));
            btnsU.push(item.querySelector('.buttons i.underline'));
        });

        // Add listeners to btns.
        formatText();

        if (opts.pastePlain) {
            plainTextOnPaste();
        }
    }

    /**
     * Sends text from the editable content to their respective textareas.
     */
    function save() {
        editors.forEach(function (editor, index) {
            textareas[index].value = editor.querySelector('.text').innerHTML;
        });
    }

    function init(opts) {
        checkOpts(opts);

        setup(opts);
    }

    function checkOpts(opts) {
        opts.selector = opts.selector || 'textarea';
        opts.pastePlain = opts.pastePlain || false;
    }

    return {
        init: init,
        save: save
    };

})();

