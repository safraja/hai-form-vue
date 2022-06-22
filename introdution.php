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
                <a href='https://github.com/safraja/hai-form' class='github-link'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    <span>GitHub</span>
                </a>
            </div>
            <nav>
                <ul id='main-menu'>
                    <li class='active'><a href='./introdution.php'>Představení</a></li>
                    <li><a href='./'>Demo</a></li>
                    <li><a href='./demo-vue.php'>Demo (Vue.js)</a></li>
                </ul>
            </nav>
        </header>
        <div id='container'>
            <main class='centered'>
                <div class='main-text-container'>
                    <h2>Představení</h2>
                    <p>
                        Hai Form je open source javascriptová knihovna poskytující základní řešení pro nejběžnější potřeby
                        formulářových polí. Jejím záměrem je pokrýt co nejvíce typů polí, aby vývojáři
                        webových stránek nemuseli při vytváření formulářů používat velké množství externích knihoven.
                    </p>

                    <h3>Co Hai Form nabízí</h3>
                    <h4>6 typů polí</h4>
                    <p>
                        V současné verzi podporuje Hai Form 6 typů formulářových polí: textové, číselné, URL,
                        přepínač, rozbalovací nabídku (select) a nahrávací pole pro soubory. Každý z těchto typů
                        nabízí funkcionality, které nejsou dostupné ve standardních formulářových polí HTML5, a zároveň
                        má každý z uvedených typů i řadu nastavitelných parametrů, kterými lze fungování pole ovlivnit.
                    </p>
                    <div class='types-table'>
                        <span>Text</span>
                        <span>Number</span>
                        <span>URL</span>
                        <span>Switch</span>
                        <span>Select</span>
                        <span>File</span>
                    </div>

                    <h4>2 barevná témata</h4>
                    <p>
                        Hai Form nabízí světlou i tmavou verzi pro všechny podporované typy polí.
                    </p>
                    <div class='two-images-example'>
                        <div class='image-example'>
                            <img src='./images/light-theme.jpg' alt=''>
                        </div>
                        <div class='image-example'>
                            <img src='./images/dark-theme.jpg' alt=''>
                        </div>
                    </div>

                    <h4>2 způsoby implementace</h4>
                    <p>
                        Knihovnu Hai Form lze používat buď napřímo prostřednictvím čistého javascriptu, nebo
                        pomocí frameworku <a href='https://vuejs.org/'>Vue.js</a> přes custom HTML elementy.
                    </p>
                    <div class='two-codes-example'>
                        <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/basic/example-1.html')); ?></code>
                        </pre>
                        <pre>
<code class="language-html"><?php echo htmlspecialchars(file_get_contents('./code-examples/vue/example-1.html')); ?></code>
                        </pre>
                    </div>

                    <h4>Podporu data atributů</h4>
                    <p>
                        Při použití knihovny Hai Form pomocí čistého javascriptu lze hodnoty parametrů pole
                        nastavovat prostřednictvím stejnojmenných atributů s prefixem <code>data-</code>
                    </p>
                    <div class='one-code-example'>
                        <pre>
<code class="language-html">&lt;input id='test' name='test' value='' type='text' data-label='Test 1'
       data-mask='000 - AAA'  data-placeholder='000 - AAA'&gt;</code>
                        </pre>
                    </div>

                    <h3>Jak Hai Form funguje</h3>
                    <p>
                        Jakmile je na určitý input zavolána funkce <code>HaiInput.create()</code>, je dané pole automaticky
                        přetvořeno na formulářové pole knihovny Hai Form. V rámci tohoto procesu se pro dané pole vytvoří "dvojče"
                        v podobě skrytého textového inputu, do kterého jsou přenášený hodnoty z pole
                        knihovny Hai Form. Spolu s tím se do některého z elementů (v závislosti na typu pole) vygenerovaného
                        pole knihovny Hai Form uloží objekt HaiInput, který obsahuje všechny klíčové hodnoty i funkce
                        daného pole a lze ho přes něj upravovat i po úvodní inicializaci.
                    </p>
                    <h3>Informace k jednotlivým typům polí</h3>
                    <h4>Textové pole</h4>
                    <p>
                        Hlavním přínosem textového pole knihovny Hai Form je možnost nastavení masky určují podobu,
                        kterou má mít zadaný text. To je vhodné kupříkladu pro pole, do kterého má být zadána
                        registrační značka vozu nebo třeba číslo kreditní karty. Oproti regulárním výrazům
                        zadávaným přes atribut pattern má maska tu výhodu, že vůbec nepovolí napsání nevyhovujících
                        znaků a automaticky doplňuje ty, které jsou pevně dané, kupříkladu pomlčky nebo mezery.
                    </p>
                    <h4>Číselné pole</h4>
                    <p>
                        Pro uživatele je daleko příjemnější, když se číslo formátuje do tvaru, který je lépe čitelný
                        a odpovídá tomu, na co je uživatel zvyklý. Stejně tak je vhodné, když je do číselného
                        pole možné zkopírovat již nějakým způsobem formátovaná čísla kupříkladu z aplikace MS
                        Excel. Přesně tyto funkce knihovna Hai Form pro číselná pole nabízí.
                    </p>
                    <h4>URL pole</h4>
                    <p>
                        Standardní inputy typu URL nabízí pouze velmi omezenou kontrolu validity zadané adresy.
                        Naproti tomu knihovna Hai Form umožňuje povolení nebo naopak zákaz jednotlivých částí
                        URL adresy jako je port, uživatelské jméno a heslo, nebo cesta. Stejně tak je možné povolit pouze
                        specifický seznam protokolů a vybrat protokol, který má být automaticky doplňován, pakliže
                        uživatel žádný neuvede.
                    </p>
                    <h4>Přepínač</h4>
                    <p>
                        Přepínač je typ pole, který je velmi známý a běžně používaný zejména na mobilních zařízeních,
                        ale HTML5 ho ve svém základu nenabízí. Proto knihovna Hai Form toto pole přidává, a to rovnou
                        ve dvou variantách, kdy může uživatel vybírat buď ze dvou, nebo více hodnot.
                    </p>
                    <h4>Rozbalovací nabídka</h4>
                    <p>
                        Oproti tradičním selectům nabízí rozbalovací nabídka knihovny Hai Form řadu vylepšení
                        zahrnujících zejména responzivní zobrazení, možnost filtrování položek nabídky na základě
                        zadaného textu, načtení dat z externího JSON souboru a výrazně uživatelsky přívětivější
                        rozhraní pro nabídky s možností výběru více než jedné položky.
                    </p>
                    <h4>Nahrávací pole pro soubory</h4>
                    <p>
                        Nahrávací pole je v knihovně Hai Form realizováno odlišně oproti většině javascriptových
                        knihoven jako je kupříkladu <a href='http://dropzone.dev'>Dropzone</a>. Na rozdíl od nich
                        neumí nahrávací pole v knihovně Hai Form samo uploadovat soubory na server, ale funguje
                        prakticky jako grafické rozhraní pro klasický input typu file, který se odesílá
                        normálně se zbytkem formuláře.
                    </p>
                    <p>
                        Mimo základní funkci Drag & Drop nabízí nahrávací pole v knihovně Hai Form navíc ještě
                        možnost nastavit parametry omezující kupříkladu maximální počet vybraných souborů,
                        jejich velikost, nebo jejich povolené formáty.
                    </p>
                </div>
            </main>
            <footer id='container-footer'>

            </footer>
        </div>
    </body>
</html>