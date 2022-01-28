<!doctype html>
<html>
    <head>
        <meta charset='utf-8'>
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
            var_dump($_POST);
        }
        ?>
    </body>
</html>