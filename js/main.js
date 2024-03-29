Backbone.View.prototype.close = function() {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var AppRouter = Backbone.Router.extend({
    
    routes: {
        "": "wineList",
        "wines/new": "newWine",
        "wines/:id": "wineDetails",
    },
    
    initialize: function() {
        $('#header').html(new HeaderView().render().el);
        
    },
            
    wineList: function() {
        this.before();
    },
            
    newWine: function() {
        this.before(function(){
            app.showView('#main-content', new WineView({model: new Wine()}));
        });
    },
            
    wineDetails: function(id) {
        this.before(function() {
            this.wine = app.wines.get(id); //model
            app.showView('#main-content', new WineView({model: this.wine}));
        });
    },
            
    showView: function(selector, view) {
        if (this.currentView)
            this.currentView.close();
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    },
            
    before: function(callback) {
        if (this.wines) {
            if (callback)
                callback();
        } else {
            this.wines = new WineList();
            this.wines.fetch({success: function() {
                    $('#sidebar').html(new WineListView({model: app.wines}).render().el);
                    if (callback)
                        callback();
            }});
        }
    }
});


tpl.loadTemplates(['header', 'wine-details', 'wine-list-item'], function () {
    app = new AppRouter();
    Backbone.history.start();
});

