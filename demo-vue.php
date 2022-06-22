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
            <div>
                <a href='https://github.com/safraja/hai-form' class='github-link' rel='external nofollow'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    <span>GitHub</span>
                </a>
                <a href='https://vuejs.org/' class='github-link' rel='external nofollow'>
                    <svg width="24" height="24" viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                        <g>
                            <path d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z" fill="#41B883"></path>
                            <path d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z" fill="#41B883"></path>
                            <path d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z" fill="#35495E"></path>
                        </g>
                    </svg>
                    <span>Vue.js</span>
                </a>
            </div>
            <nav>
                <ul id='main-menu'>
                    <li><a href='./introdution.php'>Představení</a></li>
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
                            <hai-input label='Test 1' twin-id='test' name='test' mask='AAA-000' placeholder='AAA-000'></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-1.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test1-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                            <hai-input label='Test 2' twin-id='test2' name='test2' value='200' type='number' max='100000' min='100' ></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-2.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test2-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                            <iframe name='test3-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                            <hai-input label='Test 4' twin-id='test4' name='test4' value='on' type='switch'></hai-input>
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
                            <iframe name='test4-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                    <h2>Switch input (varianta multiple)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test5-iframe'>
                            <hai-input label='Test 5' twin-id='test5' name='test5' value='py'
                                       type='switch' list='test5-datalist' variant='multiple'></hai-input>
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
                            <iframe name='test5-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                            <hai-input label='Test 6' twin-id='test6' name='test6[]' multiple
                                       type='select' list='test6-datalist'></hai-input>
                            <datalist id='test6-datalist'>
                                <option value='js' data-selected>Javascript</option>
                                <option value='py'>Python</option>
                                <option value='php' data-selected>PHP</option>
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
                            <iframe name='test6-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                    <h2>Select (option groups)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test7-iframe'>
                            <hai-input label='Test 7' twin-id='test7' name='test7[]' multiple
                                       type='select' list='test7-datalist'></hai-input>
                            <datalist id='test7-datalist'>
                                <option value='py' data-group='First group'>Python</option>
                                <option value='php' data-group='First group' data-selected>PHP</option>
                                <option value='css' data-group='Second group'>CSS</option>
                                <option value='xml' data-group='Second group'>XML</option>
                                <option value='html' data-group='Second group'>HTML</option>
                                <option value='js' data-group='Third group' data-selected>Javascript</option>
                                <option value='c#' data-group='Third group'>C#</option>
                                <option value='c++' data-group='Third group'>C++</option>
                                <option value='shell' data-group='Third group'>Shell</option>
                                <option value='markdown' data-group='Third group'>Markdown</option>
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
                            <iframe name='test7-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                    <h2>Select (single)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test8-iframe'>
                            <hai-input label='Test 8' twin-id='test8' name='test8'
                                       type='select' list='test8-datalist'></hai-input>
                            <datalist id='test8-datalist'>
                                <option value='js' data-selected>Javascript</option>
                                <option value='py'>Python</option>
                                <option value='php' data-selected>PHP</option>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-8.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test8-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
                    <h2>Select (data from remote file)</h2>
                    <section class='input-section'>
                        <form action='submit-test.php' method='post' target='test9-iframe'>
                            <hai-input label='Test 9' twin-id='test9' name='test9'
                                       type='select' options-source='employee-data.json'></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-9.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test9-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-10.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test10-iframe' srcdoc='<span style="color: gray;">Submit the form to see what data has been sent.</span>'></iframe>
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