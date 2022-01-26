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
                        <form action='submit-text.php' method='post' target='test1-iframe'>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-1.html')); ?></code>
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
                        <form action='submit-text.php' method='post' target='test2-iframe'>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-2.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test2-iframe'></iframe>
                        </div>
                    </section>
                </article>



                <article class='example-article'>
                    <h2>Url input</h2>
                    <section class='input-section'>
                        <form action='submit-text.php' method='post' target='test3-iframe'>
                            <hai-input label='Test 3' input-id='test3' name='test3' type='url'></hai-input>
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
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-3.html')); ?></code>
                            </pre>
                        </div>
                        <div data-code-tab='data'>
                            <iframe name='test3-iframe'></iframe>
                        </div>
                    </section>
                </article>
            </main>
            <footer id='container-footer'>

            </footer>
        </div>
    </body>
</html>