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
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-1.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test1-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <script type="module" async>
                    import {HaiInput} from "./classes/hai-input-class.js";

                    let test1 = document.getElementById('test1');
                    let parameters = {mask : '000 - AAA', label: 'Test 1'}
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
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-2.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test2-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <script type="module" async>
                    import {HaiInput} from "./classes/hai-input-class.js";

                    let test2 = document.getElementById('test2');
                    let parameters = {max: 250_000}
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
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-4.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test3-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <script type="module" async>
                    import {HaiInput} from "./classes/hai-input-class.js";

                    let test3 = document.getElementById('test3');
                    let haiInput = await HaiInput.create('url', test3);
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
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-4.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test4-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <script type="module" async>
                    import {HaiInput} from "./classes/hai-input-class.js";

                    let test4 = document.getElementById('test4');
                    let haiInput = await HaiInput.create('switch', test4);
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
                        </header>
                        <div class='active' data-code-tab='html'>
                            <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-5.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test5-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <script type='module' async>
                    import {HaiInput} from './classes/hai-input-class.js';

                    let test5 = document.getElementById('test5');
                    let parameters = {list: 'test5-datalist'};
                    let haiInput = await HaiInput.create('switch', test5, parameters);
                </script>
            </main>
            <footer id='container-footer'>

            </footer>
        </div>
    </body>
</html>