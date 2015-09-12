<script type="text/javascript">
var foo = "Hello World!";
document.write("<p>Before our anonymous function foo means '" + foo + '".</p>');

(function() {
    // The following code will be enclosed within an anonymous function
    var foo = "Goodbye World!";
    document.write("<p>Inside our anonymous function foo means '" + foo + '".</p>');
})(); // We call our anonymous function immediately

document.write("<p>After our anonymous function foo means '" + foo + '".</p>');
</script>