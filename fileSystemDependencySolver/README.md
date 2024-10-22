<h2>Описание проекта</h2>
<p>Этот проект решает задачу работы с текстовыми файлами и их зависимостями. В корневой папке и её подкаталогах находятся текстовые файлы, в которых могут быть директивы вида <code>*require '&lt;путь к другому файлу&gt;'</code>. Эти директивы означают, что текущий файл зависит от указанного файла.</p>

<h3>Основная цель проекта</h3>
<ul>
    <li>Найти все текстовые файлы в корневой папке и её подкаталогах.</li>
    <li>Извлечь зависимости между файлами.</li>
    <li>Построить упорядоченный список файлов, для которого выполняется условие: если файл А зависит от файла В, то файл А должен находиться ниже файла В в списке.</li>
    <li>Объединить содержимое файлов в один итоговый файл, соблюдая порядок зависимостей.</li>
    <li>Если существует циклическая зависимость, программа сообщает об этом и указывает на циклический цикл.</li>
</ul>

<h2>Структура проекта</h2>
<ul>
    <li><strong>src/main/java/com/example/filedep/</strong>
        <ul>
            <li><code>Main.java</code> — основной файл, содержащий главную функцию программы.</li>
            <li><code>FileFinder.java</code> — класс для поиска всех текстовых файлов.</li>
            <li><code>DependencyExtractor.java</code> — класс для извлечения зависимостей между файлами.</li>
            <li><code>DependencyResolver.java</code> — класс для выполнения топологической сортировки и проверки на циклы.</li>
        </ul>
    </li>
    <li><strong>src/main/resources/root/</strong> — директория, в которой находятся тестовые файлы.</li>
</ul>

<h2>Как запустить проект</h2>
<h3>Шаги для компиляции и запуска</h3>
<ol>
    <li><strong>Клонируйте репозиторий:</strong>
        <pre><code>git clone &lt;ссылка на ваш репозиторий&gt;<br>cd &lt;название репозитория&gt;</code></pre>
    </li>
    <li><strong>Перейдите в директорию с заданием:</strong>
        <pre><code>cd fileSystemDependencySolver</code></pre>
    </li>
    <li><strong>Компиляция Java кода:</strong>
        <pre><code>javac -d out src/main/java/com/example/filedep/*.java</code></pre>
    </li>
    <li><strong>Запуск программы:</strong>
        <pre><code>java -cp out com.example.filedep.Main</code></pre>
    </li>
    <li><strong>Результат:</strong>
        <p>Программа найдет все текстовые файлы и создаст итоговый файл <code>result.txt</code> в директории <code>root</code>.</p>
    </li>
</ol>

<h2>Пример структуры файлов и результата</h2>
<h3>Структура файлов</h3>
<ul>
    <li><strong>root/</strong>
        <ul>
            <li><code>Folder 1/File 1-1.txt</code> (зависит от <code>Folder 2/File 2-1.txt</code>)</li>
            <li><code>Folder 2/File 2-1.txt</code></li>
            <li><code>Folder 2/File 2-2.txt</code> (зависит от <code>Folder 1/File 1-1.txt</code> и <code>Folder 2/File 2-1.txt</code>)</li>
        </ul>
    </li>
</ul>

<h3>Ожидаемый результат</h3>
<ol>
    <li><code>Folder 2/File 2-1.txt</code></li>
    <li><code>Folder 1/File 1-1.txt</code></li>
    <li><code>Folder 2/File 2-2.txt</code></li>
</ol>
<p>Итоговый файл <code>result.txt</code> будет содержать содержимое этих файлов в правильном порядке.</p>

<h2>Возможные ошибки</h2>
<ul>
    <li><strong>Циклическая зависимость:</strong> Программа сообщит о наличии цикла и укажет, где был обнаружен цикл.</li>
</ul>

