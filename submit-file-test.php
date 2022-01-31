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
        $pocet = count($_FILES['test11']['name']);

        for($i=0; $i < $pocet; $i++)
        {
            if (is_uploaded_file($_FILES['test11']['tmp_name'][$i]))
            {
                echo "File ". $_FILES['test11']['name'][$i] ." uploaded successfully.\n <br>";
            }
        }
        ?>
    </body>
</html>