<!doctype html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-light.min.css'>
        <link rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/androidstudio.min.css'
              media='(prefers-color-scheme: dark)'>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js'></script>
        <script>hljs.highlightAll();</script>
        <link rel='stylesheet' href='./style/style.css'>
        <link rel='stylesheet' href='./hai-input.css'>
        <link rel='stylesheet' href='./hai-input-dark.css' media='(prefers-color-scheme: dark)'>
        <script src='./js/main.js'></script>
        <title>Hai Form</title>
        <!--<script src="https://unpkg.com/vue@next"></script>-->
        <script type='module'>
            //import { defineCustomElement } from 'https://cdn.jsdelivr.net/npm/vue@3.2.19/dist/vue.esm-browser.js';
            import {register} from './hai-input.js';
            register();
        </script>
    </head>
    <body>
        <header>
            <h1>Hai Form - testování</h1>
            <nav>
                <ul id='main-menu'>
                    <li class='active'><a href='./'>Demo</a></li>
                    <li><a href='./demo-vue.php'>Demo (Vue.js)</a></li>
                </ul>
            </nav>
        </header>
        <div id='container'>
            <main>
                <article class='example-article'>
                    <h2>Textový input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test1-iframe'>
                            <input id='test1' name='test1' value='' type='text'>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-1.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test1-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["mask.html", "maskTokens.html", "maxLength.html", "minLength.html",
                                    "placeholder.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                $globalni_parametry = ["required.html", "label.html", "value.html"];
                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test1 = document.getElementById('test1');
                    let parameters = {mask : '000 - AAA', label: 'Test 1', placeholder: '000 - AAA'}
                    let haiInput = await HaiInput.create('text', test1, parameters);
                </script>



                <article class='example-article'>
                    <h2>Číselný input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test2-iframe'>
                            <input id='test2' name='test2' value='200' type='number'>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-2.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test2-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["min.html", "max.html", "step.html", "stripLeadingZeros.html",
                                    "decimalSeparator.html", "delimiter.html", "thousandsGroupStyle.html",
                                    "enableValueFormation.html", "mask.html", "maskTokens.html",
                                    "maxLength.html", "minLength.html", "placeholder.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test2 = document.getElementById('test2');
                    let parameters = {max: 250_000, label: 'Test 2'}
                    let haiInput = await HaiInput.create('number', test2, parameters);
                </script>



                <article class='example-article'>
                    <h2>URL input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test3-iframe'>
                            <input id='test3' name='test3' type='url'>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-4.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test3-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["allowedSchemes.html", "defaultScheme.html", "requireHost.html",
                                    "allowPart.html", "stripPart.html", "mask.html", "maskTokens.html",
                                    "maxLength.html", "minLength.html", "placeholder.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test3 = document.getElementById('test3');
                    let parameters = {label: 'Test 3'}
                    let haiInput = await HaiInput.create('url', test3, parameters);
                </script>



                <article class='example-article'>
                    <h2>Switch input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test4-iframe'>
                            <input id='test4' name='test4' type='text' value='on'>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-4.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test4-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["variant.html", "options-switch.html", "list.html", "optionOnValue.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test4 = document.getElementById('test4');
                    let parameters = {label: 'Test 4'}
                    let haiInput = await HaiInput.create('switch', test4, parameters);
                </script>


                <article class='example-article'>
                    <h2>Switch input (varianta multiple)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test5-iframe'>
                            <input id='test5' name='test5' type='text' value='py'>
                            <datalist id='test5-datalist'>
                                <option value='php'>PHP</option>
                                <option value='js'>Javascript</option>
                                <option value='py'>Python</option>
                            </datalist>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-5.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test5-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["variant.html", "options-switch.html", "list.html", "optionOnValue.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test5 = document.getElementById('test5');
                    let parameters = {list: 'test5-datalist', label: 'Test 5'};
                    let haiInput = await HaiInput.create('switch', test5, parameters);
                </script>



                <article class='example-article'>
                    <h2>Select</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test6-iframe'>
                            <select id='test6' name='test6[]' multiple>
                                <option value='js' selected>Javascript</option>
                                <option value='py'>Python</option>
                                <option value='php' selected>PHP</option>
                                <option value='c#'>C#</option>
                                <option value='c++'>C++</option>
                                <option value='f'>F</option>
                                <option value='ts'>Typescript</option>
                                <option value='xml'>XML</option>
                                <option value='json'>JSON</option>
                                <option value='html'>HTML</option>
                                <option value='shell'>Shell</option>
                                <option value='markdown'>Markdown</option>
                                <option value='css'>CSS</option>
                            </select>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-6.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test6-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["options.html", "optionsSource.html", "multiple.html", "enableSearch.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test6 = document.getElementById('test6');
                    let parameters = {label: 'Test 6', multiple: true};
                    let haiInput = await HaiInput.create('select', test6, parameters);
                </script>



                <article class='example-article'>
                    <h2>Select (option groups)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test7-iframe'>
                            <select id='test7' name='test7[]' multiple>
                                <optgroup label='First group'>
                                    <option value='py'>Python</option>
                                    <option value='php' selected>PHP</option>
                                </optgroup>
                                <optgroup label='Second group'>
                                    <option value='css'>CSS</option>
                                    <option value='xml'>XML</option>
                                    <option value='html'>HTML</option>
                                </optgroup>
                                <optgroup label='Third group'>
                                    <option value='js' selected>Javascript</option>
                                    <option value='c#'>C#</option>
                                    <option value='c++'>C++</option>
                                    <option value='shell'>Shell</option>
                                    <option value='markdown'>Markdown</option>
                                </optgroup>
                            </select>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-7.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test7-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["options.html", "optionsSource.html", "multiple.html", "enableSearch.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test7 = document.getElementById('test7');
                    let parameters = {label: 'Test 7', multiple: true};
                    let haiInput = await HaiInput.create('select', test7, parameters);
                </script>



                <article class='example-article'>
                    <h2>Select (single)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test8-iframe'>
                            <select id='test8' name='test8'>
                                <option value='js' selected>Javascript</option>
                                <option value='py'>Python</option>
                                <option value='php' selected>PHP</option>
                                <option value='c#'>C#</option>
                                <option value='c++'>C++</option>
                                <option value='f'>F</option>
                                <option value='ts'>Typescript</option>
                                <option value='xml'>XML</option>
                                <option value='json'>JSON</option>
                                <option value='html'>HTML</option>
                                <option value='shell'>Shell</option>
                                <option value='markdown'>Markdown</option>
                                <option value='css'>CSS</option>
                            </select>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-8.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test8-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["options.html", "optionsSource.html", "multiple.html", "enableSearch.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test8 = document.getElementById('test8');
                    let parameters = {label: 'Test 8'};
                    let haiInput = await HaiInput.create('select', test8, parameters);
                </script>



                <article class='example-article'>
                    <h2>Select (data given in parameter)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test9-iframe'>
                            <input id='test9' name='test9'>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-9.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test9-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["options.html", "optionsSource.html", "multiple.html", "enableSearch.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test9 = document.getElementById('test9');
                    let parameters = {
                        label: 'Test 9',
                        enableSearch: false,
                        options:
                            [
                                {value: 'php', label: 'PHP', group: 'First Group'},
                                {value: 'javascript', label: 'JS', group: 'First Group'},
                                {value: 'xml', label: 'XML', group: 'Second Group', selected: true},
                                {value: 'json', label: 'JSON', group: 'Second Group'}
                            ]};
                    let haiInput = await HaiInput.create('select', test9, parameters);
                </script>



                <article class='example-article'>
                    <h2>Select (data from remote file)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test10-iframe'>
                            <input id='test10' name='test10[]'>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-10.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test10-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["options.html", "optionsSource.html", "multiple.html", "enableSearch.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test10 = document.getElementById('test10');
                    let parameters = {
                        label: 'Test 10',
                        optionsSource: 'employee-data.json',
                        multiple: true
                    };
                    let haiInput = await HaiInput.create('select', test10, parameters);
                </script>



                <article class='example-article'>
                    <h2>File</h2>
                    <section class='input-section'>
                        <form action='submit-file-test.php' method='post' target='test11-iframe' enctype='multipart/form-data'>
                            <input id='test11' name='test11[]' type='file'>
                            <input class='submit-test' type='submit'>
                        </form>
                    </section>
                    <section class='code-section'>
                        <header>
                            <div class='active' data-code-tab-header='html'>HTML</div>
                            <div data-code-tab-header='data'>Data</div>
                            <div data-code-tab-header='parametry'>Parametry</div>
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-11.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test11-iframe'></iframe>
                        </div>
                        <div data-code-tab='parametry' class='doc-tab'>
                            <ul>
                                <?php
                                $parametry = ["multiple-file.html", "maxFilesCount.html", "maxFileSize.html",
                                    "maxTotalSize.html", "allowedFileTypes.html"];

                                foreach ($parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }

                                ?>
                                <li class='doc-section-header'>Globální parametry</li>
                                <?php
                                foreach ($globalni_parametry as $parametr)
                                {
                                    echo "<li>";
                                    include "documentation/parameters/{$parametr}";
                                    echo "</li>";
                                }
                                ?>
                            </ul>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test11 = document.getElementById('test11');
                    let parameters = {
                        label: 'Test 11',
                        multiple: true,
                        maxFilesCount: 5,
                        allowedFileTypes: ['.pdf', 'image/*', 'text/css'],
                        maxFileSize: 15_000_000
                    };
                    let haiInput = await HaiInput.create('file', test11, parameters);
                </script>
            </main>
            <footer id='container-footer'>

            </footer>
        </div>
    </body>
</html>