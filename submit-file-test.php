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
        foreach ($_FILES as $file)
        {
            $count = count($file['name']);

            for($i=0; $i < $count; $i++)
            {
                if (is_uploaded_file($file['tmp_name'][$i]))
                {
                    echo "File ". $file['name'][$i] ." uploaded successfully.\n <br>";
                }
            }
        }
        ?>
    </body>
</html>