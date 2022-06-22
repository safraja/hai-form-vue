<!doctype html>
<html>
    <head>
        <meta charset='utf-8'>
        <link rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-light.min.css'>
        <link rel='stylesheet'
              href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/androidstudio.min.css'
              media='(prefers-color-scheme: dark)'>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js'></script>
        <script>hljs.highlightAll();</script>
        <style>
            @media (prefers-color-scheme: dark)
            {
                body
                {
                    background: #282b2e;
                    color: #dfdfdf;
                }
            }
        </style>
        <title>Hai Form - Submit test</title>
    </head>
    <body>
        <?php
        if(empty($_POST) == false)
        {
            $json = json_encode($_POST, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT|
                JSON_UNESCAPED_SLASHES|JSON_PRESERVE_ZERO_FRACTION);

            echo "<pre><code class='language-json'>{$json}</code></pre>";
        }
        elseif(isset($_POST))
        {
            echo "<pre><code class='language-json'>{}</code></pre>";
        }
        ?>
    </body>
</html>