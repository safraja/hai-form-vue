<?php
if(empty($_POST) == false)
{
    var_dump($_POST);
    exit();
}
?>

<!doctype html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-light.min.css'>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js'></script>
        <script>hljs.highlightAll();</script>
        <link rel='stylesheet' href='./style/style.css'>
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
        </header>
        <div id='container'>
            <main>
                <article class='example-article'>
                    <h2>Text input</h2>
                    <section class='input-section'>
                        <form method='post' target='test1-iframe'>
                            <hai-input label='Test 1' input-id='test' name='test' mask='AAA-000' placeholder='Napište...'></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/example-1.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test1-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <article class='example-article'>
                    <h2>Číselný input</h2>
                    <section class='input-section'>
                        <form method='post' target='test2-iframe'>
                            <hai-input label='Test 2' input-id='test2' name='test2' value='200' type='number' max='100000' min='100' ></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/example-2.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test2-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <article class='example-article'>
                    <h2>Číselný input (bez Vue)</h2>
                    <section class='input-section'>
                        <form method='post' target='test3-iframe'>
                            <div class='hai-input-element'>
                                <label>Test 3</label>
                                <input id='test3' data-hai-input='true' name='test3' value='200' type='number'>
                            </div>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/example-3.html')); ?></code>
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
                    let haiInput = await HaiInput.returnCorrectClass('number', test3);
                    haiInput.max = 250_000;
                </script>
                <article class='example-article'>
                    <h2>URL input (bez Vue)</h2>
                    <section class='input-section'>
                        <form method='post' target='test4-iframe'>
                            <div class='hai-input-element'>
                                <label>Test 4</label>
                                <input id='test4' data-hai-input='true' name='test4' type='url'>
                            </div>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/example-4.html')); ?></code>
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
                    let haiInput = await HaiInput.returnCorrectClass('url', test4);
                </script>
                <article class='example-article'>
                    <h2>Url input</h2>
                    <section class='input-section'>
                        <form method='post' target='test5-iframe'>
                            <hai-input label='Test 5' input-id='test5' name='test5' type='url'></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/example-5.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test5-iframe'></iframe>
                        </div>
                    </section>
                </article>

                <article class='example-article'>
                    <h2>Switch input (bez Vue)</h2>
                    <section class='input-section'>
                        <form method='post' target='test6-iframe'>
                            <input id='test6' data-hai-input='true' name='test6' type='text' value='on'>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/example-6.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test6-iframe'></iframe>
                        </div>
                    </section>
                </article>
                <script type="module" async>
                    import {HaiInput} from "./classes/hai-input-class.js";

                    let test6 = document.getElementById('test6');
                    let haiInput = await HaiInput.returnCorrectClass('switch', test6);
                </script>
            </main>
            <footer id='container-footer'>

            </footer>
        </div>
    </body>
</html>