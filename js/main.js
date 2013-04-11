
window.Wine = Backbone.Model.extend();

window.WineList = Backbone.Collection.extend({
    model: Wine,
    url: 'api/wines'
});


window.WineListView = Backbone.View.extend({
    tagName: 'ul',
    
    initialize: function () {
        this.model.bind('reset', this.render, this);
    },
    
    render: function() {
        _.each(this.model.models, function(wine){

            $(this.el).append(new WineListItemView({model:wine}).render().el);
        }, this);
        return this;
    }
});

window.WineListItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#tpl-wine-list-item').html()),
    
    render: function() {
        
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

window.WineView = Backbone.View.extend({
    template: _.template($('#tpl-wine-details').html()),
    
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});


var AppRouter = Backbone.Router.extend({
    
    routes: {
        "": "wineList",
        "wines/:id": "wineDetails"
    },
            
    wineList: function() {
        this.wines = new WineList(); //model
        
        this.winesView = new WineListView({model: this.wines});
        //this.wines.fetch(); // get data from server
        this.wines.fetch();
        $('#sidebar').html(this.winesView.render().el);
    },  
    wineDetails: function(id) {

        this.wine = this.wines.get(id); //model
        this.wineView = new WineView({model: this.wine});
        //console.log(this.wineView);
        $('#main-content').html(this.wineView.render().el);
    }
});


var app = new AppRouter();
Backbone.history.start();
