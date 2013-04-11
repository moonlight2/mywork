<!DOCTYPE HTML>
<html>
<head>
<title>Backbone Cellar</title>
<link rel="stylesheet" href="css/style.css" />
</head>
<body>
    
    
    
    <div id="wrapper">
        <div id="header"></div>
        <div id="content">
            
            <div id="sidebar"></div>
            <div id="main-content"></div>
            
        </div>
        
    </div>

<script type="text/template" id="tpl-wine-list-item">
    <a href='#wines/<%=id%>'><%=name %></a>
</script>


<script type="text/template" id="tpl-wine-details">
    <div class="form-left-col">
        <p>
        <label>Id:</label>
        <input type="text" id="wineId" name="id" value="<%= id %>" disabled />
        </p>
        <p>
        <label>Name:</label>
        <input type="text" id="name" name="name" value="<%= name %>" required/>
        </p>
        <p>
        <label>Grapes:</label>
        <input type="text" id="grapes" name="grapes" value="<%= grapes %>"/>
        </p>
        <p>
        <label>Country:</label>
        <input type="text" id="country" name="country" value="<%= country %>"/>
        </p>
        <p>
        <label>Region:</label>
        <input type="text" id="region" name="region"  value="<%= region %>"/>
        </p>
        <p>
        <label>Year:</label>
        <input type="text" id="year" name="year"  value="<%= year %>"/>
        </p>
    </div>
    <div class="form-right-col">
        <img height="300" src="pics/<%= picture %>"/>
        <label>Notes:</label>
        <textarea id="description" name="description"><%= description %></textarea>
    </div>
</script>


<!-- JavaScript -->
<script src="js/lib/jquery-1.7.1.min.js"></script>
<script src="js/lib/underscore-min.js"></script>
<script src="js/lib/backbone-min.js"></script>
<script src="js/main.js"></script>  

</body>
</html>