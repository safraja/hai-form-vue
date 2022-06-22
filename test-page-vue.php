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
            <h1>Hai Form</h1>
            <nav>
                <ul id='main-menu'>
                    <li><a href='./'>Demo</a></li>
                    <li class='active'><a href='./demo-vue.php'>Demo (Vue.js)</a></li>
                </ul>
            </nav>
        </header>
        <div id='container'>
            <main>
                <article class='example-article'>
                    <h2>Text input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test1-iframe'>
                            <hai-input label='Test 1' twin-id='test1' name='test1'></hai-input>
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
<code class="language-html"></code>
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



                <article class='example-article'>
                    <h2>Text input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test1.1-iframe'>
                            <hai-input label='Test 1.1' twin-id='test1.1' name='test1.1' mask='00!A-SSSS' placeholder='00!A-SSSS'></hai-input>
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
<code class="language-html"></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test1.1-iframe'></iframe>
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


                <article class='example-article'>
                    <h2>Číselný input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test2-iframe'>
                            <hai-input label='Test 2' twin-id='test2' name='test2' type='number'></hai-input>
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
<code class="language-html"></code>
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



                <article class='example-article'>
                    <h2>Číselný input - step 5</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test2.1-iframe'>
                            <hai-input label='Test 2.1' twin-id='test2.1' name='test2.1' type='number' step='5'></hai-input>
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
<code class="language-html"></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test2.1-iframe'></iframe>
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



                <article class='example-article'>
                    <h2>Url input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test3-iframe'>
                            <hai-input label='Test 3' twin-id='test3' name='test3' type='url'></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-3.html')); ?></code>
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



                <article class='example-article'>
                    <h2>Switch input</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test4-iframe'>
                            <hai-input label='Test 4' twin-id='test4' name='test4' type='switch' value='on'></hai-input>
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
<code class="language-html"></code>
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



                <article class='example-article'>
                    <h2>Switch input - readonly</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test4.1-iframe'>
                            <hai-input label='Test 4.1' twin-id='test4.1' name='test4.1' type='switch'
                                       value='on' readonly></hai-input>
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
<code class="language-html"></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test4.1-iframe'></iframe>
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


                <article class='example-article'>
                    <h2>Switch input - disabled</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test4.2-iframe'>
                            <hai-input label='Test 4.2' twin-id='test4.2' name='test4.2' type='switch'
                                       value='on' disabled></hai-input>
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
<code class="language-html"></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test4.2-iframe'></iframe>
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


                <article class='example-article'>
                    <h2>Switch input - varianta multiple</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test5-iframe'>
                            <hai-input label='Test 5' twin-id='test5' name='test5' value='py'
                                       type='switch' list='test5-datalist' variant='multiple' value='py'></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-5.html')); ?></code>
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



                <article class='example-article'>
                    <h2>Select</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test6-iframe'>
                            <hai-input label='Test 6' twin-id='test6' name='test6'
                                       type='select' list='test6-datalist'></hai-input>
                            <datalist id='test6-datalist'>
                                <option value='js' data-selected>Javascript</option>
                                <option value='py'>Python</option>
                                <option value='php' data-selected>PHP</option>
                                <option value='c#'>C#</option>
                                <option value='c++'>C++</option>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-6.html')); ?></code>
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



                <article class='example-article'>
                    <h2>Select - multiple</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test7-iframe'>
                            <hai-input label='Test 7' twin-id='test7' name='test7[]' multiple
                                       type='select' list='test7-datalist'></hai-input>
                            <datalist id='test7-datalist'>
                                <option value='py'>Python</option>
                                <option value='php' selected>PHP</option>
                                <option value='css'>CSS</option>
                                <option value='xml'>XML</option>
                                <option value='html'>HTML</option>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-7.html')); ?></code>
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



                <article class='example-article'>
                    <h2>File</h2>
                    <section class='input-section'>
                        <form action='submit-file-test.php' method='post' target='test10-iframe' enctype='multipart/form-data'>
                            <hai-input label='Test 10' twin-id='test10' name='test10[]'
                                       type='file'></hai-input>
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
<code class="language-html"></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test10-iframe'></iframe>
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



                <article class='example-article'>
                    <h2>File - multiple</h2>
                    <section class='input-section'>
                        <form action='submit-file-test.php' method='post' target='test10.1-iframe' enctype='multipart/form-data'>
                            <hai-input label='Test 10.1' twin-id='test10.1' name='test10.1[]'
                                       type='file' multiple></hai-input>
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
<code class="language-html"></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test10.1-iframe'></iframe>
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
            </main>
            <footer id='container-footer'>

            </footer>
        </div>
    </body>
</html>